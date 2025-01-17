import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonInput, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonInput, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) {}
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  @ViewChild('background-video') backgroundVideo!: ElementRef;

  isSignIn: boolean = false;
  isSignUp: boolean = false;
  ishidden: boolean = true;
  


  ngOnInit() {
    // Ensure the background video plays in a loop when it can start playing
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.addEventListener('canplay', () => {
        this.backgroundVideo.nativeElement.play();
      });
    }
  }
// Modify the Y position of the login card element
// This function adjusts the vertical position of the login card by applying a CSS transform
private modifyLoginCardYLevel(yLevel: number) {
  const loginCardElement = document.querySelector('.login-card') as HTMLElement;
  if (loginCardElement) {
    loginCardElement.style.transition = 'transform 0.1s ease-in-out';
    loginCardElement.style.transform = `translateY(${yLevel}vh)`;
  }
}
// Show sign in form
// This function displays the sign in form by adjusting the state variables and modifying the login card's appearance
showSignIn() {
  this.isSignIn = true;
  this.isSignUp = false;
  this.setBackgroundBlurZIndex(1); // Set z-index when showing sign in
  this.modifyLoginCardYLevel(-40); // Adjust Y level for sign in

  const loginCardElement = document.querySelector('.login-card') as HTMLElement;
  if (loginCardElement) {
    loginCardElement.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
    loginCardElement.style.opacity = '1';
  }
}
//Show sign up
  /**
   * Displays the sign-up form by updating the component's state and adjusting the UI.
   * 
   * This method sets `isSignUp` to `true` and `isSignIn` to `false` to reflect the current form state.
   * It also resets the z-index of the background blur and adjusts the Y level of the login card for the sign-up view.
   * Additionally, it applies a transition effect to the login card element for a smooth visual change.
   */
  showSignUp() {
    this.isSignUp = true;
    this.isSignIn = false;
    this.setBackgroundBlurZIndex(1); // Reset z-index when showing sign up
    this.modifyLoginCardYLevel(-45); // Adjust Y level for sign up


    const loginCardElement = document.querySelector('.login-card') as HTMLElement;
    if (loginCardElement) {
      loginCardElement.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
      loginCardElement.style.opacity = '1';
    }
  }
  // Show background blur by setting its z-index
  // This function adjusts the z-index of the background blur element to control its visibility and stacking order
  private setBackgroundBlurZIndex(zIndex: number) {
    const backgroundBlurElement = document.querySelector('.background-blur') as HTMLElement;
    if (backgroundBlurElement) {
      backgroundBlurElement.style.zIndex = zIndex.toString();
    }
  }
  // Reset login form to its default state
  // This function resets the login form by setting the background blur z-index to 0,
  // adjusting the Y level of the login card to its default position, and restoring its opacity.
  resetLoginForm() {
    this.setBackgroundBlurZIndex(0); // Reset z-index
    this.modifyLoginCardYLevel(0); // Reset Y level to default

    // Back to default opacity
    const loginCardElement = document.querySelector('.login-card') as HTMLElement;
    if (loginCardElement) {
      loginCardElement.style.transition = 'opacity 0.4s ease-in-out, transform 0.5s ease-in-out';
      loginCardElement.style.opacity = '1';
    }
  }
}
