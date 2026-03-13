"use client";

import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import Form from "next/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import type { Category } from "@/types/categories";

export default function SearchForm({ categories }: { categories: Category[] }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
    const [category, setCategory] = useState<Category | null>(
        () => categories.find((c) => c.slug === searchParams.get("category")) ?? null
    );
    const searchParamsRef = useRef(searchParams);

    useEffect(() => {
        searchParamsRef.current = searchParams;
    }, [searchParams]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const shouldSearch = search.length >= 3;
            const shouldClear = search.length === 0;

            if (!shouldSearch && !shouldClear) return;

            const params = new URLSearchParams(searchParamsRef.current.toString());

            if (shouldSearch) {
                params.set("q", search);
            } else {
                params.delete("q");
            }

            startTransition(() => router.replace(`/search?${params.toString()}`));
        }, 500);
        return () => clearTimeout(timeout);
    }, [search, router]);

    const handleCategoryChange = (category: Category) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParamsRef.current.toString());
            params.set("category", category.slug);
            if (search) params.set("q", search);
            setCategory(category);
            router.replace(`/search?${params.toString()}`);
        });
    };

    const handleClearCategory = () => {
        startTransition(() => {
            const params = new URLSearchParams(searchParamsRef.current.toString());
            params.delete("category");
            setCategory(null);
            router.replace(`/search?${params.toString()}`);
        });
    };

    return (
        <Form action="/search">
            {category && (
                <input type="hidden" name="category" value={category.slug} />
            )}
            <InputGroup className="h-12 bg-white mb-8">
                <InputGroupInput
                    className="bg-white"
                    name="q"
                    placeholder="Enter search query"
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon align="inline-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                                {category ? category.name : "All"} <ChevronDownIcon className="size-3" />
                            </InputGroupButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="[--radius:0.95rem]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={handleClearCategory}>All</DropdownMenuItem>
                                {categories.map((category) => (
                                    <DropdownMenuItem onClick={() => handleCategoryChange(category)} key={category.slug}>{category.name}</DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        type="submit"
                        className="h-10 w-22 rounded-lg"
                        variant="default"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2Icon className="size-4 animate-spin" />
                        ) : (
                            "Search"
                        )}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </Form>
    );
}
