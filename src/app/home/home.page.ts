import { Component, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cartOutline, heart, heartOutline, home, notificationsOutline, personOutline, searchOutline, star } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  constructor(private router: Router) {
    // Register icons manually in the constructor with an object
    // This allows the use of custom icons in the application
    addIcons({
      heartOutline,
      heart,
      star,
      searchOutline,
      home,
      notificationsOutline,
      cartOutline,
      personOutline,
      'add-to-fave': 'assets/icon/add-to-fave-outline.svg',
      'star-filled': 'assets/icon/star-rating-filled.svg',
      'star-outline': 'assets/icon/star-rating-outline.svg'
    });
  }

  // Component properties and methods

  /**
   * The currently selected category of products.
   * Default is set to 'Popular'.
   */
  selectedCategory = signal('Popular');

  /**
   * The featured product to be highlighted on the home page.
   * Contains title, subtitle, price, and image properties.
   */
  featuredProduct = {
    title: 'AIRism Cotton Crew Neck Long Sleeve T-Shirt',
    subtitle: 'Your personal style, perfected',
    price: 250,
    image: 'assets/images/featured-product.png'
  };

  /**
   * An array of product objects, each representing a product available in the store.
   *
   * Each product object contains the following properties:
   * - `id` (number): The unique identifier for the product.
   * - `title` (string): The name of the product.
   * - `category` (string): The category to which the product belongs (e.g., 'UNISEX', 'MEN', 'WOMEN').
   * - `size` (string): The available sizes for the product.
   * - `price` (number): The price of the product in the store's currency.
   * - `rating` (number): The customer rating of the product, on a scale from 1 to 5.
   * - `image` (string): The file path to the product's image.
   * - `isFavorite` (boolean): A flag indicating whether the product is marked as a favorite by the user.
   */
  products = [
    {
      id: 1,
      title: 'Cotton Baggy Pants',
      category: 'UNISEX',
      size: 'S-XL',
      price: 790,
      rating: 5.0,
      image: 'assets/images/cotton-baggy-pants.png',
      isFavorite: false
    },
    {
      id: 2,
      title: 'AIRism Cotton Crew Neck Long Sleeve T-Shirt',
      category: 'UNISEX',
      size: 'S-XL',
      price: 990,
      rating: 5.0,
      image: 'assets/images/airism-cotton-tshirt.png',
      isFavorite: false
    },
    {
      id: 3,
      title: 'Cotton T-Shirt',
      category: 'MENS',
      size: 'S-XL',
      price: 690,
      rating: 3.0,
      image: 'assets/images/cotton-tshirt.png',
      isFavorite: false
    },
    {
      id: 4,
      title: "WOMEN'S SMART ANKLE PANTS 2WAY STRETCH",
      category: 'WOMENS',
      size: 'S-XL',
      price: 990,
      rating: 4.0,
      image: 'assets/images/womens-smart-ankle-pants.png',
      isFavorite: false
    },
    {
      id: 5,
      title: "WOMEN'S U CREW NECK SHORT SLEEVE T-SHIRT",
      category: 'WOMENS',
      size: 'S-XL',
      price: 780,
      rating: 5.0,
      image: 'assets/images/WOMENSUCREWNECKSHORTSLEEVET-SHIRT.png',
      isFavorite: false
    },
    {
      id: 6,
      title: "Rayon Skipper Collar 3/4 Sleeve Blouse",
      category: 'WOMENS',
      size: 'S-L',
      price: 990,
      rating: 5.0,
      image: 'assets/images/RayonSkipperCollarSleeveBlouse.png',
      isFavorite: false
    }
  ];

  filteredProducts = computed(() => {
    if (this.selectedCategory() == "Popular") {
      return this.products
    }

    return this.products.filter(product => product.category == this.selectedCategory().toUpperCase())
  });

  /**
   * Toggles the favorite status of a given product.
   *
   * @param product - The product object whose favorite status is to be toggled.
   */
  toggleFavorite(product: any) {
    product.isFavorite = !product.isFavorite;
  }

  /**
   * Sets the selected category.
   *
   * @param category - The category to be set as selected.
   */
  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  /**
   * Navigates to the account page.
   */
  navigateToAccount() {
    this.router.navigate(['/account']);
  }
}
