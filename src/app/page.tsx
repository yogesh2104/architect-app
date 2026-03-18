import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

import { ClientLogos } from "@/components/landing/ClientLogos";
import { ContactSection } from "@/components/landing/ContactSection";
import { FeaturedCarousel } from "@/components/landing/FeaturedCarousel";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProductGrid } from "@/components/landing/ProductGrid";
import type { LandingProduct } from "@/components/landing/types";

export const revalidate = 300;

interface DbProduct {
  _id: string | { toString(): string };
  title: string;
  description: string;
  imageUrl: string;
  category: "product" | "premium" | "corporate";
  subCategory?: string;
}

function mapProduct(product: DbProduct): LandingProduct {
  return {
    id: typeof product._id === "string" ? product._id : product._id.toString(),
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    category: product.category,
    subCategory: product.subCategory,
  };
}

async function getLandingData() {
  await connectToDatabase();

  const [featuredDocs, latestDocs] = await Promise.all([
    Product.find({ isBestProduct: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title description imageUrl category subCategory")
      .lean<DbProduct[]>(),
    Product.find({})
      .sort({ createdAt: -1 })
      .limit(9)
      .select("title description imageUrl category subCategory")
      .lean<DbProduct[]>(),
  ]);

  const featured = featuredDocs.map(mapProduct);
  const products = latestDocs.map(mapProduct);

  return {
    featured: featured.length > 0 ? featured : products.slice(0, 5),
    products,
  };
}

export default async function HomePage() {
  const { featured, products } = await getLandingData();

  const heroImage =
    featured[0]?.imageUrl || products[0]?.imageUrl || "/uploads/1772704211002-sofa1.jpg";

  return (
    <main className="bg-background">
      <HeroSection
        title="Refined Architecture For Contemporary Living"
        description="We shape spatial experiences through calm minimalism, material intelligence, and execution discipline for homes, premium residences, and corporate environments."
        ctaLabel="View Collection"
        ctaHref="/portfolio"
        backgroundImage={heroImage}
      />

      <FeaturedCarousel products={featured} />
      <ProductGrid products={products} />
      <ClientLogos />
      <ContactSection />
    </main>
  );
}
