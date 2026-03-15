"use server";

import { refresh } from "next/cache";

import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "@/lib/cart";

export async function addItemToCartAction(productId: string, quantity: number) {
  const { data } = await addItemToCart(productId, quantity);
  refresh();
  return data;
}

export async function removeItemFromCartAction(productId: string) {
  const { data } = await removeItemFromCart(productId);
  refresh();
  return data;
}

export async function updateItemQuantityAction(
  productId: string,
  quantity: number,
) {
  const { data } = await updateItemQuantity(productId, quantity);
  refresh();
  return data;
}
