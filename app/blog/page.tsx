import { BookOpen, TrendingUp, Compass, ArrowRight, ShieldCheck, Award, Zap } from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import BlogHero from "@/components/BlogHero";
import GrowthRibbon from "@/components/3d/GrowthRibbon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/providers/SmoothScroll";
import BlogExplorer from "@/components/BlogExplorer";
import { getAllBlogPosts, getAllBlogCategories } from "@/lib/blog";
import { pageMeta, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { targetKeywords } from "@/lib/site";

export const metadata = pageMeta({
  title: "Digital Marketing Insights & Strategy Guides | Sharper Labs Marketing",
  description:
    "Actionable digital marketing strategies, UK SME growth frameworks, SEO best practices, conversion optimisation, and international expansion advice from Sharper Labs Marketing.",
  path: "/blog",
  keywords: [
    ...targetKeywords.longTail,
    "digital marketing blog UK",
    "marketing strategy guides",
    "B2B growth articles",
    "marketing ROI measurement",
  ],
});

export const dynamic = "force-dynamic";

export default async function BlogListingPage() {
  const posts = await getAllBlogPosts();
  const categories = await getAllBlogCategories();

  return (
    <SmoothScroll>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Blog & Insights", path: "/blog" }]),
          webPageJsonLd({
            name: "Digital Marketing Insights & Strategy Guides | Sharper Labs Marketing",
            description:
              "Explore strategic guides on brand marketing, website conversion, SEO, social follower growth, and data analysis designed for UK and international businesses.",
            path: "/blog",
          }),
        ]}
      />

      {/* 01. Modern Cinematic Blog Hero */}
      <BlogHero />

      {/* 02. Aggregate Knowledge Proof Bar — Frosted Glass Metric Cards */}
      <div className="relative z-20 -mt-7 sm:-mt-9 mb-4 sm:mb-8">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 text-center">
            <div className="rounded-2xl border border-white/60 bg-white/80 p-3.5 sm:p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-md">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 tracking-tight">
                100% Free
              </span>
              <p className="mt-0.5 text-[10px] sm:text-xs font-semibold text-ink-muted">
                Actionable Strategy Guides
              </p>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-3.5 sm:p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/[0.1] hover:shadow-md">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500 tracking-tight">
                Evidence-Based
              </span>
              <p className="mt-0.5 text-[10px] sm:text-xs font-semibold text-orange-800/90">
                UK & International Data
              </p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/80 p-3.5 sm:p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-md">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 tracking-tight">
                6 Disciplines
              </span>
              <p className="mt-0.5 text-[10px] sm:text-xs font-semibold text-ink-muted">
                SEO, Social Followers, Web, Brand & Data
              </p>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-3.5 sm:p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/[0.1] hover:shadow-md">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500 tracking-tight">
                2026 Ready
              </span>
              <p className="mt-0.5 text-[10px] sm:text-xs font-semibold text-orange-800/90">
                Latest Growth Frameworks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 03. Main Blog Explorer Section with Clean Frosted Surface */}
      <section id="explorer" className="py-10 sm:py-14 bg-surface-muted/40 relative overflow-hidden">
        {/* Subtle background ambient blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-2/3 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"
        />

        <div className="container-page relative z-10">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 px-5 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md shadow-xs text-center mb-8 sm:mb-10">
              <SectionHeading
                kicker="Practical Knowledge Base"
                title="Evidence-Based Thinking for Ambitious Businesses"
                description="Clear perspectives on brand positioning, search visibility, high-converting web architecture, and performance measurement. Built to help businesses make smarter marketing decisions."
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <BlogExplorer posts={posts} categories={categories} />
          </Reveal>
        </div>
      </section>

      {/* 04. 3D Kinetic Growth Trajectory Ribbon (Subtle aesthetic divider) */}
      <GrowthRibbon />

      {/* 05. High-Impact Conversion Banner */}
      <CTASection
        title="Ready to turn insights into measurable business growth?"
        description="Book a free consultation with our senior UK consultants to discuss your goals, review your current channels, and explore the right approach for your business."
      />
    </SmoothScroll>
  );
}
