import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "./container";
import { Button } from "./ui/button";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
};

function ProductCard({ product }: { product: Product }) {
    return (
        <div className="border border-zinc-200 rounded-lg p-4 space-y-4">
            <figure className="aspect-square bg-zinc-50 rounded-xl overflow-hidden">
                <Link href={`/products/${product.id}`}>
                    <Image className="hover:scale-105 transition-all duration-300" src={product.image} alt={product.name} width={300} height={300} />
                </Link>
            </figure>

            <div className="space-y-1">
                <h3 className="text-lg font-bold">
                    <Link className="hover:underline underline-offset-4" href={`/products/${product.id}`}>{product.name}</Link>
                </h3>

                <p className="text-sm text-zinc-500">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <Button size="lg">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </Button>
                    <p className="text-base font-medium text-zinc-400">${product.price}.00</p>
                </div>
            </div>
        </div>
    );
}

export default function ProductListing({
    products,
    title,
}: {
    products: Product[];
    title: string;
}) {
    return (
        <section>
            <Container>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
