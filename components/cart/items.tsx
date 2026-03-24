"use client";

import { useCartCount } from "@/context/cart-count";
import type { CartItem } from "@/types/cart";
import CartLineItem from "./item";

export default function CartItems({ items }: { items: CartItem[] }) {
  const { count } = useCartCount();

  // After mount the context count is authoritative (covers optimistic updates);
  // before mount (SSR) fall back to the server-rendered items array length.
  const isEmpty = count === 0 && items.length === 0;

  if (isEmpty) {
    return (
      <div className="flex h-full">
        <p className="text-sm text-zinc-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <CartLineItem key={item.productId} item={item} />
      ))}
    </>
  );
}
