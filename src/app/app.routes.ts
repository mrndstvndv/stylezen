import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'login',
    canActivate: [authGuard],
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./landing/landing.page').then(m => m.LandingPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account.page').then(m => m.AccountPage)
  },
  {
    path: 'product',
    loadComponent: () => import('./product/product.page').then(m => m.ProductPage)
  },


];
