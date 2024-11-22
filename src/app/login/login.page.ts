import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  @ViewChild('background-video') backgroundVideo!: ElementRef;

  isSignIn: boolean = true;
  isSignUp: boolean = false;
  ishidden: boolean = true;

  constructor() { }

  ngOnInit() {
    //video loop
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.addEventListener('canplay', () => {
        this.backgroundVideo.nativeElement.play();
      });
    }
  }
//Modify login card Y level
  private modifyLoginCardYLevel(yLevel: number) {
    const loginCardElement = document.querySelector('.login-card') as HTMLElement;
    if (loginCardElement) {
      loginCardElement.style.transition = 'transform 0.1s ease-in-out';
      loginCardElement.style.transform = `translateY(${yLevel}vh)`;
    }
  }
//Show sign in
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
  //Show background blur
  private setBackgroundBlurZIndex(zIndex: number) {
    const backgroundBlurElement = document.querySelector('.background-blur') as HTMLElement;
    if (backgroundBlurElement) {
      backgroundBlurElement.style.zIndex = zIndex.toString();
    }
  }
  //Reset login form
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
