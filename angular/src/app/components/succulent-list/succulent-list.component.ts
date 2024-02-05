// src/app/components/succulent-list/succulent-list.component.ts

import { Component, OnInit } from '@angular/core';
import { SucculentService, Product } from '../../services/succulent.service';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-succulent-list',
  templateUrl: './succulent-list.component.html',
  styleUrls: ['./succulent-list.component.css']
})
export class SucculentListComponent implements OnInit {
  succulents: Product[] = []; // Use the Product interface here

  constructor(
    private succulentService: SucculentService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.succulentService.getSucculents().subscribe(
      (data) => {
        this.succulents = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  addToCart(product: Product): void { // Update the parameter to type Product
    const cartItem: CartItem = {
      productId: product.id,
      name: product.nume,
      imageUrl: product.urlPoza, // Assuming you have imageUrl in Product interface
      quantity: 1, // Default quantity
      price: product.pret
    };
    this.cartService.addToCart(cartItem);
  }
}