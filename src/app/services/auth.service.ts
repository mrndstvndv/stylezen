import { inject, Injectable, Signal } from '@angular/core';
import { Auth, user, GoogleAuthProvider, User, signInWithPopup, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop"
import { TwitterAuthProvider } from 'firebase/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);
  public user: Signal<User | undefined | null> = toSignal(user(this.auth));

  private async handleUserLogin(response: UserCredential) {
    if (response.user) {
      try {
        console.log('User logged in:', response.user);

        const userRef = doc(this.firestore, 'users', response.user.uid);
        const userSnap = await getDoc(userRef);

        console.log('userSnap:', userSnap.exists());

        if (!userSnap.exists()) {
          // Create the user document only if it doesn't exist
          console.log('Creating user document in Firestore');
          await setDoc(userRef, {
            fullName: response.user.displayName,
            email: response.user.email,
          });
        }
      } catch (error) {
        console.error('Error writing document: ', error);
      }

      this.router.navigate(['/home'])
    } else {
      console.error('Login failed')
    }
  }

  public async loginWithEmailAndPassword(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(response => {
        this.handleUserLogin(response)
      })
  }

  public async loginWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(response => {
        this.handleUserLogin(response)
      })
  }

  public async loginWithTwitter() {
    await signInWithPopup(this.auth, new TwitterAuthProvider())
      .then(response => {
        this.handleUserLogin(response)
      })
  }

  public async signUpWithEmailAndPassword(fullName: string, email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then(async response => {
        if (response.user) {
          try {
            const userRef = doc(this.firestore, 'users', response.user.uid);
            await setDoc(userRef, {
              fullName: fullName,
              email: email
            });

            this.router.navigate(['/home'])
          } catch (error) {
            console.error('Error writing document: ', error);
            await response.user.delete();
            throw new Error('Failed to create user profile. Please try again.');
          }
        } else {
          console.error('Signup failed')
        }
      })
  }

  public async logout() {
    await this.auth.signOut().then(() => {
      this.router.navigate(['/login'])
    })
  }
}
