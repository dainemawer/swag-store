import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/cart/add-to-cart";
import { blurDataURL } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/products";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article className="border border-zinc-200 rounded-lg p-4 space-y-4">
            <figure className="bg-zinc-50 rounded-xl overflow-hidden">
                <Link
                    className="aspect-square relative size-full block"
                    href={`/products/${product.slug}`}
                >
                    <Image
                        className="hover:scale-105 transition-all duration-300"
                        src={product.images[0] || "/images/vercel-book.jpg"}
                        alt={product.name}
                        fill
                        sizes="300px"
                        blurDataURL={blurDataURL}
                        placeholder="blur"
                    />
                </Link>
            </figure>

            <div className="space-y-1">
                <h3 className="text-lg font-bold">
                    <Link
                        className="hover:underline underline-offset-4"
                        href={`/products/${product.slug}`}
                    >
                        {product.name}
                    </Link>
                </h3>

                <p className="text-sm text-zinc-500">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <AddToCart
                        id={product.id}
                        showQuantitySelector={false}
                    />
                    <p className="text-base font-medium text-zinc-400">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </div>
        </article>
    );
}
