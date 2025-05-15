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
    canActivate: [authGuard],
    loadComponent: () => import('./landing/landing.page').then(m => m.LandingPage)
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./account/account.page').then(m => m.AccountPage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.page').then(m => m.NotificationsPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then(m => m.CartPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.page').then(m => m.FavoritesPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then(m => m.OrdersPage)
  },
  {
    path: 'checkout/:amount',
    loadComponent: () => import('./checkout/checkout.page').then(m => m.CheckoutPage)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product/product.page').then(m => m.ProductPage)
  },
];
