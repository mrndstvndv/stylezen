import { Component, computed, ViewChild, ElementRef, ChangeDetectorRef, signal } from '@angular/core';
import { IonContent, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { chevronBackOutline, createOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { StoreService } from '../services/store.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, CommonModule],
})
export class AccountPage {
  @ViewChild('logoutDialog') logoutDialog!: ElementRef<HTMLDialogElement>;

  profileImage = computed(() => this.auth.user()?.photoURL);
  user = computed(() => this.auth.user()?.displayName || this.store.userProfile()?.fullName || "Username");
  email = computed(() => this.auth.user()?.email);
  phone = computed(() => this.auth.user()?.phoneNumber);
  orders = signal(this.productsService.getOrders());
  isDialogVisible = false;

  constructor(private auth: AuthService, private store: StoreService, private router: Router, private cdr: ChangeDetectorRef, private productsService: ProductsService) {
    addIcons({
      chevronBackOutline,
      createOutline
    });
  }

  showDialog() {
    this.isDialogVisible = true;
    this.cdr.detectChanges(); // Ensure the DOM is updated
    this.logoutDialog.nativeElement.showModal();
  }

  hideDialog() {
    this.isDialogVisible = false;
    this.logoutDialog.nativeElement.close();
  }

  onEditProfile() {
    console.log('Edit profile clicked');
  }

  onLogout() {
    console.log('User logged out');
    this.isDialogVisible = false;
    this.auth.logout();
  }

  navigateBack() {
    window.history.back();
  }

  navigateToFavorites() {
    this.router.navigate(['/favorites']);
  }

  navigateOrders() {
    this.router.navigate(['/orders']);
  }
}
