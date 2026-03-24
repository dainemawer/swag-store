import { cacheLife, cacheTag } from "next/cache";
import type { Product } from "@/types/products";
import ProductListing from "../product-listing";

export async function FeaturedProducts({
    promisedProducts,
}: {
    promisedProducts: Promise<{ data: Product[] }>;
}) {
    "use cache";
    cacheLife("products");
    cacheTag("products");

    const { data: products } = await promisedProducts;
    return <ProductListing products={products} title="Featured Products" />;
}
