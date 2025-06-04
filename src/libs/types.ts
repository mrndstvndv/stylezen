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

export interface CartItem {
  productId: number
  quantity: number
  color: string
  size: string
  checkout: boolean
}

export interface Order {
  productId: number;
  size: string;
  quantity: number;
  color: string;
  status: 'packed' | 'shipping' | 'delivered';
  orderDate: string;
}

export interface User {
  fullName: string;
  email: string;
  favorites: number[];
  cart: CartItem[];
  orders?: Order[];
}
