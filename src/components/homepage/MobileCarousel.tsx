"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

interface CardItem {
  image: string;
  label: string;
}

const cards: CardItem[] = [
  { image: "/homepage/conestack.png", label: "Natural Hemp" },
  { image: "/homepage/conestack.png", label: "Natural Hemp" },
  { image: "/homepage/conestack.png", label: "Premium Pink Pre-Rolls" },
  { image: "/homepage/conestack.png", label: "Hemp Cones" },
  { image: "/homepage/conestack.png", label: "Hemp Cones" },
];

export default function MobileCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    // Subscribe
    emblaApi.on("select", updateIndex);
    emblaApi.on("reInit", updateIndex);

    // Cleanup
    return () => {
        emblaApi.off("select", updateIndex);
        emblaApi.off("reInit", updateIndex);
    };
    }, [emblaApi]);


  return (
    <section className="w-full py-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {cards.map((card, index) => {
            const isActive = index === selectedIndex;

            return (
              <div
                key={index}
                className="flex-[0_0_85%] px-3 transition-transform duration-300"
              >
                <div
                  className={`
                    relative aspect-3/4 rounded-2xl overflow-hidden
                    bg-white/10 backdrop-blur-md
                    border border-white/10
                    shadow-lg
                    transition-all duration-300
                    ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-70"}
                  `}
                >
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className="object-cover"
                    priority={isActive}
                  />

                  {/* Gradient for text legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Label */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <p className="text-white text-sm font-semibold tracking-wide">
                      {card.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === i
                ? "w-6 bg-white"
                : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
