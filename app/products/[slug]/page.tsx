import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Container from "@/components/container";
import ProductDetails, {
    ProductDetailsSkeleton,
} from "@/components/product/details";
import { getProduct, getProducts } from "@/lib/products";
import { getProductStock } from "@/lib/stock";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { data: product } = await getProduct(slug);

    if (!product) return {};

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: `${product.name} - Vercel Swag Store`,
            description: product.description,
            images: [product.images[0]],
        },
        twitter: {
            title: `${product.name} - Vercel Swag Store`,
            description: product.description,
            images: [product.images[0]],
        },
    };
}

export async function generateStaticParams() {
    const { data: products } = await getProducts(true, 6);
    return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { data: product } = await getProduct(slug);

    if (!product) notFound();

    const promisedStock = getProductStock(slug);

    return (
        <Container>
            <Suspense fallback={<ProductDetailsSkeleton />}>
                <ProductDetails product={product} promisedStock={promisedStock} />
            </Suspense>
        </Container>
    );
}
