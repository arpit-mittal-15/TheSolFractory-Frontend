'use client'
import InfoCard from "@/src/sharedcomponents/InfoCard";
import { useIsMobile } from "@/hooks/use-mobile";
import FullPageLoader from "@/src/components/FullPageLoader";

export default function MergedCards() {

  const isMobile = useIsMobile();
  
  if(isMobile === null) return <FullPageLoader />;

  return (
    <div>

    <h1 className="text-center text-white mt-11 px-6" style={{ textShadow: "0 0 5px rgba(255,255,255,0.6)" }}>
      <span className="block text-3xl md:text-4xl font-serif">
        Create Your Perfect Cone:
      </span>

      <span className="block mt-3 text-2xl md:text-3xl font-serif uppercase tracking-wider">
        Only At SOL
      </span>

      <span className="block mx-auto mt-4 w-16 h-[2px] bg-white"></span>
    </h1>


      {/* 1 — Size Chart (your first one) */}
      <InfoCard
        bgColor=""
        title="Size That Fits Your Product Line:"
        description="We manufacture cones in all industry-standard sizes — fully custom dimensions for brands that want something unique. Whether you’re creating:"
        bullets={["Minis", "Mid-sizes", "Oversized cones"]}
        footer="Each one is engineered for filling machine compatibility and consistent performance."
        image="/homepage/sizechart.png"
        imageOnRight={false}
        imageEffect={{
          type: "marquee"
        }}
      />

      {/* 2 — Paper Options */}
      {isMobile? null : <InfoCard
        bgColor=""
        title="Paper Options That Match Your Brand Identity"
        subtitle="Choose the paper that aligns with your product vision and target market:"
        description=""
        bullets={[
          "White paper for a clean, premium aesthetic",
          "Brown (unbleached) for natural/organic branding",
          "Organic hemp for brands focused on purity and plant-based experience",
        ]}
        footer="All papers meet food-grade standards and are tested for burn consistency, airflow, and thickness."
        image="/bluetshirt.png"
        imageOnRight={true}
        imageEffect={{
          type: "compare",
          secondImage: "/whitetshirt.png",
        }}
      />}

      {/* 3 — Your second version of Size Chart */}
      <InfoCard
        bgColor=""
        title="Custom Cone Dimensions:"
        description="We help brands create signature sizes for special product lines, collaborations, or market trends."
        bullets={["Slim cones", "Extra-wide cones", "Limited-edition custom lengths"]}
        footer="Engineered with consistency and machine-fill compatibility in mind."
        image="/homepage/sizechart.png"
        imageOnRight={false}
        imageEffect={{
          type: "lens"
        }}
      />

      {/* 4 — Another paper style section */}
    {isMobile? null : <InfoCard
            bgColor=""
            title="Packaging That Tells Tour Story"
            subtitle="Your product’s presentation matters. Choose from:"
            description=""
            bullets={[
              "Custom boxes (retail or wholesale)",
              "Branded tubes or doob tubes",
              "Custom printed cartons",
              "Eco-friendly packaging options",
            ]}
            footer="Designed to protect your cones during transit and elevate your brand at first glance"
            image="/homepage/packaging.png"
            imageOnRight={true}
          />}

    </div>
  );
}
