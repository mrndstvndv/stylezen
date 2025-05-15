import { Component, computed } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { cartOutline, chevronBackOutline, heart } from "ionicons/icons";
import { ProductsService } from "../services/products.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { StoreService } from "../services/store.service";

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class FavoritesPage {
  favorites = computed(() => {
    return this.store.favorites().map((id) => {
      const product = this.productsService.getProductById(id);
      return {
        ...product,
        isFavorite: true
      }
    });
  });

  constructor(private productsService: ProductsService, private store: StoreService, private router: Router) {
    addIcons({
      chevronBackOutline,
      cartOutline,
      heart
    })
  }

  navigateBack() {
    window.history.back()
  }

  navigateCart() {
    this.router.navigate(['/cart'])
  }
}
