import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValuesSection from "@/components/ValuesSection";
import StandardsSection from "@/components/StandardsSection";
import EcosystemSection from "@/components/EcosystemSection";
import EcosystemCube from "@/components/EcosystemCube";
import FormulaSection from "@/components/FormulaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen mesh-bg">
      <Header />
      <HeroSection />
      <ValuesSection />
      <EcosystemCube />
      <EcosystemSection />
      <StandardsSection />
      <FormulaSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

