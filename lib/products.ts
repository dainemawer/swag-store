"use cache"

import { cacheLife, cacheTag } from 'next/cache';
import { type Product } from '@/types/products';

const headers: HeadersInit = {
    'x-vercel-protection-bypass': process.env.VERCEL_PROTECTION_BYPASS || '',
};

export async function getProduct(slug: string) {
    cacheLife('products');
    cacheTag('products', `product-${slug.toLowerCase()}`);

    const res = await fetch(`${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/products/${slug}`, {
        headers: {
            ...headers,
        },
    });

    if (res.status === 404) return { data: null };
    if (!res.ok) throw new Error('Failed to fetch product');

    return res.json() as Promise<{ data: Product | null }>
}

export async function getProducts(featured?: boolean, limit?: number) {
    cacheLife('products');
    cacheTag('products');

    const params = new URLSearchParams();
    if (featured) params.set('featured', 'true');
    if (limit) params.set('limit', limit.toString());

    const res = await fetch(`${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/products/?${params.toString()}`, {
        headers: {
            ...headers,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    return res.json() as Promise<{ data: Product[] }>
}
