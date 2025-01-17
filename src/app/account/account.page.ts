import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, IonButtons, IonBackButton],
})
export class AccountPage {
  profileImage = 'assets/pfp.avif'; // Use forward slashes for the image path

  constructor() {}

  // Add methods for handling button clicks
  onEditProfile() {
    console.log('Edit profile clicked');
  }

  onLogout() {
    console.log('Logout clicked');
  }

  onMenuItemClick(item: string) {
    console.log(`${item} clicked`);
  }
}