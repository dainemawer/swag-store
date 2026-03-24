"use cache";

import { cacheLife, cacheTag } from "next/cache";
import type { Product } from "@/types/products";
import { headers } from "./constants";

async function fetchProductList(
  q?: string,
  category?: string,
  limit?: number,
): Promise<Product[]> {
  const query = [
    q && `q=${encodeURIComponent(q)}`,
    category && `category=${encodeURIComponent(category)}`,
    limit && `limit=${limit}`,
  ]
    .filter(Boolean)
    .join("&");

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/products/?${query}`,
    { headers },
  );

  if (res.status === 404) return [];
  if (!res.ok) throw new Error("Failed to search products");

  const { data } = (await res.json()) as { data: Product[] };
  return data ?? [];
}

export async function searchProducts(
  q?: string,
  category?: string,
  limit?: number,
) {
  cacheLife("search");
  cacheTag("search");

  const qTrimmed = q?.trim();
  const hasQ = Boolean(qTrimmed);
  const hasCategory = Boolean(category);

  if (qTrimmed) {
    cacheTag("search", `search:q:${qTrimmed.toLowerCase()}`);
  }
  if (category) {
    cacheTag("search", `search:cat:${category.toLowerCase()}`);
  }
  if (qTrimmed && category) {
    cacheTag(
      "search",
      `search:q:${qTrimmed.toLowerCase()}:cat:${category.toLowerCase()}`,
    );
  }

  // API appears to treat combined q+category as category-only. AND semantics: intersect
  // text matches with category listing.
  if (hasQ && hasCategory) {
    const [byQuery, byCategory] = await Promise.all([
      fetchProductList(qTrimmed, undefined, undefined),
      fetchProductList(undefined, category, undefined),
    ]);
    const categoryIds = new Set(byCategory.map((p) => p.id));
    let data = byQuery.filter((p) => categoryIds.has(p.id));
    if (limit) data = data.slice(0, limit);
    return { data };
  }

  const data = await fetchProductList(
    hasQ ? qTrimmed : undefined,
    hasCategory ? category : undefined,
    limit,
  );
  return { data };
}
