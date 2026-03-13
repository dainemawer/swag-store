"use cache";

import { cacheLife, cacheTag } from "next/cache";
import type { Promotion } from "@/types/promotions";
import { headers } from "./constants";

export async function getPromotions() {
  cacheLife("promotions");
  cacheTag("promotions");

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/promotions`,
    {
      headers: {
        ...headers,
      },
    },
  );

  if (res.status === 404) return { data: null };
  if (!res.ok) throw new Error("Failed to fetch promotions");

  return res.json() as Promise<{ data: Promotion | null }>;
}
