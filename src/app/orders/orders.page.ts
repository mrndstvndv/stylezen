import { Component, signal } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronBackOutline } from "ionicons/icons";
import { ProductsService } from "../services/products.service";
import { CommonModule } from "@angular/common";
import { Order } from "src/libs/types";

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class OrdersPage {
  orders = signal(this.productsService.getOrders());

  constructor(private productsService: ProductsService) {
    addIcons({
      chevronBackOutline
    })
  }

  getProduct(cart: Order) {
    return this.productsService.getProduct(cart.productId)()
  }

  navigateBack() {
    window.history.back()
  }
}
