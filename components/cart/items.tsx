"use client";

import { useEffect, useRef } from "react";
import { useCartCount } from "@/context/cart-count";
import type { CartItem } from "@/types/cart";
import CartLineItem from "./item";

export default function CartItems({ items }: { items: CartItem[] }) {
    const { count } = useCartCount();
    const hydrated = useRef(false);

    useEffect(() => {
        hydrated.current = true;
    }, []);

    const isEmpty = hydrated.current ? count === 0 : items.length === 0;

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
                <CartLineItem
                    key={`${item.productId}-${item.product.name}`}
                    item={item}
                />
            ))}
        </>
    );
}
