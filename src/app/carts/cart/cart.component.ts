import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CartItemComponent, CartTotalComponent, NgIf],
  template: `
    <div class="cart">
      <ng-container *ngIf="cart().length > 0 else emptyCart">
        <div class="row">
          <p style="width: 10%">Id</p>
          <p style="width: 20%">Title</p>
          <p style="width: 40%">Description</p>
          <p style="width: 10%">Price</p>
          <p style="width: 10%">Qty</p> 
          <p style="width: 10%">&nbsp;</p> 
        </div>

        <app-cart-item *ngFor="let item of cart()" [item]="item" />
        <app-cart-total />
      </ng-container>
    </div>
    <ng-template #emptyCart>
      <p>Your cart is empty, please buy something.</p>
    </ng-template>
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