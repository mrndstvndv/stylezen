import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HomePage {
  // Featured product data
  featuredProduct = {
    name: 'AIRism Cotton Crew Neck Long Sleeve T-Shirt',
    description: 'Your personal style, perfected',
    price: 250,
    image: 'https://example.com/featured-product.jpg',
  };

  // List of products
  products = [
    {
      name: 'U Crew Neck Short Sleeve T-Shirt',
      category: 'UNISEX',
      size: 'S-XL',
      price: 590,
      rating: 5.0,
      image: 'https://example.com/tshirt.jpg',
    },
    {
      name: 'Linen Cotton Tapered Pants',
      category: 'WOMEN',
      size: 'S-XL',
      price: 890,
      rating: 4.5,
      image: 'https://example.com/pants.jpg',
    },
  ];

  // Helper function to generate the stars for the rating
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0); // Creates an array of stars
  }
}
