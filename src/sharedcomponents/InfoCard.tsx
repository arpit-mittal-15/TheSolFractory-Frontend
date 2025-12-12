import { Check } from "lucide-react";
import { LensImage } from "../sharedcomponents/Lens";

interface InfoCardProps {
  bgColor?: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  footer?: string;
  image: string;
  imageOnRight?: boolean; // true = image right, false = image left
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
}: InfoCardProps) {
  return (
    <section
      className="w-full text-white py-10 px-6"
      style={{ backgroundColor: bgColor }}
      aria-labelledby={`card-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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

              {subtitle && <div className="h-[2px] w-16 bg-white mb-6" />}

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
              <LensImage
                src={image}
                alt={`${title} image`}
                height={800}
                width={1400}
                className="rounded-2xl object-cover w-full"
              />
            </div>
          </>
        ) : (
          <>
            {/* IMAGE (left) */}
            <div>
              <LensImage
                src={image}
                alt={`${title} image`}
                height={800}
                width={1400}
                className="rounded-2xl object-cover w-full"
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

              {subtitle && <div className="h-[2px] w-16 bg-white mb-6" />}

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
