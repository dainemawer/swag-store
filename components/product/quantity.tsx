import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Stock } from "@/types/stock";
import { ButtonGroup } from "../ui/button-group";

type QuantitySelectorProps = {
    disabled: boolean;
    quantity: number;
    setQuantity: (quantity: number) => void;
    stock: Stock | null;
    size: "sm" | "default";
}

export default function QuantitySelector({ disabled, quantity, setQuantity, stock, size }: QuantitySelectorProps) {
    const sizeClass = size === "sm" ? "size-7" : "size-10";
    const inputClass = size === "sm" ? "w-10 h-7" : "w-20 h-10";

    return (
        <div className="flex items-center gap-0">
            <ButtonGroup>
                <Button className={sizeClass} variant="outline" size="icon" onClick={() => setQuantity(Math.max(quantity - 1, 1))} disabled={quantity <= 1 || disabled}>
                    <MinusIcon />
                </Button>
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className={cn(inputClass, "text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none")}
                />
                <Button className={sizeClass} variant="outline" size="icon" onClick={() => setQuantity(Math.min(quantity + 1, stock?.stock ?? Infinity))} disabled={stock !== null && quantity >= (stock?.stock ?? Infinity) || disabled}>
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}
