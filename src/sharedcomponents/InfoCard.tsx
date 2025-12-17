import { Check } from "lucide-react";
import { LensImage } from "../sharedcomponents/Lens";
import { CompareEffect } from "./CompareEffect";
import Image from "next/image";
import { Marquee3D } from "./ThreeDMarquee";
import { useIsMobile } from "@/hooks/use-mobile";

type ImageEffect =
  | { type: "none" }
  | { type: "lens" }
  | { type: "marquee"}
  | { type: "compare"; secondImage: string };


interface InfoCardProps {
  bgColor?: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  footer?: string;
  image: string;
  imageOnRight?: boolean; // true = image right, false = image left
  imageEffect?: ImageEffect;
}

export default function InfoCard({
  bgColor = "#0F1620",
  title,
  subtitle,
  description,
  bullets,
  footer,
  image,
  imageOnRight = true,
  imageEffect,
}: InfoCardProps) {

  const isMobile = useIsMobile();

  return (
    <section
      className="w-full text-white py-10 px-6"
      style={{ backgroundColor: bgColor }}
      aria-labelledby={`card-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isMobile ? "bor-shadow p-8 rounded-3xl active" : ""}`}>
        {/* If imageOnRight === true, render text first then image.
            If false, render image first then text. */}
        {imageOnRight ? (
          <>
            {/* TEXT */}
            <div>
              <h2
                id={`card-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
                className="text-3xl md:text-4xl font-semibold mb-4"
              >
                {title}
              </h2>

              {subtitle && <div className="h-0.5 w-16 bg-white mb-6" />}

              {subtitle && (
                <p className="text-gray-300 mb-6 leading-relaxed">{subtitle}</p>
              )}

              {description && (
                <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
              )}

              <ul className="space-y-4 text-gray-200">
                {bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {footer && (
                <p className="text-gray-300 leading-relaxed mt-6">{footer}</p>
              )}
            </div>

            {/* IMAGE */}
            <div>
              <AnimatedImage
                src={image}
                alt={`${title} image`}
                width={1400}
                height={800}
                className="rounded-2xl object-cover w-full"
                effect={imageEffect}
              />
            </div>
          </>
        )  : (
          <>
            {/* IMAGE (left) */}
            <div>
              <AnimatedImage
                src={image}
                alt={`${title} image`}
                width={1400}
                height={800}
                className="rounded-2xl object-cover w-full"
                effect={imageEffect}
              />
            </div>

            {/* TEXT (right) */}
            <div>
              <h2
                id={`card-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
                className="text-3xl md:text-4xl font-semibold mb-4"
              >
                {title}
              </h2>

              {subtitle && <div className="h-0.5 w-16 bg-white mb-6" />}

              {subtitle && (
                <p className="text-gray-300 mb-6 leading-relaxed">{subtitle}</p>
              )}

              {description && (
                <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
              )}

              <ul className="space-y-4 text-gray-200">
                {bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {footer && (
                <p className="text-gray-300 leading-relaxed mt-6">{footer}</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function AnimatedImage({
  src,
  alt,
  width,
  height,
  className,
  effect = { type: "none" },
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  effect?: ImageEffect;
}) {
  switch (effect.type) {
    case "compare":
      return (
        <CompareEffect
          firstImage={src}
          secondImage={effect.secondImage}
          width={width}
          height={height}
        />
      );

    case "marquee":
      return (
        <Marquee3D width={width} height={height} />
      );

    case "lens":
      return (
        <LensImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      );

    default:
      return (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      );
  }
}


