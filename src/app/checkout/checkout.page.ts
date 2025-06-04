import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { cashOutline, chevronBackOutline, locationOutline } from "ionicons/icons";
import { StoreService } from "../services/store.service";
import { ProductsService } from "../services/products.service";

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.html',
  standalone: true,
  imports: [IonIcon, CommonModule],
  styles: [`
    .payment-option {
      transition: all 0.2s ease;
    }
    .payment-option:hover {
      transform: translateY(-2px);
    }
  `]
})
export class CheckoutPage {
  paymentMethods = [
    {
      name: 'Cash on Delivery',
      icon: 'cash-outline',
    },
    {
      name: 'GCash',
      icon: 'gcash',
    },
    {
      name: 'Paypal',
      icon: 'paypal',
    }
  ];
  selectedMethod = signal('Cash on Delivery');

  totalAmount = computed(() => {
    let amount = 0;

    this.items().forEach(item => {
      const prod = this.products.getProductById(item.productId);

      if (item.checkout == true) {
        amount += prod!!.price * item.quantity;
      }
    })

    return amount;
  })

  items = this.store.itemsToBuy;

  constructor(
    private store: StoreService,
    private products: ProductsService,
  ) {
    addIcons({
      chevronBackOutline,
      locationOutline,
      cashOutline,
      'gcash': 'assets/icon/gcash.svg',
      'paypal': 'assets/icon/paypal.svg'
    })
  }

  navigateBack() {
    window.history.back()
  }

  selectPayment(method: string): void {
    this.selectedMethod.set(method);
  }

  async confirmOrder() {
    try {
      await this.store.createOrder(this.items());
      // Navigate back after successful order
      this.navigateBack();
    } catch (error) {
      console.error('Error creating order:', error);
      // Here you might want to show an error message to the user
    }
  }
}
