import { Component, computed } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, IonButtons, IonBackButton],
})
export class AccountPage {
  profileImage = computed(() => this.auth.user()?.photoURL || 'assets/pfp.avif')
  // profileImage = 'assets/pfp.avif'; // Use forward slashes for the image path
  // TODO: this should first check the provider, if we are using email and password signin then we must use the user provided name from the database
  user = computed(() => this.auth.user()?.displayName || "Username");

  constructor(private auth: AuthService) { }

  // Add methods for handling button clicks
  onEditProfile() {
    console.log('Edit profile clicked');
  }

  onLogout() {
    this.auth.logout()
  }

  onMenuItemClick(item: string) {
    console.log(`${item} clicked`);
  }
}
