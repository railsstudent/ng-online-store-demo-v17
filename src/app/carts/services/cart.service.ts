import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../products/product.interface';
import { CartItem } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<CartItem[]>([]);
  promoCode = signal<string>('');

  discountPercent = computed(() => {
    const code = this.promoCode();
    if (code === 'DEVFESTHK2023') {
      return 0.1;
    } else if (code === 'ANGULARNATION') {
      return 0.2;
    }

    return 0;
  })

  summary = computed(() => {
    const results = this.cart().reduce(({ quantity, subtotal }, item) => {
      const newQuantity = quantity + item.quantity;
      const newSubtotal = subtotal + item.price * item.quantity;

      return { 
        quantity: newQuantity,
        subtotal: newSubtotal
      }
    }, { quantity: 0, subtotal: 0 });

    const { subtotal, quantity } = results;
    const discount = subtotal * this.discountPercent();
    const total = subtotal - discount; 

    return { 
      quantity, 
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
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