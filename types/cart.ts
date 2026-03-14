import type { Product } from "./products";

export interface CartItem {
  lineTotal: number;
  product: Product;
  quantity: number;
  productId: string;
  addedAt: string;
}

export interface Cart {
  token: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

