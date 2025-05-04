import { Component, computed, inject, signal, WritableSignal } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { add, addOutline, checkmarkCircle, chevronBackOutline, removeOutline, trashBinOutline, trashOutline } from "ionicons/icons";
import { ProductsService } from "../services/products.service";
import { CartItem } from "src/libs/types";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrl: 'cart.page.scss',
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class CartPage {
  productsService = inject(ProductsService)

  cart: WritableSignal<CartItem[]> = signal([]);
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

    this.cart.set(this.productsService.getCart())
  }

  select(item: CartItem) {
    this.cart.update((e) => {
      const itemIndex = e.indexOf(item);
      if (itemIndex !== -1) {
        e[itemIndex].checkout = !e[itemIndex].checkout;
      }
      return [...e];
    })
  }

  delete(item: CartItem) {
    this.cart.update((e) => {
      // Filter out the item to be deleted
      return e.filter(cartItem => cartItem !== item);
    });
  }

  incrementQuant(item: CartItem) {
    this.cart.update((e) => {
      const itemIndex = e.indexOf(item);
      if (itemIndex !== -1) {
        e[itemIndex].quantity += 1;
      }
      return [...e];
    })
  }

  decrementQuant(item: CartItem) {
    this.cart.update((e) => {
      const itemIndex = e.indexOf(item);
      if (itemIndex !== -1) {
        if (e[itemIndex].quantity - 1 == 0) {
          return e.filter(cartItem => cartItem !== item);
        }
        e[itemIndex].quantity -= 1;
      }
      return [...e];
    })
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
