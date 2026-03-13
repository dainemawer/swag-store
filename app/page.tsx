import { Suspense } from "react";
import Hero from "@/components/hero";
import ProductListing from "@/components/product-listing";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const { data: products } = await getProducts(true, 6);
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <ProductListing products={products} title="Featured Products" />
      </Suspense>
    </>
  );
}
