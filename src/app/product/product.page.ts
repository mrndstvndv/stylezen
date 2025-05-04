import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { arrowBackOutline, cartOutline, chevronBackOutline, shareOutline, shareSocialOutline, shareSocialSharp, star } from "ionicons/icons";
import { Product } from "src/libs/types";
import { ProductsService } from "../services/products.service";

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrl: 'product.page.scss',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonBackButton, IonTitle, IonIcon, IonContent, CommonModule, FormsModule]
})
export class ProductPage {
  // TODO: get the sizes and color from product

  colors = ['#3e404c', '#ddbebb', '#ddccba', '#4a392f', '#1d2c3f'];
  _sizes = ['XS', 'S', 'M', 'L', 'XL'];
  sizes = signal(['S']);

  selectedSize = signal(this.sizes()[0]);
  selectedColor = signal(this.colors[0]);
  quantity = signal(1);
  product: Product | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    addIcons({
      chevronBackOutline,
      shareSocialOutline,
      cartOutline,
      star,
      'star-filled': 'assets/icon/star-rating-filled.svg',
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.product = this.productsService.getProduct(id)();
      this.getSizes()
    });
  }

  navigateBack() {
    window.history.back();
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

  getSizes() {
    const size = this.product?.size.split("-") || ['S', 'L'];

    this.sizes.set(this._sizes.splice(this._sizes.indexOf(size[0]), this._sizes.indexOf(size[1])));
  }
}
