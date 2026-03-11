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
import CartItem from "./item";

const cartItems = Array.from({ length: 4 }, (_, index) => ({
    id: `cart-item-${index + 1}`,
    name: `Cart Item ${index + 1}`,
    price: 100 * (index + 1),
    image: `/images/product-${index + 1}.jpg`,
    quantity: index + 1,
}));

export default function Cart() {
    return (
        <div className="relative ml-auto inline-flex items-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="relative" variant="ghost">
                        <ShoppingBag className="w-8 h-8" />
                        <span className="absolute text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center top-0 right-0">1</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-120 p-4">
                    <PopoverHeader>
                        <PopoverTitle>Your Cart</PopoverTitle>
                    </PopoverHeader>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        <Separator />
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Sub-total</p>
                            <p className="text-sm font-medium">$430.00</p>
                        </div>
                        <Button className="w-full" size="lg">
                            Checkout <ArrowRightIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
