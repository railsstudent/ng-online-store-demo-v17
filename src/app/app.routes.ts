import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('./products/product-list/product-list.component').then((m) => m.ProductListComponent)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./products/product-details/product-details.component').then((m) => m.ProductDetailsComponent)
    },
    {
        path: 'my-cart',
        loadComponent: () => import('./carts/cart/cart.component').then((m) => m.CartComponent)
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
