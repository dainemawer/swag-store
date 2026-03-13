"use cache";

import { cacheLife, cacheTag } from "next/cache";
import type { Product } from "@/types/products";
import { headers } from "./constants";

export async function searchProducts(
  q: string,
  category?: string,
  limit?: number,
) {
  cacheLife("search");
  cacheTag("search");

  const query = [
    q && `search=${q}`,
    category && `category=${category}`,
    limit && `limit=${limit}`,
  ]
    .filter(Boolean)
    .join("&");

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/products/?${query}`,
    { headers: { ...headers } },
  );

  if (res.status === 404) return { data: [] };
  if (!res.ok) throw new Error("Failed to search products");

  return res.json() as Promise<{ data: Product[] }>;
}
