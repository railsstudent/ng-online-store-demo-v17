import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CartTotalComponent, FormsModule],
  template: `
    <div class="cart">
      @if (cart().length > 0) {
        @defer {
          <div class="row">
            <p style="width: 10%">Id</p>
            <p style="width: 20%">Title</p>
            <p style="width: 40%">Description</p>
            <p style="width: 10%">Price</p>
            <p style="width: 10%">Qty</p> 
            <p style="width: 10%">&nbsp;</p> 
          </div>
          @for (item of cart(); track item.id) {
            <app-cart-item [item]="item" />
          }
          <app-cart-total />
          <span>Promotion code: </span>
          <input [ngModel]="promoCode()" #promotionCode="ngModel" />
          <button (click)="promoCode.set(promotionCode.value)">Apply</button>
        } @loading (after 300ms; minimum 150ms) {
          <p>Loading...</p>
        } @placeholder (minimum 300ms) {
          <p>No shopping cart</p>
        }
      } @else {
        <p>Your cart is empty, please buy something.</p>
      }
    </div>
  `,
  styles: [`
    .row {
      display: flex;
    }

    .row > p {
      border: 1px solid black;
    }

    input {
      margin-right: 0.25rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cartService = inject(CartService);
  cart = this.cartService.cart;
  promoCode = this.cartService.promoCode;
}