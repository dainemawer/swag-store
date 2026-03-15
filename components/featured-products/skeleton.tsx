import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProductsSkeleton() {
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
