import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValuesSection from "@/components/ValuesSection";
import StandardsSection from "@/components/StandardsSection";
import EcosystemSection from "@/components/EcosystemSection";
import EcosystemCubeWrapper from "@/components/EcosystemCubeWrapper";
import FormulaSection from "@/components/FormulaSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "kk" }, { locale: "en" }];
}

interface PageProps {
  params: { locale: string };
}

export default function LocalePage({ params }: PageProps) {
  const locale = params.locale;

  return (
    <main className="min-h-screen mesh-bg">
      <Header locale={locale} />
      <HeroSection locale={locale} />
      <ValuesSection locale={locale} />
      <EcosystemSection locale={locale} />
      <StandardsSection locale={locale} />
      <TeamSection locale={locale} />
      <FormulaSection locale={locale} />
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}

