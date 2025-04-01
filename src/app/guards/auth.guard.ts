import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: Auth = inject(Auth);
  const router: Router = inject(Router);
  const user$ = user(auth);

  const currentRouteIsLogin = state.url.includes('/login');

  return user$.pipe(
    map((user) => {
      if (user) {
        if (currentRouteIsLogin) {
          // router.navigate(['/home'])
          // return false
          return true
        }
        return true;
      } else {
        router.navigate(['/login'])
        return false;
      }
    })
  );
};
