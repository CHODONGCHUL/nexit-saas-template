import HeroSection from "@/components/landing-page/hero-section";
import FeaturesSection from "@/components/landing-page/features-section";
import ProcessSection from "@/components/landing-page/process-section";
import TabbedPricingSection from "@/components/landing-page/tabbed-pricing-section"; // ✅ 수정
import { createClient } from "@/lib/supabase/server";

const HomePage = async () => {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  return (
    <div className="pt-32 scrollbar-hide size-full overflow-x-hidden">
      <HeroSection user={user} />
      <FeaturesSection />
      <ProcessSection />
      <TabbedPricingSection /> {/* ✅ PricingSection → TabbedPricingSection */}
    </div>
  );
};

export default HomePage;
