import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonFooter, IonChip, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonChip, 
    CommonModule, // Add this to support NgFor
    IonFooter,
    IonButton,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomePage {
  products = [
    { name: 'Product 1', price: 100, image: 'assets/product1.jpg' },
    { name: 'Product 2', price: 200, image: 'assets/product2.jpg' },
    { name: 'Product 3', price: 300, image: 'assets/product3.jpg' },
  ];
}
