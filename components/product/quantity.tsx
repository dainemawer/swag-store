import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "../ui/button-group";

export default function QuantitySelector() {
    return (
        <div className="flex items-center gap-0">
            <ButtonGroup>
                <Button className="size-10" variant="outline" size="icon">
                    <MinusIcon />
                </Button>
                <Input type="number" value={1} className="w-20 text-center h-10" />
                <Button className="size-10" variant="outline" size="icon">
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}
