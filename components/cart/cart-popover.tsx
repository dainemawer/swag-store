"use client";

import { ArrowRightIcon, ShoppingBag } from "lucide-react";
import CartBadge from "@/components/cart/badge";
import CartItems from "@/components/cart/items";
import SubTotal from "@/components/cart/sub-total";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/types/cart";

export type CartPopoverProps = {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
};

export default function CartPopover({
    items,
    totalItems,
    subtotal,
}: CartPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="relative" variant="ghost" type="button">
                    <ShoppingBag className="w-8 h-8" />
                    <CartBadge serverCount={totalItems} serverSubtotal={subtotal} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-120 p-4">
                <PopoverHeader>
                    <PopoverTitle>Your Cart</PopoverTitle>
                </PopoverHeader>
                <div className="space-y-4">
                    <CartItems items={items} />
                    <Separator />
                    <SubTotal />
                    <Button className="w-full" size="lg" type="button">
                        Checkout <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

/** Same trigger shape as the real cart while the server cart is loading. */
export function CartPopoverFallback() {
    return (
        <Button className="relative" variant="ghost" type="button">
            <ShoppingBag className="w-8 h-8" />
            <CartBadge serverCount={0} serverSubtotal={0} />
        </Button>
    );
}
