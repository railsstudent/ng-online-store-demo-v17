import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../products/product.interface';
import { CartItem } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<CartItem[]>([]);

  total = computed(() => {
    const results = this.cart().reduce(({ quantity, amount }, item) => {
      const newQuantity = quantity + item.quantity;
      const newAmount = amount + item.price * item.quantity;

      return { 
        quantity: newQuantity,
        amount: newAmount
      }
    }, { quantity: 0, amount: 0 });

    return { 
      quantity: results.quantity, 
      amount: results.amount.toFixed(2)
    };
  })

  addItem(product: Product, quantity: number) {
    const idx = this.cart().findIndex((item) => item.id === product.id);
    if (idx >= 0) {
      const updatedCart = this.cart().map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      this.cart.set(updatedCart);
    } else {
      this.cart.set([...this.cart(), { ...product, quantity }]);
    }
  }

  deleteItem(id: number) {
    const updatedCart = this.cart().filter((item) => item.id !== id);
    this.cart.set(updatedCart);
  }

  updateItem(id: number, quantity: number) {
    if (quantity <= 0) {
      this.deleteItem(id);
    } else {
      const updatedCart = this.cart().map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }

        return item;
      });
      
      this.cart.set(updatedCart);
    }
  }
}