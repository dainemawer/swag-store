import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/container";

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
            <h2 className="text-lg font-bold">Search Results</h2>
            <p>Results for: {q}</p>
        </>
    );
}

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    return (
        <Container>
            <h1 className="text-2xl font-bold">Search</h1>
            <Suspense fallback={null}>
                <SearchResults searchParams={searchParams} />
            </Suspense>
        </Container>
    );
}
