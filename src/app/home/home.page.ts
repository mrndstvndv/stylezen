import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';  // Import addIcons from ionicons

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  constructor() {
    // Register icons manually in the constructor with an object
    addIcons({
      'heart-outline': 'heart-outline',  // Register heart-outline icon
      'heart': 'heart',                  // Register heart icon
      'star': 'star',                     // Register star icon
      'search-outline' : 'search-outline',
      'home' : 'home',
      'notifications-outline' : 'notifications-outline',
      'cart-outline' : 'cart-outline',
      'person-outline' : 'person-outline'
    });
  }

  // Component properties and methods
  selectedCategory = 'Popular';

  featuredProduct = {
    title: 'AIRism Cotton Crew Neck Long Sleeve T-Shirt',
    subtitle: 'Your personal style, perfected',
    price: 250,
    image: 'assets/images/featured-product.png'
  };

  products = [
    {
      id: 1,
      title: 'Cotton Baggy Pants',
      category: 'UNISEX',
      size: 'S-XL',
      price: 790,
      rating: 4.5,
      image: 'assets/images/cotton-baggy-pants.png',
      isFavorite: false
    },
    {
      id: 2,
      title: 'AIRism Cotton Crew Neck Long Sleeve T-Shirt',
      category: 'UNISEX',
      size: 'S-XL',
      price: 990,
      rating: 4.5,
      image: 'assets/images/airism-cotton-tshirt.png',
      isFavorite: false
    },
    {
      id: 3,
      title: 'Cotton T-Shirt',
      category: 'MEN',
      size: 'S-XL',
      price: 690,
      rating: 4.5,
      image: 'assets/images/cotton-tshirt.png',
      isFavorite: false
    },
    {
      id: 4,
      title: "WOMEN'S SMART ANKLE PANTS 2WAY STRETCH",
      category: 'WOMEN',
      size: 'S-XL',
      price: 990,
      rating: 4.5,
      image: 'assets/images/womens-smart-ankle-pants.png',
      isFavorite: false
    },
    {
      id: 5,
      title: "WOMEN'S U CREW NECK SHORT SLEEVE T-SHIRT",
      category: 'WOMEN',
      size: 'S-XL',
      price: 780,
      rating: 4.5,
      image: 'assets/images/WOMENSUCREWNECKSHORTSLEEVET-SHIRT.png',
      isFavorite: false
    },
    {
      id: 6,
      title: "Rayon Skipper Collar 3/4 Sleeve Blouse",
      category: 'WOMEN',
      size: 'S-L',
      price: 990,
      rating: 4.5,
      image: 'assets/images/RayonSkipperCollarSleeveBlouse.png',
      isFavorite: false
    }
  ];

  toggleFavorite(product: any) {
    product.isFavorite = !product.isFavorite;
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }
}