import { ChevronDownIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/container";
import ProductListing from "@/components/product-listing";
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

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: `Search Results for ${q}`,
    };
}

async function SearchResults({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;

    return (
        <>
            <section className="bg-zinc-50 py-32">
                <Container>
                    <h1 className="text-4xl font-bold mb-8">Product Search</h1>
                    <InputGroup className="h-12 bg-white">
                        <InputGroupInput className="bg-white" placeholder="Enter search query" />
                        <InputGroupAddon align="inline-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                                        Filter by category <ChevronDownIcon className="size-3" />
                                    </InputGroupButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="[--radius:0.95rem]">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>All</DropdownMenuItem>
                                        <DropdownMenuItem>Electronics</DropdownMenuItem>
                                        <DropdownMenuItem>Clothing</DropdownMenuItem>
                                        <DropdownMenuItem>Books</DropdownMenuItem>
                                        <DropdownMenuItem>Toys</DropdownMenuItem>
                                        <DropdownMenuItem>Other</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton className="h-10 w-22 rounded-lg" variant="default">
                                Search
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </Container>
            </section>
        </>
    );
}

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    return (
        <Suspense fallback={null}>
            <SearchResults searchParams={searchParams} />
        </Suspense>
    );
}
