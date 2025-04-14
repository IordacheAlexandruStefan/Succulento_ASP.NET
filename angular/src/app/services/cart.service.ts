import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth-service.service';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  productId: number;
  name: string;      
  imageUrl: string;  
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  idClient: number;
}

export interface OrderProduct {
  orderId: number;
  productId: number;
  cantitate: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject = new BehaviorSubject<CartItem[]>([]);
  private itemsInCart: CartItem[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.itemsInCartSubject.subscribe(items => {
      localStorage.setItem('cart', JSON.stringify(items));
    });
  }

  loadCart(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  public addToCart(item: CartItem) {
    const currentItems = [...this.itemsInCartSubject.getValue()];
    const itemFound = currentItems.find(ci => ci.productId === item.productId);
    if (itemFound) {
      itemFound.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }
    this.itemsInCartSubject.next(currentItems);
  }

  public removeFromCart(productId: number) {
    // Use the current items from the BehaviorSubject to filter out the item
    const currentItems = [...this.itemsInCartSubject.getValue()];
    const itemsWithoutRemoved = currentItems.filter(item => item.productId !== productId);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public clearCart() {
    this.itemsInCartSubject.next([]);
  }

  public getItems(): BehaviorSubject<CartItem[]> {
    return this.itemsInCartSubject;
  }

  public updateCart(items: CartItem[]): void {
    this.itemsInCartSubject.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }
  
  public checkout(): void {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('User is not logged in.');
      return;
    }
  
    const idClient = parseInt(userId);
    const cartItems = this.itemsInCartSubject.getValue();
  
    const order = { idClient };
    this.http.post<Order>('https://localhost:7031/api/orders', order).subscribe(
      (createdOrder) => {
        if (!createdOrder || typeof createdOrder.id === 'undefined') {
          console.error('Order ID was not returned from the backend.');
          return;
        }
        
        cartItems.forEach((cartItem) => {
          const orderProduct: OrderProduct = {
            orderId: createdOrder.id!,
            productId: cartItem.productId,
            cantitate: cartItem.quantity,
          };
  
          this.http.post<OrderProduct>('https://localhost:7031/api/orderproducts', orderProduct).subscribe(
            () => {
              // Successfully added order product
            },
            (error) => {
              console.error(`Error adding product ${cartItem.productId} to order:`, error);
            }
          );
        });
  
        this.clearCart();
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }
}
