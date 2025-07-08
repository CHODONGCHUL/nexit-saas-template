import HeroSection from "@/components/landing-page/hero-section";
import CompaniesSection from "@/components/landing-page/companies-section";
import FeaturesSection from "@/components/landing-page/features-section";
import ProcessSection from "@/components/landing-page/process-section";
import PricingSection from "@/components/landing-page/pricing-section";
import CTASection from "@/components/landing-page/cta-section";
import { createClient } from "@/lib/supabase/server";

const HomePage = async () => {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  return (
    <div className="pt-32 scrollbar-hide size-full overflow-x-hidden">
      <HeroSection user={user} />

      {/* <CompaniesSection /> */}

      <FeaturesSection />

      <ProcessSection />

      <PricingSection />

      <CTASection />
    </div>
  );
};

export default HomePage;
