import Section, { SectionHeading } from "@/components/Section";
import ServicesHero from "@/components/ServicesHero";
import ServicesTicker from "@/components/ServicesTicker";
import ServiceCard from "@/components/ServiceCard";
import ServicesExplorer from "@/components/ServicesExplorer";
import DotMatrixRibbon from "@/components/3d/DotMatrixRibbon";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { services } from "@/lib/site";
import { pageMeta, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Digital Marketing Services UK | Sharper Labs Marketing",
  description:
    "Explore Sharper Labs Marketing's six core disciplines: Brand Marketing, Website Design & Development, Social Media Marketing, PPC, Data Analysis, and Organic SEO.",
  path: "/services",
  keywords: [
    "digital marketing services UK",
    "brand marketing",
    "website design and development",
    "social media marketing",
    "PPC agency UK",
    "organic SEO services",
    "marketing data analysis",
  ],
});

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Services", path: "/services" }]),
          webPageJsonLd({
            name: "Digital Marketing Services | Sharper Labs Marketing",
            description:
              "Strategy and execution under one roof: Brand Marketing, Web Design, Social Media, PPC, Data Analysis, and SEO.",
            path: "/services",
          }),
        ]}
      />

      {/* 01. Modern Cinematic Services Hero (Shares exact landing page vibe) */}
      <ServicesHero />

      {/* 02. Continuous Animated Services Ticker Strip */}
      <ServicesTicker />

      {/* 03. Interactive Explorer View */}
      <Section tone="white" id="explorer">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-6 sm:p-8 backdrop-blur-md shadow-sm text-center">
          <SectionHeading
            kicker="Coordinated Discipline"
            title="Strategy and Execution Under One Roof"
            description="Our six core services cover brand marketing, website design and development, social media, PPC, data analysis, and organic SEO. This allows us to coordinate different marketing activities around shared business goals across UK and international markets."
          />
        </div>

        <div className="mt-10 sm:mt-12">
          <ServicesExplorer />
        </div>
      </Section>

      {/* 04. Signature Creative LED Typography Ribbon */}
      <DotMatrixRibbon
        text="BRAND MARKETING · WEBSITE DEVELOPMENT · SOCIAL MEDIA · PPC PERFORMANCE · DATA ANALYSIS · ORGANIC SEO · UK & INTERNATIONAL · "
        speed={0.9}
      />

      {/* 05. Complete Directory Grid of All 6 Disciplines */}
      <Section tone="navy" id="directory">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-md shadow-sm text-center">
          <SectionHeading
            light
            kicker="Complete Directory"
            title="Explore Individual Disciplines"
            description="Deep-dive into each service to review what customers receive, our 4-phase delivery framework, and the concrete outcomes you can expect."
          />
        </div>

        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </Section>

      {/* 06. High-Impact Conversion Band */}
      <CTASection
        title={
          <>
            Ready to coordinate your <span className="text-orange-400">marketing activities?</span>
          </>
        }
        description="Book a free consultation to discuss your commercial goals and explore the right approach for your business."
      />
    </SmoothScroll>
  );
}
