import { Component, computed } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronBackOutline } from "ionicons/icons";
import { ProductsService } from "../services/products.service";
import { CommonModule } from "@angular/common";
import { Order } from "src/libs/types";
import { StoreService } from "../services/store.service";

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class OrdersPage {
  orders = computed(() => {
    const userProfile = this.store.userProfile();
    return userProfile?.orders || [];
  });

  constructor(
    private productsService: ProductsService,
    private store: StoreService
  ) {
    addIcons({
      chevronBackOutline
    })
  }

  getProduct(order: Order) {
    return this.productsService.getProduct(order.productId)()
  }

  navigateBack() {
    window.history.back()
  }
}
