import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../products/product.interface';
import { CartItem } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<CartItem[]>([]);
  promoCode = signal<string>('');

  total = computed(() => {
    const results = this.cart().reduce(({ quantity, subtotal }, item) => {
      const newQuantity = quantity + item.quantity;
      const newSubtotal = subtotal + item.price * item.quantity;

      return { 
        quantity: newQuantity,
        subtotal: newSubtotal
      }
    }, { quantity: 0, subtotal: 0 });

    const total = results.subtotal * ( 1 - this.discount()); 

    return { 
      quantity: results.quantity, 
      amount: results.subtotal.toFixed(2),
      total: total.toFixed(2),
    };
  })

  discount = computed(() => {
    return this.promoCode() === 'DEVFESTHK2023' ? 0.2 : 0;
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