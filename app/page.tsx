import { Suspense } from "react";
import { FeaturedProducts } from "@/components/featured-products";
import { FeaturedProductsSkeleton } from "@/components/featured-products/skeleton";
import Hero from "@/components/hero";
import { getProducts } from "@/lib/products";

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
