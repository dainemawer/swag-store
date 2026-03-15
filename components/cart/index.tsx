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
import { getCart } from "@/lib/cart";
import type { CartItem } from "@/types/cart";

export default async function Cart() {
    const cart = await getCart();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="relative" variant="ghost">
                    <ShoppingBag className="w-8 h-8" />
                    <CartBadge serverCount={cart.data.totalItems} serverSubtotal={cart.data.subtotal} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-120 p-4">
                <PopoverHeader>
                    <PopoverTitle>Your Cart</PopoverTitle>
                </PopoverHeader>
                <div className="space-y-4">
                    <CartItems items={cart.data.items as CartItem[]} />
                    <Separator />
                    <SubTotal />
                    <Button className="w-full" size="lg">
                        Checkout <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
