import SearchForm from "@/components/search/form";
import type { Category } from "@/types/categories";

export default async function SearchFormWrapper({
    promisedCategories,
    promisedSearchParams,
}: {
    promisedCategories: Promise<{ data: Category[] | null }>;
    promisedSearchParams: Promise<{ q?: string; category?: string }>;
}) {
    const [{ data: categories }, { q, category }] = await Promise.all([
        promisedCategories,
        promisedSearchParams,
    ]);
    return (
        <SearchForm
            categories={categories ?? []}
            initialQ={q ?? ""}
            initialCategorySlug={category ?? null}
        />
    );
}
