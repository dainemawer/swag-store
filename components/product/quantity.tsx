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

    const handleQuantityChange = (value: number) => {
        const max = stock?.stock ?? Infinity;
        const newValue = Math.min(Math.max(value, 1), max);
        setQuantity(newValue);
    };

    return (
        <div className="flex items-center">
            <ButtonGroup>
                <Button
                    className={sizeClass}
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || disabled}
                >
                    <MinusIcon />
                </Button>
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        handleQuantityChange(Number(e.target.value));
                    }}
                    className={cn(inputClass, "text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none")}
                />
                <Button
                    className={sizeClass}
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={
                        disabled ||
                        (stock !== null && quantity >= stock.stock)
                    }
                >
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}
