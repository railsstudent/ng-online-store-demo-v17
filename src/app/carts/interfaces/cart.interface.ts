import { Product } from '../../products/product.interface';

export type CartItem = Product & { quantity: number };