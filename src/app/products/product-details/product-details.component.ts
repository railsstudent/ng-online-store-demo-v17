import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../carts/services/cart.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [TitleCasePipe, FormsModule],
  template: `
    <div>
      @defer {  
        <div class="product">
          <div class="row">
            <img [src]="product?.image" [attr.alt]="product?.title || 'product image'" width="200" height="200" />
          </div>
          <div class="row">
            <span>id:</span>
            <span>{{ product?.id || '' }}</span>
          </div>
          <div class="row">
            <span>Category: </span>
            <span>{{ (product?.category || '') | titlecase }}</span>
          </div>
          <div class="row">
            <span>Description: </span>
            <span>{{ product?.description || '' }}</span>
          </div>
          <div class="row">
            <span>Price: </span>
            <span>{{ product?.price || '' }}</span>
          </div> 
        </div>
        <div class="buttons">
          <input type="number" class="order" min="1" [ngModel]="quantity()" (ngModelChange)="quantity.set($event)" />
          <button (click)="addItem()">Add</button>
        </div>
      } @loading (after 300ms; minimum 150ms) {
        <p>Loading....</p>
      } @placeholder (minimum 300ms) {
        <p>No product details</p>
      }
    </div>
  `,
  styles: [`
    .product, .buttons {
      margin-bottom: 1rem;
    }

    .row > span {
      display: inline-block;
      margin-bottom: 0.25rem;
    }

    .row > span:first-of-type {
      color: #aaa;
      width: 20%;
    }

    .row > span:nth-of-type(2) {
      width: 80%;
    }

    input.order {
      width: 100px;
      height: 30px;
      margin-right: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  @Input()
  product?: Product | undefined = undefined; 

  cartService = inject(CartService);
  quantity = signal(1);
  
  addItem() {
    if (this.product) {
      this.cartService.addItem(this.product, this.quantity());
    }
  }
}