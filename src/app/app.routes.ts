import { Routes } from '@angular/router';
import { productResolver } from './products/resolvers/product.resolver';

export const routes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('./products/product-list/product-list.component').then((m) => m.ProductListComponent),
        title: 'Product list',
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./products/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
        title: 'Product',
        resolve: {
          product: productResolver,
        }
      },
        {
        path: 'my-cart',
        loadComponent: () => import('./carts/cart/cart.component').then((m) => m.CartComponent),
        title: 'My shopping cart',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
      {
        path: '**',
        redirectTo: 'products'
      }
];
