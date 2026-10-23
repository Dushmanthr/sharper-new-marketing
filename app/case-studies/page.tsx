import Section, { SectionHeading } from "@/components/Section";
import CaseStudiesHero from "@/components/CaseStudiesHero";
import CaseStudiesShowcase from "@/components/CaseStudiesShowcase";
import GrowthRibbon from "@/components/3d/GrowthRibbon";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { caseStudies } from "@/lib/site";
import { pageMeta, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Case Studies & Client Results",
  description:
    "Explore genuine digital marketing case studies from Sharper Labs Marketing. See verified before-and-after results across UK and international B2B, E-commerce, and healthcare sectors.",
  path: "/case-studies",
  keywords: [
    "digital marketing case studies",
    "B2B marketing results UK",
    "SEO case studies",
    "social media follower growth case studies",
    "Sharper Labs Marketing results",
  ],
});

export default function CaseStudiesPage() {
  return (
    <SmoothScroll>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Case Studies", path: "/case-studies" }]),
          webPageJsonLd({
            name: "Case Studies & Measurable Results | Sharper Labs Marketing",
            description:
              "Verified customer problems, strategic solutions, and measurable outcomes from Sharper Labs Marketing.",
            path: "/case-studies",
          }),
        ]}
      />

      {/* 01. Modern Cinematic Case Studies Hero */}
      <CaseStudiesHero />

      {/* 02. Aggregate Proof Bar — Frosted Glass Cards (Clean, User-Friendly, Balanced Light Tone) */}
      <div className="relative z-20 -mt-8 sm:-mt-10 mb-6 sm:mb-10">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 text-center">
            <div className="rounded-2xl border border-white/60 bg-white/80 p-4 sm:p-5 shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-200 hover:bg-white/95 hover:shadow-lg">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 tracking-tight">
                +214%
              </span>
              <p className="mt-1 text-[11px] sm:text-xs font-semibold text-ink-muted">
                Peak Inbound Lead Growth
              </p>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-4 sm:p-5 shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/[0.1] hover:shadow-lg">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 tracking-tight">
                3.8x
              </span>
              <p className="mt-1 text-[11px] sm:text-xs font-semibold text-orange-800/90">
                Verified Return on Ad Spend
              </p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/80 p-4 sm:p-5 shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-200 hover:bg-white/95 hover:shadow-lg">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 tracking-tight">
                48+
              </span>
              <p className="mt-1 text-[11px] sm:text-xs font-semibold text-ink-muted">
                Top-3 Commercial Rankings
              </p>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-4 sm:p-5 shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/[0.1] hover:shadow-lg">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 tracking-tight">
                100%
              </span>
              <p className="mt-1 text-[11px] sm:text-xs font-semibold text-orange-800/90">
                Verified Client Data Sources
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 03. Main Interactive Showcase Section (Clean Frosted Surface) */}
      <Section tone="white" id="showcase" className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-6 sm:p-8 backdrop-blur-md shadow-sm text-center">
          <SectionHeading
            kicker="Demonstrated Impact"
            title="Evidence, Not Empty Promises"
            description="Every case study below follows our standardized 5-part structure: clear client context, specific pre-project problems, the strategic actions delivered, verified before-and-after metrics, and key takeaways for growing businesses."
          />
        </div>

        <div className="mt-10 sm:mt-12">
          <CaseStudiesShowcase />
        </div>
      </Section>

      {/* 04. 3D Kinetic Growth Trajectory Wave Ribbon */}
      <GrowthRibbon />

      {/* 05. High-Impact Conversion Band */}
      <CTASection
        title={
          <>
            Ready to achieve <span className="text-orange-400">measurable results?</span>
          </>
        }
        description="Book a free consultation to explore how a similar approach can accelerate your business growth."
      />
    </SmoothScroll>
  );
}
