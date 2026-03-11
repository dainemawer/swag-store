import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ButtonGroup } from "../ui/button-group";

export default function QuantitySelector({ size }: { size: "sm" | "default" }) {
    const sizeClass = size === "sm" ? "size-7" : "size-10";
    const inputClass = size === "sm" ? "w-10 h-7" : "w-20 h-10";
    return (
        <div className="flex items-center gap-0">
            <ButtonGroup>
                <Button className={sizeClass} variant="outline" size="icon">
                    <MinusIcon />
                </Button>
                <Input
                    type="number"
                    value={1}
                    className={cn(inputClass, "text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none")}
                />
                <Button className={sizeClass} variant="outline" size="icon">
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}
