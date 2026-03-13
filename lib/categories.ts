"use cache";

import { cacheLife, cacheTag } from "next/cache";
import type { Category } from "@/types/categories";
import { headers } from "./constants";

export async function getCategories() {
  cacheLife("categories");
  cacheTag("categories");

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/categories`,
    {
      headers: {
        ...headers,
      },
    },
  );

  if (res.status === 404) return { data: null };
  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json() as Promise<{ data: Category[] | null }>;
}
