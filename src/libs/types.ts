export interface Review {
  username: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  size: string;
  price: number;
  rating: number;
  image: string;
  isFavorite: boolean;
  description: string;
  reviews?: Review[];
}
