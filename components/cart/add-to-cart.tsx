"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import QuantitySelector from "@/components/product/quantity";
import StockStatus from "@/components/product/stock";
import { Button } from "@/components/ui/button";
import { useCartCount } from "@/context/cart-count";
import { addItemToCartAction } from "@/lib/actions/cart";
import type { Stock } from "@/types/stock";

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
  const { increment } = useCartCount();

  const handleAddItemToCart = async (quantity: number) => {
    increment(quantity);
    startTransition(async () => {
      try {
        await addItemToCartAction(id, quantity);
        toast.success(
          `${quantity} ${quantity > 1 ? "items" : "item"} added to cart`,
        );
      } catch {
        increment(-quantity);
        toast.error("Failed to add item to cart. Please try again.");
      }
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
          <StockStatus stock={stock ?? null} />
        </div>
      )}
      <Button
        size="lg"
        onClick={() => handleAddItemToCart(quantity)}
        disabled={
          isPending ||
          (stock !== undefined && stock !== null && !stock.inStock)
        }
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
