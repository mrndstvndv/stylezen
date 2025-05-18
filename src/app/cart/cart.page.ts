import { Component, computed, inject, Signal, signal, WritableSignal } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { add, addOutline, car, checkmarkCircle, chevronBackOutline, removeOutline, trashBinOutline, trashOutline } from "ionicons/icons";
import { ProductsService } from "../services/products.service";
import { CartItem } from "src/libs/types";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { StoreService } from "../services/store.service";

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrl: 'cart.page.scss',
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class CartPage {
  productsService = inject(ProductsService)
  storeService = inject(StoreService)

  cart: Signal<CartItem[]> = this.storeService.cart;
  totalAmount = computed(() => {
    let amount = 0;

    this.cart().forEach(element => {
      if (element.checkout == true) {
        const item = this.productsService.getProduct(element.productId)();

        amount += item!.price * element.quantity
      }
    });

    return amount;
  })
  selectedItems = computed(() => {
    let items = 0;

    this.cart().forEach(element => {
      if (element.checkout == true) {
        items++;
      }
    });

    return items;
  });

  constructor(private router: Router) {
    addIcons({
      chevronBackOutline,
      checkmarkCircle,
      trashOutline,
      addOutline,
      removeOutline
    })
  }

  select(productId: number) {
    this.storeService.selectForCheckout(productId);
  }

  delete(productId: number) {
    this.storeService.removeFromCart(productId);
  }

  incrementQuant(productId: number) {
    this.storeService.incrementQuant(productId);
  }

  decrementQuant(productId: number) {
    this.storeService.decrementQuant(productId);
  }


  getProduct(cart: CartItem) {
    return this.productsService.getProduct(cart.productId)()
  }

  navigateToCheckOut() {
    this.router.navigate(['/checkout', this.totalAmount()])
  }

  navigateBack() {
    window.history.back()
  }
}
