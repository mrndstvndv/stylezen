import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { sign } from "crypto";
import { addIcons } from "ionicons";

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrl: 'product.page.scss',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonBackButton, IonTitle, IonIcon, IonContent, CommonModule, FormsModule]
})
export class ProductPage {
  // TODO: get the sizes and color from product
  selectedSize = signal('');
  selectedColor = signal('');
  quantity = signal(1);

  constructor() {
    addIcons({
      'star-filled': 'assets/icon/star-rating-filled.svg',
    })
  }

  updateColor(color: string) {
    if (color != this.selectedColor()) {
      this.selectedColor.set(color);
    }
  }

  updateSize(size: string) {
    if (size != this.selectedSize()) {
      this.selectedSize.set(size);
    }
  }

  decrementQuantity() {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  incrementQuantity() {
    this.quantity.update(q => q + 1);
  }

  updateQuantity(value: string) {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      this.quantity.set(numValue);
    }
  }
}
