import Hero from "./components/Hero";
import PriceMovement from "./components/PriceMovement";
import ProductSection from "./components/ProductSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Hero />
      <PriceMovement/>
      <ProductSection />
    </main>
  );
}