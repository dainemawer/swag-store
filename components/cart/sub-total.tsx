"use client";

import { useCartCount } from "@/context/cart-count";
import { formatPrice } from "@/lib/utils";

export default function SubTotal() {
    const { subtotal } = useCartCount();
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Sub-total</p>
            <p className="text-sm font-medium">
                {formatPrice(subtotal)}
            </p>
        </div>
    );
}
