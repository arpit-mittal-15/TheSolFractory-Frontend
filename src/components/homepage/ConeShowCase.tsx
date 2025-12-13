'use client'
import InfoCard from "@/src/sharedcomponents/InfoCard";
import { useIsMobile } from "@/hooks/use-mobile";
import FullPageLoader from "@/src/components/FullPageLoader";

export default function MergedCards() {

  const isMobile = useIsMobile();
  
  if(isMobile === null) return <FullPageLoader />;

  return (
    <div>

      {/* 1 — Size Chart (your first one) */}
      <InfoCard
        bgColor="#0F1620"
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
        bgColor="#040E1C"
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
        bgColor="#0F1620"
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
            bgColor="#040E1C"
            title="Premium Rolling Papers"
            subtitle="Select from our range of premium rolling paper materials:"
            description=""
            bullets={[
              "Ultra-thin refined white paper",
              "Slow-burning natural paper",
              "Eco-certified sustainable blends",
            ]}
            footer="Every paper is precision tested for airflow, burn rate, and structural consistency."
            image="/homepage/sizechart.png"
            imageOnRight={true}
          />}

    </div>
  );
}
