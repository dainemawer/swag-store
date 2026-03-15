import SearchForm from "@/components/search/form";
import type { Category } from "@/types/categories";

export default async function SearchFormWrapper({
    promisedCategories,
}: {
    promisedCategories: Promise<{ data: Category[] | null }>;
}) {
    const { data: categories } = await promisedCategories;
    return <SearchForm categories={categories ?? []} />;
}
