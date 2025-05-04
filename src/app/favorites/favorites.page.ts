import { Component } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { cartOutline, chevronBackOutline, heart } from "ionicons/icons";
import { ProductsService } from "../services/products.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class FavoritesPage {
  favorites = this.productsService.getFavorites();

  constructor(private productsService: ProductsService, private router: Router) {
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
