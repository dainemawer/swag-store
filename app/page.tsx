import Container from "@/components/container";
import Hero from "@/components/hero";
import ProductListing from "@/components/product-listing";

const products = [
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `product-${index + 1}`,
    name: `Product ${index + 1}`,
    price: 100 * (index + 1),
    image: `/images/product-${index + 1}.jpg`,
    description: `Product ${index + 1} description`,
  })),
];

export default function Home() {
  return (
    <>
      <Hero />
      <ProductListing products={products} title="Featured Products" />
    </>
  );
}
