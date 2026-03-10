import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function Cart() {
    return (
        <div className="relative ml-auto inline-flex items-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="relative" variant="ghost" size="lg">
                        <ShoppingBag className="w-8 h-8" />
                        <span className="absolute text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center top-0 right-0">1</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72">
                    <PopoverHeader>
                        <PopoverTitle>Title</PopoverTitle>
                        <PopoverDescription>Description text here.</PopoverDescription>
                    </PopoverHeader>
                </PopoverContent>
            </Popover>
        </div>
    );
}
