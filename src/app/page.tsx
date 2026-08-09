import { About } from "@/components/About";
import { Catalog } from "@/components/Catalog";
import { Contact } from "@/components/Contact";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { PreviewLessons } from "@/components/PreviewLessons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Stats } from "@/components/Stats";
import { SuccessBoard } from "@/components/SuccessBoard";
import {
  fetchPreviewLessons,
  fetchPublicCatalog,
  fetchPublicPlans,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [plansResult, lessonsResult, catalogResult] = await Promise.all([
    fetchPublicPlans(),
    fetchPreviewLessons(),
    fetchPublicCatalog(),
  ]);

  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Stats />
        <Features />
        <PreviewLessons
          lessons={lessonsResult.data}
          loadError={lessonsResult.error}
        />
        <Catalog
          units={catalogResult.data}
          loadError={catalogResult.error}
        />
        <Plans plans={plansResult.data} loadError={plansResult.error} />
        <About />
        <SuccessBoard />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
