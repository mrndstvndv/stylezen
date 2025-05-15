import { computed, effect, inject, Injectable } from "@angular/core";
import { Firestore, collection, getDocs, DocumentData, QuerySnapshot } from "@angular/fire/firestore";
import { CartItem, Order, Product } from "src/libs/types";
import { BehaviorSubject } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { StoreService } from "./store.service";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly firestore = inject(Firestore);
  private readonly store = inject(StoreService);

  private readonly _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public readonly products = toSignal(this._products.asObservable(), { initialValue: [] }); // Expose as readonly signal

  // Cart and Orders remain as previously defined
  private cart: CartItem[] = [
    { productId: 1, quantity: 1, color: "#3e404c", size: "L", checkout: false },
    { productId: 3, quantity: 3, color: "#ddccba", size: "S", checkout: true },
    { productId: 4, quantity: 1, color: "#4a392f", size: "M", checkout: true },
    { productId: 5, quantity: 2, color: "#1d2c3f", size: "XL", checkout: false },
  ];

  orders: Order[] = [
    { productId: 3, quantity: 3, color: "#ddccba", size: "S", shipping: true },
    { productId: 4, quantity: 1, color: "#4a392f", size: "M", shipping: true },
    { productId: 5, quantity: 2, color: "#1d2c3f", size: "XL", shipping: true },
  ];

  constructor() {
    console.log("ProductsService initialized");

    effect(() => {
      const userProfile = this.store.userProfile();
      if (userProfile) {
        // User profile is available, load products
        console.log("User profile detected in ProductsService, loading products.");
        this._loadProductsFromFirestore();
      } else {
        // User profile is null (e.g., user logged out or not yet loaded)
        // Clear products to avoid showing stale data or incorrect favorites
        console.log("User profile not available or user logged out, clearing products.");
        this._products.next([]);
      }
    });
  }

  private async _loadProductsFromFirestore(): Promise<void> {
    try {
      const productsCollectionRef = collection(this.firestore, 'products');
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(productsCollectionRef);
      const currentUserProfile = this.store.userProfile(); // Get current profile
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        console.log(`Fetched product: ${doc.id}`, doc.data());

        let isFavorite = false;
        if (currentUserProfile && currentUserProfile.favorites) {
          isFavorite = currentUserProfile.favorites.includes(parseInt(doc.id, 10));
        }

        fetchedProducts.push({ id: parseInt(doc.id, 10), isFavorite: isFavorite, ...doc.data() } as Product);
      });
      this._products.next(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
      this._products.next([]); // Emit empty array on error
    }
  }

  getOrders() {
    return this.orders;
  }

  getProduct(id: number) {
    // This computed signal will react to changes in the products signal
    return computed(() => this.products().find((product) => product.id === id));
  }

  getProductById(id: number): Product | undefined {
    // Synchronously get product by ID from the BehaviorSubject's current value
    return this._products.getValue().find((product) => product.id === id);
  }

  getCart() {
    return this.cart;
  }
}
