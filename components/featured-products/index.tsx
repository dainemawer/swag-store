import type { Product } from "@/types/products";
import ProductListing from "../product-listing";

export async function FeaturedProducts({
    promisedProducts,
}: {
    promisedProducts: Promise<{ data: Product[] }>;
}) {
    const { data: products } = await promisedProducts;
    return <ProductListing products={products || []} title="Featured Products" />;
}
