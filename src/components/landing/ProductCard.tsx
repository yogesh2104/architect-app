import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandingProduct } from "@/components/landing/types";

interface ProductCardProps {
  product: LandingProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-0 bg-white shadow-sm transition-all duration-300 ease-out hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <CardContent className="space-y-4 p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.subCategory || product.category}
        </p>
        <h3 className="text-xl font-semibold tracking-tight">{product.title}</h3>
        <p className="line-clamp-2 text-muted-foreground">{product.description}</p>
        <Link
          href={`/products/${product.id}`}
          className={cn(buttonVariants({ variant: "outline" }), "rounded-2xl")}
        >
          View Project
        </Link>
      </CardContent>
    </Card>
  );
}
