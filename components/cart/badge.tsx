"use client";

import { useEffect } from "react";
import { useCartCount } from "@/context/cart-count";

export default function CartBadge({ serverCount, serverSubtotal }: { serverCount: number; serverSubtotal: number }) {
    const { count, setCount, setSubtotal } = useCartCount();

    useEffect(() => {
        setCount(serverCount);
        setSubtotal(serverSubtotal);
    }, [serverCount, serverSubtotal, setCount, setSubtotal]);

    if (count === 0) return null;

    return (
        <span className="absolute text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center top-0 right-0">
            {count}
        </span>
    );
}
