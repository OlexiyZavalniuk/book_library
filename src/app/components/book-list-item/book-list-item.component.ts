import { Component, Input } from '@angular/core';
import {
  IBookDetails,
  IBookDetailsWithGanre,
} from 'src/app/Models/book-details';
import { BookService } from 'src/app/Services/book.services';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
})
export class BookListItemComponent {
  constructor(private service: BookService) {}
  @Input() book?: IBookDetails;
  show = false;
  edit = false;
  bookToView: IBookDetailsWithGanre = {
    bookId: 0,
    title: '',
    cover: '',
    content: '',
    author: '',
    genre: '',
    rating: 0,
    reviews: [
      {
        reviewId: 0,
        message: '',
        bookId: 0,
        reviewer: '',
      },
    ],
  };
  onChanged(increased: boolean) {
    this.show = increased;
  }
  getBook(id: number) {
    this.service.getBook(id).subscribe((book) => {
      this.bookToView = book;
    });
  }
  addBook() {
    this.service
      .createBook({
        bookId: this.bookToView.bookId,
        title: this.bookToView.title,
        cover: this.bookToView.cover,
        content: this.bookToView.content,
        author: this.bookToView.author,
        genre: this.bookToView.genre,
      })
      .subscribe((response) => {
        this.service.reload(true);
      });
  }

  toBase64(photo: File) {
    return new Promise((resolve, reject) => {
      const rdr = new FileReader();
      rdr.readAsDataURL(photo);
      rdr.onload = () => resolve(rdr.result);
      rdr.onerror = (error) => reject(error);
    });
  }

  setPhoto(event: Event) {
    const target = event.target as HTMLInputElement;
    const photo = (target.files as FileList)[0];
    this.toBase64(photo).then(
      (base64) => (this.bookToView.cover = base64 as string)
    );
  }
}
