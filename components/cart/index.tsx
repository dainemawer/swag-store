import { getCart } from "@/lib/cart";
import CartPopover from "./cart-popover";

export { CartPopoverFallback } from "./cart-popover";

export default async function Cart() {
    const cart = await getCart();
    return (
        <CartPopover
            items={cart.data.items}
            totalItems={cart.data.totalItems}
            subtotal={cart.data.subtotal}
        />
    );
}
