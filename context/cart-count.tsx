"use client";

import { createContext, useContext, useState } from "react";

interface CartCountContextValue {
    count: number;
    increment: (amount: number) => void;
    setCount: (count: number) => void;
    subtotal: number;
    adjustSubtotal: (delta: number) => void;
    setSubtotal: (amount: number) => void;
}

const CartCountContext = createContext<CartCountContextValue>({
    count: 0,
    increment: () => {},
    setCount: () => {},
    subtotal: 0,
    adjustSubtotal: () => {},
    setSubtotal: () => {},
});

export function CartCountProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    return (
        <CartCountContext.Provider
            value={{
                count,
                increment: (n) => setCount((c) => c + n),
                setCount,
                subtotal,
                adjustSubtotal: (delta) => setSubtotal((s) => s + delta),
                setSubtotal,
            }}
        >
            {children}
        </CartCountContext.Provider>
    );
}

export function useCartCount() {
    return useContext(CartCountContext);
}
