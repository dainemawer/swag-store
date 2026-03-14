"use client";

import { Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import { useOptimistic, useTransition } from "react";
import QuantitySelector from "@/components/product/quantity";
import { Button } from "@/components/ui/button";
import {
    removeItemFromCartAction,
    updateItemQuantityAction,
} from "@/lib/actions/cart";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/cart";

export default function CartLineItem({ item }: { item: CartItem }) {
    const [isRemoving, startRemoveTransition] = useTransition();
    const [isUpdating, startUpdateTransition] = useTransition();
    const [optimisticQuantity, updateOptimisticQuantity] = useOptimistic(
        item.quantity,
        (state, update: number) => update,
    );

    const handleRemoveItemFromCart = async (productId: string) => {
        startRemoveTransition(async () => {
            await removeItemFromCartAction(productId);
        });
    };

    const handleUpdateItemQuantity = async (
        productId: string,
        newQuantity: number,
    ) => {
        startUpdateTransition(async () => {
            updateOptimisticQuantity(newQuantity);
            await updateItemQuantityAction(productId, newQuantity);
        });
    };

    return (
        <div className="flex items-center justify-between py-2 gap-2">
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
                <QuantitySelector disabled={isUpdating || isRemoving} quantity={optimisticQuantity} setQuantity={(newQuantity) => handleUpdateItemQuantity(item.productId, newQuantity)} stock={null} size="sm" />
                <p className="text-sm text-black font-medium">
                    {formatPrice(item.lineTotal)}
                </p>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItemFromCart(item.productId)}
                    disabled={isRemoving || isUpdating}
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
