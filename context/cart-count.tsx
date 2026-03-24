"use client";

import { createContext, useCallback, useContext, useState } from "react";

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

    const increment = useCallback((n: number) => setCount((c) => c + n), []);
    const adjustSubtotal = useCallback((delta: number) => setSubtotal((s) => s + delta), []);

    return (
        <CartCountContext.Provider
            value={{
                count,
                increment,
                setCount,
                subtotal,
                adjustSubtotal,
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
