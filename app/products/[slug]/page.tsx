import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/container";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const title = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return {
        title,
        description: `Shop ${title} at Swag Store.`,
        openGraph: {
            title,
            description: `Shop ${title} at Swag Store.`,
        },
    };
}

async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <>
            <h1 className="text-2xl font-bold">Product Detail</h1>
            <p>Product ID: {slug}</p>
        </>
    );
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    return (
        <Container>
            <Suspense fallback={null}>
                <ProductDetail params={params} />
            </Suspense>
        </Container>
    );
}
