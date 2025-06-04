import { Component, computed, signal } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronBackOutline } from "ionicons/icons";
import { ProductsService } from "../services/products.service";
import { CommonModule } from "@angular/common";
import { Order } from "src/libs/types";
import { StoreService } from "../services/store.service";
import { ConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  standalone: true,
  imports: [IonIcon, CommonModule, ConfirmDialogComponent]
})
export class OrdersPage {
  orders = computed(() => {
    const userProfile = this.store.userProfile();
    return userProfile?.orders || [];
  });

  showConfirmDialog = signal(false);
  orderToCancel = signal<string | null>(null);

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

  openCancelDialog = (orderDate: string) => {
    this.orderToCancel.set(orderDate);
    this.showConfirmDialog.set(true);
  }

  confirmCancel = async () => {
    const orderDate = this.orderToCancel();
    if (orderDate) {
      try {
        await this.store.cancelOrder(orderDate);
        this.closeDialog();
      } catch (error) {
        console.error('Error canceling order:', error);
      }
    }
  }

  closeDialog = () => {
    this.showConfirmDialog.set(false);
    this.orderToCancel.set(null);
  }
}
