import type { Product } from "@/types/products";
import Container from "./container";
import ProductCard from "./product/card";

export default async function ProductListing({
    products = [],
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
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
