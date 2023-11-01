import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CartTotalComponent],
  template: `
    <div class="cart">
      @if (cart().length > 0) {
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

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cart = inject(CartService).cart;
}