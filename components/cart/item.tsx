import { XIcon } from "lucide-react";
import Image from "next/image";
import QuantitySelector from "../product/quantity";
import { Button } from "../ui/button";

export default function CartItem({
    item,
}: {
    item: {
        id: string;
        name: string;
        price: number;
        image: string;
        quantity: number;
    };
}) {
    return (
        <div className="flex items-center justify-between py-2 gap-2">
            <div className="flex items-center gap-2">
                <figure className="aspect-square relative size-14 bg-zinc-50 overflow-hidden">
                    <Image src={item.image} alt={item.name} width={56} height={56} />
                </figure>
                <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-zinc-500">${item.price}.00</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <QuantitySelector size="sm" />
                <p className="text-sm text-black font-medium">${item.price}.00</p>
                <Button variant="ghost" size="sm">
                    <XIcon className="w-4 h-4 text-zinc-500 hover:text-zinc-700" />
                </Button>
            </div>
        </div>
    );
}
