import { Component, computed, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { chevronBackOutline, createOutline, pencilOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DialogComponent } from './components/logoutdialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonLabel, IonCard, IonAvatar, IonList, IonButtons, IonBackButton, CommonModule, DialogComponent],
})
export class AccountPage {
  @ViewChild('logoutDialog') logoutDialog!: ElementRef<HTMLDialogElement>;

  profileImage = computed(() => this.auth.user()?.photoURL || 'assets/pfp.avif');
  user = computed(() => this.auth.user()?.displayName || "Username");
  email = computed(() => this.auth.user()?.email);
  phone = computed(() => this.auth.user()?.phoneNumber);
  isDialogVisible = false;

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
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
