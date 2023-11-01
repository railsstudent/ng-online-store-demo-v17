import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../product.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, ProductComponent, NgIf, AsyncPipe],
  template: `
    <div>.
      <app-product *ngFor="let product of products(); trackBy: trackByFunc" [product]="product" />
    </div>
  `,
  styles: [`
    div {
      display: flex;
      flex-wrap: wrap;
      align-content: stretch;
    }

    app-product {
      flex-basis: 250px;
      height: 300px;
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  products = toSignal(inject(ProductService).products$, {
    initialValue: [] as Product[]
  });

  trackByFunc(index: number, product: Product) {
    return product.id;
  }
}
