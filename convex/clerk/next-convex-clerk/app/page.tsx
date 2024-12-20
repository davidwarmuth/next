import { AppFeatures } from "@/components/app-features";
import { CTA } from "@/components/call-to-action";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="px-6 font-[family-name:var(--font-geist-sans)]">
      <Hero />
      <AppFeatures />
      <CTA />
    </main>
  );
}
