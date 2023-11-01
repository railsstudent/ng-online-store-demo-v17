import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  template: `
    <div class="summary">
      <div style="width: 20%;">Qty: {{ total().quantity }}</div>
      <div style="width: 20%;">Total: {{ total().amount }}</div>
    </div>
  `,
  styles: [`
    .summary {
      display: flex;
      border: 1px solid black;
      justify-content: flex-end;
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartTotalComponent {
  total = inject(CartService).total;
}