import { SearchX } from "lucide-react";
import ProductListing from "@/components/product-listing";
import { searchProducts } from "@/lib/search";
import { Skeleton } from "../ui/skeleton";

export default async function ProductResults({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>;
}) {
    const { q, category } = await searchParams;
    const { data: products } = await searchProducts(
        q,
        category,
        q || category ? 5 : undefined,
    );

    if (!products.length) {
        return <EmptyState />;
    }

    const title =
        q && category
            ? `Results for "${q}" · ${category}`
            : q
              ? `Results for "${q}"`
              : "All Products";

    return <ProductListing products={products} title={title} />;
}

export function ProductResultsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["a", "b", "c"].map((key) => (
                <div
                    key={key}
                    className="border border-zinc-200 rounded-lg p-4 space-y-4"
                >
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            ))}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-zinc-500">
            <SearchX className="w-12 h-12" />
            <p className="text-lg font-medium">No products were found for your search.</p>
        </div>
    );
}
