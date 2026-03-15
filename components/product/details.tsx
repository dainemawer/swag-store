import Image from "next/image";
import AddToCart from "@/components/cart/add-to-cart";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blurDataURL } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/products";
import type { Stock } from "@/types/stock";
import { Skeleton } from "../ui/skeleton";

export default async function ProductDetails({
    product,
    promisedStock,
}: {
    product: Product;
    promisedStock: Promise<{ data: Stock | null }>;
}) {
    const { data: stock } = await promisedStock;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            <div>
                <h1 className="text-4xl font-bold mb-8">{product.name}</h1>
                <figure className="aspect-square bg-zinc-100 rounded-xl overflow-hidden relative">
                    <Image
                        src={product.images[0]}
                        blurDataURL={blurDataURL}
                        alt={product.name}
                        fill
                        preload
                        sizes="500px"
                        placeholder="blur"
                    />
                </figure>
            </div>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-between gap-2">
                    Product Description
                    <Badge>{stock?.inStock ? "In Stock" : "Out of Stock"}</Badge>
                </h2>
                <p className="text-base text-zinc-500 font-medium">
                    {formatPrice(product.price)}
                </p>
                <p>{product.description}</p>
                <Separator />
                <AddToCart id={product.id} stock={stock || null} />
            </div>
        </div>
    );
}

export function ProductDetailsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <Skeleton className="h-10 w-3/4 mb-8" />
                <Skeleton className="aspect-square w-full rounded-xl" />
            </div>
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-5 w-16" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-11 w-36 rounded-md" />
            </div>
        </div>
    );
}
