import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import AgentCarousel from "@/components/AgentCarousel";
import HowItWorks from "@/components/HowItWorks";
import FeatureGrid from "@/components/FeatureGrid";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <AgentCarousel />
      <HowItWorks />
      <FeatureGrid />
      <Stats />
      <Testimonials />
      <Integrations />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
