import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonContent],
})
export class LandingPage {
  constructor(private router: Router) { }

  /**
   * Navigates the user to the login page.
   * Utilizes the Angular Router to change the current route to '/login'.
   */
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
