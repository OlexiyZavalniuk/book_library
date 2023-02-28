import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBookDetailsWithGanre } from 'src/app/Models/book-details';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
})
export class ViewBookComponent {
  @Input() show = false;
  @Input() book?: IBookDetailsWithGanre;
  @Output() onChanged = new EventEmitter<boolean>();
  change(increased: boolean) {
    this.onChanged.emit(increased);
  }
}
