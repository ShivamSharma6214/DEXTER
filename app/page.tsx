import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import DesktopScene from "@/components/landing/DesktopScene";
import BentoGrid from "@/components/landing/BentoGrid";
import Timeline from "@/components/landing/Timeline";
import BuiltInPublic from "@/components/landing/BuiltInPublic";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <DesktopScene />
      <BentoGrid />
      <Timeline />
      <BuiltInPublic />
      <FinalCTA />
      <Footer />
    </main>
  );
}
