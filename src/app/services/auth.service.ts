import { inject, Injectable, Signal } from '@angular/core';
import { Auth, user, GoogleAuthProvider, User, signInWithPopup } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  public user: Signal<User | undefined | null> = toSignal(user(this.auth));

  public async loginWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(response => {
        if (response.user) {
          this.router.navigate(['/home'])
        } else {
          console.error('Login failed')
        }
      })
  }

  public async logout() {
    await this.auth.signOut().then(() => {
      this.router.navigate(['/login'])
    })
  }
}
