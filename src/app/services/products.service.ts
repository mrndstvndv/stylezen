import { computed, Injectable, signal } from "@angular/core";
import { CartItem, Order, Product } from "src/libs/types";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products = signal<Product[]>([
    {
      id: 1,
      title: 'Cotton Baggy Pants',
      category: 'UNISEX',
      size: 'S-XL',
      price: 790,
      rating: 5.0,
      image: 'assets/images/cotton-baggy-pants.png',
      isFavorite: false,
      description: 'Comfortable cotton baggy pants with a relaxed fit. Perfect for casual everyday wear.',
      reviews: [
        {
          username: 'JaneD',
          rating: 5,
          date: '2023-09-15',
          comment: 'Love these pants! So comfortable for everyday wear. The fabric is breathable and lightweight, yet durable enough for daily activities. I\'ve worn them for both casual outings and lounging at home. The pockets are a great size too, which is often a problem with other pants I\'ve tried. Definitely ordering another pair in a different color.'
        },
        {
          username: 'MikeR',
          rating: 5,
          date: '2023-10-22',
          comment: 'Great quality material and perfect fit. Will buy again! The cotton blend feels premium and hasn\'t shrunk after multiple washes. I was hesitant about the baggy style at first, but they look stylish while still being comfortable. The waistband is also comfortable for all-day wear. These pants exceeded my expectations in terms of both comfort and durability.'
        },
        {
          username: 'SarahT',
          rating: 5,
          date: '2023-11-03',
          comment: 'These are now my go-to pants for casual days. Highly recommend. I work from home and needed something comfortable but presentable for video calls. These pants are perfect for that balance. The material is soft yet structured enough to look put-together. Even after months of regular wear, they still look new. The versatility alone makes them worth the price.'
        }
      ]
    },
    {
      id: 2,
      title: 'AIRism Cotton Crew Neck Long Sleeve T-Shirt',
      category: 'UNISEX',
      size: 'S-XL',
      price: 990,
      rating: 5.0,
      image: 'assets/images/airism-cotton-tshirt.png',
      isFavorite: false,
      description: 'Breathable AIRism technology combined with soft cotton for maximum comfort. Versatile long sleeve design.',
      reviews: [
        {
          username: 'AlexK',
          rating: 5,
          date: '2023-08-30',
          comment: 'The AIRism technology really works! Stays cool even in warm weather. I was skeptical about the claims, but after wearing this shirt during a summer hike, I\'m completely convinced. The moisture-wicking properties are excellent, and it dries quickly after getting sweaty. Despite being lightweight, it provides good protection from the sun. Will definitely be purchasing more of these shirts for outdoor activities.'
        },
        {
          username: 'TomL',
          rating: 5,
          date: '2023-10-12',
          comment: 'Perfect for layering. Comfortable and breathable. I\'ve been wearing this under sweaters and jackets as the weather gets cooler, and it\'s ideal. Doesn\'t add bulk but provides extra warmth when needed. The sleeve length is perfect - stays in place without riding up. The crew neck sits flat and doesn\'t stretch out. After several washes, it still maintains its shape and softness.'
        }
      ]
    },
    {
      id: 3,
      title: 'Cotton T-Shirt',
      category: 'MENS',
      size: 'S-XL',
      price: 690,
      rating: 3.0,
      image: 'assets/images/cotton-tshirt.png',
      isFavorite: false,
      description: 'Classic men\'s cotton t-shirt made from high-quality materials. Simple and essential for any wardrobe.',
      reviews: [
        {
          username: 'RobertJ',
          rating: 3,
          date: '2023-09-25',
          comment: 'Decent quality but runs smaller than expected. I usually wear a medium in most brands, but this feels more like a small. The fabric is nice and soft, but after the first wash, there was noticeable shrinkage despite following the care instructions. The stitching seems durable, and the color hasn\'t faded, which is good. If you\'re between sizes, I\'d recommend sizing up for a more comfortable fit.'
        },
        {
          username: 'DavidM',
          rating: 3,
          date: '2023-11-05',
          comment: 'Good basic t-shirt but nothing special. It serves its purpose as an everyday shirt, but I\'ve had better quality for similar prices. The cotton is decent, though not as soft as advertised. After a few washes, it started to lose its shape slightly around the collar. On the positive side, the color has held up well through multiple washes, and it\'s comfortable enough for daily wear.'
        }
      ]
    },
    {
      id: 4,
      title: "WOMEN'S SMART ANKLE PANTS 2WAY STRETCH",
      category: 'WOMENS',
      size: 'S-XL',
      price: 990,
      rating: 4.0,
      image: 'assets/images/womens-smart-ankle-pants.png',
      isFavorite: false,
      description: 'Professional ankle pants with 2-way stretch fabric for comfort and mobility. Perfect for office or casual settings.'
    },
    {
      id: 5,
      title: "WOMEN'S U CREW NECK SHORT SLEEVE T-SHIRT",
      category: 'WOMENS',
      size: 'S-XL',
      price: 780,
      rating: 5.0,
      image: 'assets/images/WOMENSUCREWNECKSHORTSLEEVET-SHIRT.png',
      isFavorite: false,
      description: 'Stylish women\'s crew neck t-shirt with a flattering cut. Made from premium cotton for everyday comfort.'
    },
    {
      id: 6,
      title: "Rayon Skipper Collar 3/4 Sleeve Blouse",
      category: 'WOMENS',
      size: 'S-L',
      price: 990,
      rating: 5.0,
      image: 'assets/images/RayonSkipperCollarSleeveBlouse.png',
      isFavorite: false,
      description: 'Elegant rayon blouse featuring a skipper collar and 3/4 sleeves. Soft, flowing fabric for a sophisticated look.'
    }
  ])

  private cart: CartItem[] = [
    {
      productId: 1,
      quantity: 1,
      color: "#3e404c",
      size: "L",
      checkout: false
    },
    {
      productId: 3,
      quantity: 3,
      color: "#ddccba",
      size: "S",
      checkout: true
    },
    {
      productId: 4,
      quantity: 1,
      color: "#4a392f",
      size: "M",
      checkout: true
    },
    {
      productId: 5,
      quantity: 2,
      color: "#1d2c3f",
      size: "XL",
      checkout: false
    },
  ]

  orders: Order[] = [
    {
      productId: 3,
      quantity: 3,
      color: "#ddccba",
      size: "S",
      shipping: true,

    },
    {
      productId: 4,
      quantity: 1,
      color: "#4a392f",
      size: "M",
      shipping: true,

    },
    {
      productId: 5,
      quantity: 2,
      color: "#1d2c3f",
      size: "XL",
      shipping: true,
    },
  ]

  getOrders() {
    return this.orders;
  }

  getProducts() {
    return this.products()
  }

  getProduct(id: number) {
    return computed(() => this.products().find((product) => product.id === id));
  }

  getCart() {
    return this.cart
  }

  getFavorites() {
    return computed(() => this.products().filter((p) => p.isFavorite == true));
  }
}
