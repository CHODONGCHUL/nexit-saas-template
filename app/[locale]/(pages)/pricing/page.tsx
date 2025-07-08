import MaxWidthWrapper from "@/components/max-width-wrapper";
import TabbedPricingSection from "@/components/landing-page/tabbed-pricing-section";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MaxWidthWrapper>
        <div className="py-20">
          <TabbedPricingSection />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
