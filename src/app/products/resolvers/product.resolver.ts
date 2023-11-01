import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { Product } from "../product.interface";
import { ProductService } from "../services/product.service";

export const productResolver: ResolveFn<Product | undefined> = (route: ActivatedRouteSnapshot) => {
  const productId = route.paramMap.get('id');
  const productService = inject(ProductService);

  if (!productId) {
    return of(undefined);
  }

  return productService.getProduct(+productId);
}
