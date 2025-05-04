import { Component, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cartOutline, heart, heartOutline, home, notificationsOutline, personOutline, searchOutline, star } from 'ionicons/icons';
import { Router } from '@angular/router';
import { Product } from 'src/libs/types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  constructor(private router: Router, private productsService: ProductsService) {
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
  products: Product[] = this.productsService.getProducts();

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
  toggleFavorite(product: Product) {
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

  navigateToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
