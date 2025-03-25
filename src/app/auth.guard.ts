import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

// WARN: this does not work, I mean it works but injection is not working
export const authGuard: CanActivateFn = (route, state) => {
  const auth: Auth = inject(Auth);
  const router: Router = inject(Router);
  const user$ = user(auth);

  const currentRouteIsLogin = route.url[0].path == "/login";
  console.log(state.url)
  console.log(route.url[0].path)

  return user$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else if (user && currentRouteIsLogin) {
        router.navigate(['/home'])
        return false
      } else {
        router.navigate(['/login'])
        return false;
      }
    })
  );
};
