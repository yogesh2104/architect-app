import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/landing/FadeIn";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
}

export function HeroSection({
  title,
  description,
  ctaLabel,
  ctaHref,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative min-h-[540px] overflow-hidden rounded-2xl shadow-sm md:min-h-[640px]">
          <Image
            src={backgroundImage}
            alt="AESTHETICA hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

          <div className="relative z-10 flex min-h-[540px] items-end p-8 md:min-h-[640px] md:p-14">
            <FadeIn className="max-w-2xl space-y-6">
              <p className="text-xs uppercase tracking-wide text-white/80">Architecture & Interior Studio</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h1>
              <p className="text-lg text-white/85">{description}</p>
              <Link
                href={ctaHref}
                className={cn(buttonVariants({ size: "lg" }), "rounded-2xl bg-white text-black hover:bg-white/90")}
              >
                {ctaLabel}
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
