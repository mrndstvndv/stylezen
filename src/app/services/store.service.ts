import { Injectable, inject, signal, effect, computed, Signal } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CartItem, User } from 'src/libs/types';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private firestore: Firestore = inject(Firestore);
  private auth: AuthService = inject(AuthService);

  // Create a user profile signal with null as initial value
  private userProfileSignal = signal<User | null>(null);

  // Expose the signal as readonly
  readonly userProfile = this.userProfileSignal.asReadonly();

  readonly itemsToBuy = signal<CartItem[]>([]);

  constructor() {
    // Setup effect to automatically fetch profile when user changes
    effect(() => {
      const currentUser = this.auth.user();

      if (currentUser?.uid) {
        this.getUserProfile(currentUser.uid).subscribe(profile => {
          this.userProfileSignal.set(profile);
        });
      } else {
        this.userProfileSignal.set(null);
      }
    });
  }

  // Get user details beyond basic auth info
  getUserProfile(userId: string): Observable<any> {
    const userDocRef = doc(this.firestore, 'users', userId);
    return from(getDoc(userDocRef)).pipe(
      map(docSnap => docSnap.exists() ? docSnap.data() : null),
      catchError(error => {
        console.error('Error fetching user profile:', error);
        return of(null);
      })
    );
  }

  // Update user profile and update the signal
  async updateUserProfile(userId: string, data: any): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', userId);
    await updateDoc(userDocRef, data);

    // Update local signal with new data
    const currentProfile = this.userProfileSignal();
    if (currentProfile) {
      this.userProfileSignal.set({ ...currentProfile, ...data });
    }
  }

  favorites = computed<number[]>(() => {
    const userProfile = this.userProfileSignal();
    if (!userProfile) {
      return [];
    }
    return userProfile.favorites || [];
  });

  async addToFavorites(productId: number): Promise<void> {
    const userId = this.auth.user()?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userProfile = this.userProfileSignal();
    if (userProfile) {
      const updatedFavorites = [...(userProfile.favorites || []), productId];
      await this.updateUserProfile(userId, { favorites: updatedFavorites });
    } else {
      console.error('User profile not found');
    }
  }

  async removeFromFavorites(productId: number): Promise<void> {
    const userId = this.auth.user()?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userProfile = this.userProfileSignal();
    if (userProfile) {
      const updatedFavorites = (userProfile.favorites || []).filter(id => id !== productId);
      await this.updateUserProfile(userId, { favorites: updatedFavorites });
    } else {
      console.error('User profile not found');
    }
  }

  cart = computed(() => {
    const userProfile = this.userProfileSignal();
    if (!userProfile) {
      return [];
    }
    return userProfile.cart || [];
  })

  async addToCart(productId: number, quantity: number, color: string, size: string): Promise<void> {
    const userId = this.auth.user()?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userProfile = this.userProfileSignal();
    if (userProfile) {
      const updatedCart = [...(userProfile.cart || []), { productId, quantity, color, size, checkout: false }];
      await this.updateUserProfile(userId, { cart: updatedCart });
    } else {
      console.error('User profile not found');
    }
  }

  async selectForCheckout(productId: number): Promise<void> {
    const userId = this.auth.user()?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userProfile = this.userProfileSignal();
    if (userProfile) {
      const updatedCart = (userProfile.cart || []).map(item => {
        if (item.productId === productId) {
          return { ...item, checkout: item.checkout ? false : true };
        }
        return item;
      });
      await this.updateUserProfile(userId, { cart: updatedCart });
    } else {
      console.error('User profile not found');
    }
  }

  async removeFromCart(productId: number): Promise<void> {
    const userId = this.auth.user()?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userProfile = this.userProfileSignal();
    if (userProfile) {
      const updatedCart = (userProfile.cart || []).filter(item => item.productId !== productId);
      await this.updateUserProfile(userId, { cart: updatedCart });
    } else {
      console.error('User profile not found');
    }
  }

  async incrementQuant(productId: number): Promise<void> {
    const userId = this.auth.user()?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userProfile = this.userProfileSignal();
    if (userProfile) {
      const updatedCart = (userProfile.cart || []).map(item => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      await this.updateUserProfile(userId, { cart: updatedCart });
    } else {
      console.error('User profile not found');
    }
  }

  async decrementQuant(productId: number): Promise<void> {
    const userId = this.auth.user()?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userProfile = this.userProfileSignal();
    if (userProfile) {
      const updatedCart = (userProfile.cart || [])
        .map(item => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(item => item.quantity > 0); // Remove items with quantity 0

      await this.updateUserProfile(userId, { cart: updatedCart });
    } else {
      console.error('User profile not found');
    }
  }

  buyItems(cartItems: CartItem[]) {
    this.itemsToBuy.set(cartItems);
  }

  async createOrder(items: CartItem[]): Promise<void> {
    const userId = this.auth.user()?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userProfile = this.userProfileSignal();
    if (userProfile) {
      const orderItems = items.map(item => ({
        ...item,
        status: 'packed' as const,
        orderDate: new Date().toISOString()
      }));

      const updatedOrders = [...(userProfile.orders || []), ...orderItems];
      
      // Remove ordered items from cart
      const updatedCart = (userProfile.cart || []).filter(
        cartItem => !items.some(orderItem => orderItem.productId === cartItem.productId)
      );

      await this.updateUserProfile(userId, { 
        orders: updatedOrders,
        cart: updatedCart 
      });

      // Clear items to buy after successful order
      this.itemsToBuy.set([]);
    } else {
      console.error('User profile not found');
    }
  }
}
