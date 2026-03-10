import { ShoppingBag } from "lucide-react";

export default function Cart() {
    return (
        <div className="relative ml-auto inline-flex items-center">
            <button type="button">
                <ShoppingBag className="w-4 h-4" />
            </button>
        </div>
    )
}
