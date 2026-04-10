import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/container";
import { SearchFormSkeleton } from "@/components/search/form";
import SearchFormWrapper from "@/components/search/form-wrapper";
import ProductResults, {
    ProductResultsSkeleton,
} from "@/components/search/results";
import { getCategories } from "@/lib/categories";

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

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>;
}) {
    const promisedCategories = getCategories();

    return (
        <section className="bg-zinc-50 py-32">
            <Container>
                <h1 className="text-4xl font-bold mb-8">Product Search</h1>
                <Suspense fallback={<SearchFormSkeleton />}>
                    <SearchFormWrapper
                        promisedCategories={promisedCategories}
                        promisedSearchParams={searchParams}
                    />
                </Suspense>
                <Suspense fallback={<ProductResultsSkeleton />}>
                    <ProductResults searchParams={searchParams} />
                </Suspense>
            </Container>
        </section>
    );
}

