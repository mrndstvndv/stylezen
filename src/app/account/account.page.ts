import { Component, computed } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { chevronBackOutline, createOutline, pencilOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, IonButtons, IonBackButton, CommonModule],
})
export class AccountPage {
  profileImage = computed(() => this.auth.user()?.photoURL || 'assets/pfp.avif')
  // profileImage = 'assets/pfp.avif'; // Use forward slashes for the image path
  // TODO: this should first check the provider, if we are using email and password signin then we must use the user provided name from the database
  user = computed(() => this.auth.user()?.displayName || "Username");
  email = computed(() => this.auth.user()?.email);
  phone = computed(() => this.auth.user()?.phoneNumber);

  constructor(private auth: AuthService, private router: Router) {
    addIcons({
      chevronBackOutline,
      createOutline
    })
  }

  // Add methods for handling button clicks
  onEditProfile() {
    console.log('Edit profile clicked');
  }

  onLogout() {
    this.auth.logout()
  }

  navigateBack() {
    window.history.back()
  }

  onMenuItemClick(item: string) {
    console.log(`${item} clicked`);
  }

  navigateToFavorites() {
    this.router.navigate(['/favorites'])
  }

  navigateOrders() {
    this.router.navigate(['/orders'])
  }
}
