import { cacheLife, cacheTag } from "next/cache";
import type { Product } from "@/types/products";
import { headers } from "./constants";

// The API only supports filtering by category. The `q` param is silently
// ignored, so text search is implemented client-side after fetching.
async function fetchByCategory(category?: string): Promise<Product[]> {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/products/${query}`,
    { headers },
  );

  if (res.status === 404) return [];
  if (!res.ok) throw new Error("Failed to fetch products");

  const { data } = (await res.json()) as { data: Product[] };
  return data ?? [];
}

export async function searchProducts(
  q?: string,
  category?: string,
  limit?: number,
) {
  "use cache";
  cacheLife("search");
  cacheTag("search");

  const qTrimmed = q?.trim().toLowerCase();

  if (qTrimmed) {
    cacheTag(`search:q:${qTrimmed}`);
  }
  if (category) {
    cacheTag(`search:cat:${category.toLowerCase()}`);
  }

  // Fetch products filtered by category (the only server-side filter the API supports).
  let products = await fetchByCategory(category);

  // Apply text search client-side against name and description.
  if (qTrimmed) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(qTrimmed) ||
        (p.description ?? "").toLowerCase().includes(qTrimmed),
    );
  }

  if (limit) {
    products = products.slice(0, limit);
  }

  return { data: products };
}
