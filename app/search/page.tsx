import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/container";
import ProductListing from "@/components/product-listing";
import SearchForm from "@/components/search/form";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/lib/categories";
import { searchProducts } from "@/lib/search";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>;
}): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: q ? `Search Results for "${q}"` : "Search",
    };
}

function SearchFormSkeleton() {
    return (
        <div className="h-12 mb-8">
            <Skeleton className="h-full w-full rounded-lg" />
        </div>
    );
}

function ProductResultsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["a", "b", "c"].map((key) => (
                <div key={key} className="border border-zinc-200 rounded-lg p-4 space-y-4">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            ))}
        </div>
    );
}

function EmptyState({ q, category }: { q?: string; category?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-zinc-500">
            <SearchX className="w-12 h-12" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">
                {q && category
                    ? `No results for "${q}" in this category`
                    : q
                    ? `No results for "${q}"`
                    : "No products in this category"}
            </p>
        </div>
    );
}

async function ProductResults({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>;
}) {
    const { q, category } = await searchParams;
    const { data: products } = await searchProducts(q ?? "", category, q || category ? 5 : undefined);

    if (!products?.length) {
        return <EmptyState q={q} category={category} />;
    }

    return (
        <ProductListing
            products={products}
            title={q ? `Results for "${q}"` : "All Products"}
        />
    );
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>;
}) {
    const { data: categories } = await getCategories();

    return (
        <section className="bg-zinc-50 py-32">
            <Container>
                <h1 className="text-4xl font-bold mb-8">Product Search</h1>
                <Suspense fallback={<SearchFormSkeleton />}>
                    <SearchForm categories={categories || []} />
                </Suspense>
                <Suspense fallback={<ProductResultsSkeleton />}>
                    <ProductResults searchParams={searchParams} />
                </Suspense>
            </Container>
        </section>
    );
}
