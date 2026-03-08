import { Header } from "@/components/header";
import { HeroSection } from "@/components/landing/hero-section";
import { ProcessSection } from "@/components/landing/process-section";
import { BuyForMeSection } from "@/components/landing/buy-for-me-section";
import { StoriesSection } from "@/components/landing/stories-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main>
        <HeroSection />
        <ProcessSection />
        <BuyForMeSection />
        <StoriesSection />
      </main>

      <FooterSection />
    </div>
  );
}
