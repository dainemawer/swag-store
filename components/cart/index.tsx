import { ArrowRightIcon, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/cart";
import CartLineItem from "./item";

export default async function Cart() {
    const cart = await getCart();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="relative" variant="ghost">
                    <ShoppingBag className="w-8 h-8" />
                    {cart.data.totalItems > 0 && (
                        <span className="absolute text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center top-0 right-0">
                            {cart.data.totalItems}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-120 p-4">
                <PopoverHeader>
                    <PopoverTitle>Your Cart</PopoverTitle>
                </PopoverHeader>
                <div className="space-y-4">
                    {cart.data.items.length > 0 ? (
                        cart.data.items.map((item: CartItem) => (
                            <CartLineItem
                                key={`${item.productId}-${item.product.name}`}
                                item={item}
                            />
                        ))
                    ) : (
                        <div className="flex h-full">
                            <p className="text-sm text-zinc-500">Your cart is empty</p>
                        </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Sub-total</p>
                        <p className="text-sm font-medium">
                            {formatPrice(cart.data.subtotal)}
                        </p>
                    </div>
                    <Button className="w-full" size="lg">
                        Checkout <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
