import { Check } from "lucide-react";
import { LensImage } from "../sharedcomponents/Lens";
import { CompareEffect } from "./CompareEffect";
import Image from "next/image";
import { Marquee3D } from "./ThreeDMarquee";
import { useIsMobile } from "@/hooks/use-mobile";

type ImageEffect =
  | { type: "none" }
  | { type: "lens" }
  | { type: "marquee" }
  | { type: "compare"; secondImage: string };

interface InfoCardProps {
  bgColor?: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  footer?: string;
  image: string;
  imageOnRight?: boolean;
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
  imageEffect = { type: "none" },
}: InfoCardProps) {
  const isMobile = useIsMobile();

  return (
    <section
      className="w-full text-white py-10 px-6"
      style={{ backgroundColor: bgColor }}
      aria-labelledby={`card-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div
        className={`
          max-w-7xl mx-auto
          grid grid-cols-1 md:grid-cols-2
          gap-8
          items-stretch
          bor-shadow p-8 rounded-3xl
          ${isMobile ? "active" : ""}
        `}
      >
        {imageOnRight ? (
          <>
            {/* TEXT */}
            <TextBlock
              title={title}
              subtitle={subtitle}
              description={description}
              bullets={bullets}
              footer={footer}
            />

            {/* IMAGE */}
            <ImageBlock
              image={image}
              title={title}
              effect={imageEffect}
            />
          </>
        ) : (
          <>
            {/* IMAGE */}
            <ImageBlock
              image={image}
              title={title}
              effect={imageEffect}
            />

            {/* TEXT */}
            <TextBlock
              title={title}
              subtitle={subtitle}
              description={description}
              bullets={bullets}
              footer={footer}
            />
          </>
        )}
      </div>
    </section>
  );
}

/* ---------------- TEXT BLOCK ---------------- */

function TextBlock({
  title,
  subtitle,
  description,
  bullets,
  footer,
}: {
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  footer?: string;
}) {
  return (
    <div className="flex flex-col justify-center h-full gap-0">
      <h2
        id={`card-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className="text-3xl md:text-[25px] font-semibold mb-2"
      >
        {title}
      </h2>

      <div className="h-0.5 w-16 bg-white mb-4" />

      {subtitle && (
        <p className="text-gray-300 mb-4 leading-relaxed">
          {subtitle}
        </p>
      )}

      {description && (
        <p className="text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>
      )}

      <ul className="space-y-[6px] text-gray-200">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-3 text-[15px]">
            <Check className="h-5 w-5 mt-0.5 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {footer && (
        <p className="text-gray-300 leading-relaxed mt-4 text-[16px]">
          {footer}
        </p>
      )}
    </div>
  );
}

/* ---------------- IMAGE BLOCK ---------------- */

function ImageBlock({
  image,
  title,
  effect,
}: {
  image: string;
  title: string;
  effect: ImageEffect;
}) {
  return (
    <div className="h-full w-full">
      <AnimatedImage
        src={image}
        alt={`${title} image`}
        width={1400}
        height={800}
        className="rounded-2xl object-cover w-full h-full"
        effect={effect}
      />
    </div>
  );
}

/* ---------------- IMAGE EFFECT HANDLER ---------------- */

function AnimatedImage({
  src,
  alt,
  width,
  height,
  className,
  effect,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  effect: ImageEffect;
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
      return <Marquee3D />;

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
