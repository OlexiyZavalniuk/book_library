import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBookDetails } from 'src/app/Models/book-details';
import { BookService } from 'src/app/Services/book.services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent {
  constructor(private service: BookService) {
    this.subscriptionName = this.service.getReload().subscribe((data) => {
      this.service.getAll().subscribe((books) => {
        this.books = books;
      });
    });
  }

  books: IBookDetails[] = [];
  private subscriptionName: Subscription;

  getId(): number {
    let id = 0;
    this.books.forEach((elemet) => {
      if (id < elemet.bookId) {
        id = elemet.bookId;
      }
    });
    return ++id;
  }
}
