import SearchForm from "@/components/search/form";
import type { Category } from "@/types/categories";

export default async function SearchFormWrapper({
    promisedCategories,
    initialQ = "",
    initialCategorySlug = null,
}: {
    promisedCategories: Promise<{ data: Category[] | null }>;
    initialQ?: string;
    initialCategorySlug?: string | null;
}) {
    const { data: categories } = await promisedCategories;
    return (
        <SearchForm
            categories={categories ?? []}
            initialQ={initialQ}
            initialCategorySlug={initialCategorySlug}
        />
    );
}
