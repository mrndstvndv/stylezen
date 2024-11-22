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
  animations: [
    trigger('cardPosition', [
      state('down', style({
        transform: 'translateY(0)'
      })),
      state('up', style({
        transform: 'translateY(-40vh)'
      })),
      transition('down => up', [
        animate('0.3s ease-out')
      ]),
      transition('up => down', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class LoginPage implements OnInit {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef;

  isSignIn: boolean = true;
  isSignUp: boolean = false;
  cardState: string = 'down';

  constructor() { }

  ngOnInit() {
    // Ensure video loops
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.play();
    }
  }

  showSignIn() {
    this.isSignIn = true;
    this.isSignUp = false;
    this.cardState = 'up';
  }

  showSignUp() {
    this.isSignUp = true;
    this.isSignIn = false;
    this.cardState = 'up';
  }

  resetCardPosition() {
    this.cardState = 'down';
  }
}
