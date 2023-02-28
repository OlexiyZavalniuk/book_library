export interface IBookDetails {
  bookId: number;
  title: string;
  cover: string;
  content: string;
  author: string;
  rating: number;
  reviews: [
    {
      reviewId: number;
      message: string;
      bookId: number;
      reviewer: string;
    }
  ];
}

export interface IBookDetailsWithGanre {
  bookId: number;
  title: string;
  cover: string;
  content: string;
  author: string;
  genre: string;
  rating: number;
  reviews: [
    {
      reviewId: number;
      message: string;
      bookId: number;
      reviewer: string;
    }
  ];
}

export interface IBookToCreate {
  bookId: number;
  title: string;
  cover: string;
  content: string;
  author: string;
  genre: string;
}
