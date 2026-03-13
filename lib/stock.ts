import { type Stock } from '@/types/stock';

export async function getProductStock(slug: string) {
    const res = await fetch(`https://vercel-swag-store-api.vercel.app/api/products/${slug}/stock`);
    if (!res.ok) throw new Error('Failed to fetch products');

    return res.json() as Promise<{ data: Stock }>
}
