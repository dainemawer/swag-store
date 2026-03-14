"use server";

import { revalidatePath } from "next/cache";
import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "@/lib/cart";

export async function addItemToCartAction(productId: string, quantity: number) {
  const { data } = await addItemToCart(productId, quantity);
  revalidatePath("/", "layout");
  return data;
}

export async function removeItemFromCartAction(productId: string) {
  const { data } = await removeItemFromCart(productId);
  revalidatePath("/", "layout");
  return data;
}

export async function updateItemQuantityAction(
  productId: string,
  quantity: number,
) {
  const { data } = await updateItemQuantity(productId, quantity);
  revalidatePath("/", "layout");
  return data;
}
