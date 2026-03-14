"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { useState, useTransition } from "react";
import { addItemToCartAction } from "@/lib/actions/cart";
import type { Stock } from "@/types/stock";
import QuantitySelector from "../product/quantity";
import { Button } from "../ui/button";

export default function AddToCart({
    id,
    showQuantitySelector = true,
    stock,
}: {
    id: string;
    showQuantitySelector?: boolean;
    stock?: Stock | null;
}) {
    const [isPending, startTransition] = useTransition();
    const [quantity, setQuantity] = useState(1);

    const handleAddItemToCart = async (quantity: number) => {
        startTransition(async () => {
            await addItemToCartAction(id, quantity);
        });
    };
    return (
        <>
            {showQuantitySelector && (
                <div className="flex items-center gap-4">
                    <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                        stock={stock ?? null}
                        size="default"
                        disabled={isPending}
                    />
                    <p className="text-xs text-zinc-500 font-medium">
                        {stock?.stock
                            ? `${stock.stock} items left in stock.`
                            : "Out of stock."}
                    </p>
                </div>
            )}
            <Button
                size="lg"
                onClick={() => handleAddItemToCart(quantity)}
                disabled={isPending}
            >
                {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <ShoppingCart className="w-4 h-4" />
                )}
                Add to Cart
            </Button>
        </>
    );
}
