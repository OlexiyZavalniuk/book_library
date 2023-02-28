import { Component, Input } from '@angular/core';
import { IBookDetailsWithGanre } from 'src/app/Models/book-details';
import { BookService } from 'src/app/Services/book.services';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
})
export class EditBookComponent {
  constructor(private service: BookService) {}

  @Input() id: number = 0;
  @Input() book: IBookDetailsWithGanre = this.clear();

  addBook() {
    this.service
      .createBook({
        bookId: this.id,
        title: this.book.title,
        cover: this.book.cover,
        content: this.book.content,
        author: this.book.author,
        genre: this.book.genre,
      })
      .subscribe((response) => {
        this.service.reload(true);
      });
    this.clear();
  }

  clear() {
    this.book = {
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
    return this.book;
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
    this.toBase64(photo).then((base64) => (this.book.cover = base64 as string));
  }
}
