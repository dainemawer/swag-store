"use client";

import { Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import QuantitySelector from "@/components/product/quantity";
import { Button } from "@/components/ui/button";
import { useCartCount } from "@/context/cart-count";
import {
    removeItemFromCartAction,
    updateItemQuantityAction,
} from "@/lib/actions/cart";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/cart";

export default function CartLineItem({ item }: { item: CartItem }) {
    const { increment, adjustSubtotal } = useCartCount();
    const [isRemoving, startRemoveTransition] = useTransition();
    const [isUpdating, startUpdateTransition] = useTransition();
    const [optimisticVisible, updateOptimisticVisible] = useOptimistic(true);
    const [optimisticQuantity, updateOptimisticQuantity] = useOptimistic(
        item.quantity,
        (_state, update: number) => update,
    );

    const handleRemoveItemFromCart = async (productId: string) => {
        increment(-item.quantity);
        adjustSubtotal(-(item.quantity * item.product.price));
        startRemoveTransition(async () => {
            updateOptimisticVisible(false);
            await removeItemFromCartAction(productId);
            toast.success(
                `${item.quantity} ${item.quantity > 1 ? "items" : "item"} removed from cart`,
            );
        });
    };

    const handleUpdateItemQuantity = async (
        productId: string,
        newQuantity: number,
    ) => {
        const delta = newQuantity - optimisticQuantity;
        increment(delta);
        adjustSubtotal(delta * item.product.price);
        startUpdateTransition(async () => {
            updateOptimisticQuantity(newQuantity);
            await updateItemQuantityAction(productId, newQuantity);
            toast.success("Cart item updated successfully");
        });
    };

    if (!optimisticVisible) return null;

    const isPending = isRemoving || isUpdating;

    return (
        <div className={`relative flex items-center justify-between py-2 gap-2 transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
            <div className="flex items-center gap-2">
                <figure className="aspect-square relative size-14 bg-zinc-50 overflow-hidden">
                    <Image
                        alt={item.product.name}
                        src={item.product.images[0]}
                        fill
                        sizes="56px"
                    />
                </figure>
                <div>
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-xs text-zinc-500">
                        {formatPrice(item.product.price)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <QuantitySelector
                    disabled={isPending}
                    quantity={optimisticQuantity}
                    setQuantity={(newQuantity) =>
                        handleUpdateItemQuantity(item.productId, newQuantity)
                    }
                    stock={null}
                    size="sm"
                />
                <p className="text-sm text-black font-medium">
                    {formatPrice(item.product.price * optimisticQuantity)}
                </p>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItemFromCart(item.productId)}
                    disabled={isPending}
                >
                    {isRemoving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <XIcon className="w-4 h-4 text-zinc-500 hover:text-zinc-700" />
                    )}
                </Button>
            </div>
        </div>
    );
}
