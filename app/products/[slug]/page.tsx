import { ShoppingCart } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Container from "@/components/container";
import QuantitySelector from "@/components/product/quantity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const title = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return {
        title,
        description: `Shop ${title} at Swag Store.`,
        openGraph: {
            title,
            description: `Shop ${title} at Swag Store.`,
        },
    };
}

async function ProductDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return (
        <div className="py-20">
            <h1 className="text-4xl font-bold mb-8">Vercel Book</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-zinc-100 rounded-xl overflow-hidden">
                    <Image
                        src="/images/vercel-book.jpg"
                        alt="Vercel Book"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center justify-between gap-2">
                        Product Description
                        <Badge>In Stock</Badge>
                    </h2>
                    <p className="text-base text-zinc-500 font-medium">$19.99</p>
                    <p>
                        Duis erat odio, vulputate eu ante vitae, lacinia tempus leo.
                        Maecenas vitae ante suscipit, elementum lectus nec, malesuada quam.
                        Nulla facilisi. Fusce est odio, condimentum in cursus id, accumsan
                        et lectus. Nullam auctor tincidunt arcu et facilisis. Fusce sodales
                        dapibus sapien non pulvinar. Cras tristique pulvinar libero ac
                        placerat. In ligula arcu, efficitur ac tortor id, vestibulum
                        scelerisque mi. Morbi sit amet vestibulum lectus.
                    </p>
                    <p>
                        Aliquam nec diam ut metus tristique congue. Nam venenatis urna
                        tellus, vitae pretium lorem tincidunt eget. Suspendisse potenti.
                        Suspendisse potenti. Interdum et malesuada fames ac ante ipsum
                        primis in faucibus. Donec eu lacus vitae massa gravida dictum
                        sagittis ac libero. Nullam non nunc ac urna dictum bibendum vel vel
                        sapien.
                    </p>
                    <Separator />
                    <div className="flex items-center gap-4">
                        <QuantitySelector />
                        <p className="text-xs text-zinc-500 font-medium">
                            3 items left in stock.
                        </p>
                    </div>
                    <Button size="lg">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    return (
        <Container>
            <Suspense fallback={null}>
                <ProductDetail params={params} />
            </Suspense>
        </Container>
    );
}
