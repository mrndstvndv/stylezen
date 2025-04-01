import { inject, Injectable, Signal } from '@angular/core';
import { Auth, user, GoogleAuthProvider, User, signInWithPopup, UserCredential, signInWithEmailAndPassword } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop"
import { TwitterAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  public user: Signal<User | undefined | null> = toSignal(user(this.auth));

  private handleUserLogin(response: UserCredential) {
    if (response.user) {
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

  public async logout() {
    await this.auth.signOut().then(() => {
      this.router.navigate(['/login'])
    })
  }
}
