import { Suspense } from "react";
import { FeaturedProducts } from "@/components/featured-products";
import { FeaturedProductsSkeleton } from "@/components/featured-products/skeleton";
import Hero from "@/components/hero";
import { getProducts } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Swag Store",
  description: "Shop the latest branded merchandise, apparel, and accessories at Swag Store.",
};

export default async function Home() {
  const promisedProducts = getProducts(true, 6);
  return (
    <>
      <Hero />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts promisedProducts={promisedProducts} />
      </Suspense>
    </>
  );
}
