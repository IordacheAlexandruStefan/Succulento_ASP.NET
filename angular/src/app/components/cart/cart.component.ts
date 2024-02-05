// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }

  incrementQuantity(index: number): void {
    if (this.cartItems[index]) {
      this.cartItems[index].quantity++;
      this.cartService.updateCart(this.cartItems);
    }
  }

  decrementQuantity(index: number): void {
    if (this.cartItems[index] && this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.cartService.updateCart(this.cartItems);
    }
  }

  updateQuantity(index: number, quantity: number): void {
    if (this.cartItems[index] && quantity > 0) {
      this.cartItems[index].quantity = quantity;
      this.cartService.updateCart(this.cartItems);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    this.cartService.checkout();
  }

  getTotalPrice(item: CartItem): number {
    return item.quantity * item.price;
  }

  getTotalOrderPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }
}
