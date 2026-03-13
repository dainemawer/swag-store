"use cache";

import { cacheLife, cacheTag } from "next/cache";
import type { Product } from "@/types/products";
import { headers } from "./constants";

/**
 * Get a product by slug
 *
 * @param slug - The slug of the product
 * @returns A promise that resolves to the product
 */
export async function getProduct(slug: string) {
  cacheLife("products");
  cacheTag("products", `product-${slug.toLowerCase()}`);

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/products/${slug}`,
    {
      headers: {
        ...headers,
      },
    },
  );

  if (res.status === 404) return { data: null };
  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json() as Promise<{ data: Product | null }>;
}

/**
 * Get products
 *
 * @param featured - Whether to fetch featured products
 * @param limit - The maximum number of products to fetch
 * @returns A promise that resolves to the products
 */
export async function getProducts(featured?: boolean, limit?: number) {
  cacheLife("products");
  cacheTag("products");

  const params = new URLSearchParams();
  if (featured) params.set("featured", "true");
  if (limit) params.set("limit", limit.toString());

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/products/?${params.toString()}`,
    {
      headers: {
        ...headers,
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json() as Promise<{ data: Product[] }>;
}
