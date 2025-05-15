import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

// WARN: this does not work, I mean it works but injection is not working
export const authGuard: CanActivateFn = (_, state) => {
  const auth: Auth = inject(Auth);
  const router: Router = inject(Router);
  const user$ = user(auth);

  const currentRouteIsLogin = state.url.includes('/login');

  return user$.pipe(
    map((user) => {

      if (user && currentRouteIsLogin || state.url.includes('/landing')) {
        router.navigate(['/home'])
        return false
      }
      else if (currentRouteIsLogin) {
        return true
      }
      else if (user) {
        return true;
      } else {
        router.navigate(['/login'])
        return false;
      }
    })
  );
};
