"use cache";

import { cacheLife, cacheTag } from "next/cache";
import type { Stock } from "@/types/stock";
import { headers } from "./constants";

export async function getProductStock(slug: string) {
  cacheLife("stock");
  cacheTag("stock", `product-${slug.toLowerCase()}`);

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/products/${slug}/stock`,
    { headers },
  );

  if (res.status === 404) return { data: null };
  if (!res.ok) throw new Error("Failed to fetch product stock");

  return res.json() as Promise<{ data: Stock }>;
}
