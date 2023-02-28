import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IBookDetails,
  IBookDetailsWithGanre,
  IBookToCreate,
} from '../Models/book-details';
import { IBookID } from '../Models/requests';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  showBookModal = false;
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  getAll(): Observable<IBookDetails[]> {
    return this.http.get<IBookDetails[]>('https://localhost:44394/api/books');
  }

  getBook(id: number): Observable<IBookDetailsWithGanre> {
    return this.http.get<IBookDetailsWithGanre>(
      'https://localhost:44394/api/books/' + id
    );
  }

  createBook(book: IBookToCreate): Observable<IBookID> {
    return this.http.post<any>('https://localhost:44394/api/books/save', book);
  }

  public reload(value: boolean): void {
    this.refresh.next(value);
  }

  public getReload(): Observable<boolean> {
    return this.refresh.asObservable();
  }
}
