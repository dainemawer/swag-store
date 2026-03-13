import { ShoppingCart } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Container from "@/components/container";
import QuantitySelector from "@/components/product/quantity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getProduct, getProducts } from '@/lib/products';
import { getProductStock } from '@/lib/stock';
import { blurDataURL } from "@/lib/placeholder";
import { notFound } from "next/navigation";
import { Product } from "@/types/products";
import { Stock } from "@/types/stock";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { data: product } = await getProduct(slug);

    if (!product) return {};

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: `${product.name} - Vercel Swag Store`,
            description: product.description,
            images: [product.images[0]],
        },
        twitter: {
            title: `${product.name} - Vercel Swag Store`,
            description: product.description,
            images: [product.images[0]],
        },
    }
}

export async function generateStaticParams() {
    const { data: products } = await getProducts(true, 6);
    return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const [{ data: product }, { data: stock }] = await Promise.all([getProduct(slug), getProductStock(slug)])

    if (!product) notFound();

    return (
        <Container>
            <Suspense fallback={<ProductDetailsSkeleton />}>
                <ProductDetails product={product} stock={stock} />
            </Suspense>
        </Container>
    );
}

function ProductDetailsSkeleton() {
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


async function ProductDetails({ product, stock }: { product: Product, stock: Stock }) {
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
                        sizes="500px"
                        placeholder="blur"
                    />
                </figure>
            </div>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-between gap-2">
                    Product Description
                    <Badge>{stock.inStock ? 'In Stock' : 'Out of Stock'}</Badge>
                </h2>
                <p className="text-base text-zinc-500 font-medium">{product.price}</p>
                <p>
                    {product.description}
                </p>
                <Separator />
                <div className="flex items-center gap-4">
                    <QuantitySelector size="default" />
                    <p className="text-xs text-zinc-500 font-medium">
                        {stock.stock} items left in stock.
                    </p>
                </div>
                <Button size="lg">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
