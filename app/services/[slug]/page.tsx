import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceBlueprintRibbon from "@/components/3d/ServiceBlueprintRibbon";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/components/FAQ";
import CaseStudyCard from "@/components/CaseStudyCard";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { services, getService, site, caseStudies } from "@/lib/site";
import { pageMeta, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return [
    ...services.map((s) => ({ slug: s.slug })),
    { slug: "pay-per-click" },
  ];
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({
    title: `${service.title} Agency UK | Sharper Labs Marketing`,
    description: `${service.excerpt} ${service.title} consultancy serving businesses across the UK and internationally.`,
    path: `/services/${service.slug}`,
    keywords: [
      service.title,
      `${service.short} UK`,
      `${service.short} consultancy`,
      "Sharper Labs Marketing",
      "UK digital marketing consultancy",
    ],
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;

  // Find relevant case studies for this service
  const relevantCaseStudies = caseStudies.filter(
    (c) => c.services.includes(service.title) || c.services.includes(service.short),
  );

  const whatWeDoCount = service.whatWeDo.length;
  const processCount = service.process?.length || 0;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <SmoothScroll>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]),
          serviceJsonLd({ name: service.title, description: service.excerpt, path }),
          faqJsonLd(service.faqs),
        ]}
      />

      {/* 01. Modern Cinematic Service Detail Hero with Interactive Consultation Trigger */}
      <ServiceDetailHero service={service} />

      {/* 02. Three.js Kinetic Blueprint Transition Stream */}
      <ServiceBlueprintRibbon />

      {/* 03. Strategic Overview & Lead Narrative */}
      <Section tone="white" compact className="relative overflow-hidden">
        {/* Subtle background ambient blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl"
        />

        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Visual Presentation with Layered Glass Effect & Floating Badge */}
          <Reveal>
            <div className="relative group">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-orange-500/20 via-cyan-500/10 to-transparent blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
              />

              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-b from-white via-surface-muted/60 to-white p-4 xs:p-6 sm:p-8 md:p-10 pb-16 sm:pb-8 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:shadow-xl group-hover:border-orange-200">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={560}
                  height={480}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  className={
                    service.contain
                      ? "h-auto w-full max-w-sm sm:max-w-md object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      : "h-auto w-full max-w-sm sm:max-w-md rounded-2xl object-cover shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                  }
                />

                {/* Floating Credential Micro-Pill */}
                <div className="absolute bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-auto sm:right-6 flex justify-center sm:justify-end">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-navy-900 shadow-md backdrop-blur-md max-w-full">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                    </span>
                    <span className="text-[10px] sm:text-xs text-navy-900 font-semibold truncate sm:whitespace-normal">
                      {service.short} · Strategic Blueprint
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Narrative Column */}
          <div>
            <span className="kicker">{service.kicker}</span>
            <h2 className="mt-2.5 sm:mt-3 font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-tight">
              {service.lead}
            </h2>

            <div className="mt-3.5 sm:mt-4 space-y-3 sm:space-y-3.5 leading-relaxed text-ink-muted text-xs xs:text-sm sm:text-base">
              {service.body.map((p, i) => (
                <Reveal key={i} index={i} as="p">
                  {p}
                </Reveal>
              ))}
            </div>

            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Button href="/contact" variant="primary" className="w-full sm:w-auto justify-center">
                Discuss Your {service.short} Goals <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={site.phoneHref} external variant="outline" className="w-full sm:w-auto justify-center">
                <Phone className="h-4 w-4" /> {site.phoneIntl}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 04. Structured Core Capabilities Matrix ("What We Do") */}
      <Section tone="muted" compact className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 px-5 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md shadow-xs text-center">
          <SectionHeading
            kicker="Capabilities"
            title={`What We Do in ${service.short}`}
            description={`Comprehensive, data-driven ${service.short} capabilities delivered by our UK and international marketing consultants.`}
          />
        </div>

        {/* Dynamic balanced grid: 4 items (4 cols), 5 items (3+2 balanced 6-col grid), 6 items (3 cols) */}
        <div
          className={`mt-6 sm:mt-8 grid gap-3.5 sm:gap-5 ${
            whatWeDoCount === 4
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : whatWeDoCount === 6
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6"
          }`}
        >
          {service.whatWeDo.map((item, idx) => {
            // For 5 items: first 3 take span 2 (row 1), last 2 take span 3 (row 2)
            const colSpanClass =
              whatWeDoCount === 5
                ? idx < 3
                  ? "lg:col-span-2"
                  : "sm:col-span-2 lg:col-span-3"
                : "";

            return (
              <Reveal key={idx} index={idx} className={`h-full ${colSpanClass}`}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-5 sm:p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-xl">
                  {/* Top specular glow line on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div>
                    <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-600 font-bold transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_16px_rgba(244,123,32,0.4)] text-sm sm:text-base">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-bold text-navy-900 transition-colors duration-200 group-hover:text-orange-600">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 05. Dedicated Delivery Framework Roadmap (5 or 4 Phases in a Unified Single Row on Desktop) */}
      {service.process && service.process.length > 0 && (
        <Section tone="white" compact className="relative">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 px-5 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md shadow-xs text-center">
            <SectionHeading
              kicker="Methodology & Roadmap"
              title={`Our ${processCount}-Phase Delivery Framework`}
              description={`How our UK and international consultants execute ${service.short} from initiation to compounding commercial progress.`}
            />
          </div>

          {/* Unified single-row layout on desktop: lg:grid-cols-5 for 5 items, lg:grid-cols-4 for 4 items */}
          <div
            className={`mt-6 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2 ${
              processCount === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
            }`}
          >
            {service.process.map((step, i) => {
              const isLastOfFive = processCount === 5 && i === 4;
              return (
                <Reveal
                  key={i}
                  index={i}
                  className={`h-full ${isLastOfFive ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-navy-100/80 bg-gradient-to-b from-white via-surface-muted/40 to-white p-4.5 sm:p-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-orange-600">
                          Phase 0{i + 1}
                        </span>
                        <span className="text-[11px] font-semibold text-navy-400">Step {i + 1}</span>
                      </div>

                      <h3 className="mt-3.5 font-display text-sm sm:text-base font-bold text-navy-900 transition-colors duration-200 group-hover:text-orange-600 leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-navy-50 flex items-center justify-between text-[11px] font-medium text-navy-400">
                      <span>Structured Execution</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      {/* 06. Strategic Approach & Verified Commercial Deliverables Split */}
      <Section tone="muted" compact className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 px-5 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md shadow-xs text-center">
          <SectionHeading
            kicker="Accountability"
            title="Strategic Approach & Verified Deliverables"
            description="How we coordinate strategic direction with practical execution, and the concrete deliverables your business receives."
          />
        </div>

        <div className="mt-6 sm:mt-8 grid gap-6 lg:gap-8 lg:grid-cols-2 items-start">
          {/* Left Column: Our Strategic Approach */}
          <div>
            <span className="kicker">Strategic Delivery</span>
            <h2 className="mt-2.5 sm:mt-3 font-display text-2xl xs:text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Our Strategic Approach
            </h2>
            <div className="mt-3.5 sm:mt-4 rounded-3xl border border-white/80 bg-white/95 p-5 sm:p-7 shadow-sm backdrop-blur-md">
              <p className="text-xs sm:text-sm md:text-base leading-relaxed text-navy-800">
                {service.approach}
              </p>
              <div className="mt-4 pt-3.5 border-t border-navy-100/60 flex items-start gap-2.5 text-xs font-medium text-navy-600 leading-relaxed">
                <span className="shrink-0 text-base">🤝</span>
                <span>
                  We operate with full transparency: clear agreed milestones, transparent performance indicators, and continuous iteration based on real market response.
                </span>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="mt-4 sm:mt-5 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.08] via-white to-transparent p-5 sm:p-6 shadow-sm backdrop-blur-sm">
              <h4 className="font-display text-sm sm:text-base font-bold text-navy-900">
                Ready to review your {service.short} requirements?
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                Our UK consultancy provides complimentary initial assessments with transparent pricing and zero hidden fees.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Button href="/contact" variant="primary" size="sm" className="w-full sm:w-auto justify-center">
                  Request Consultation <ArrowRight className="h-3.5 w-3.5" />
                </Button>
                <Button href={site.phoneHref} external variant="outline" size="sm" className="w-full sm:w-auto justify-center">
                  <Phone className="h-3.5 w-3.5" /> Call {site.phone}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Deliverables */}
          <div>
            <span className="kicker text-emerald-600">Commercial Deliverables</span>
            <h2 className="mt-2.5 sm:mt-3 font-display text-2xl xs:text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              What You Can Expect
            </h2>

            <div className="mt-3.5 sm:mt-4 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] via-white to-emerald-500/[0.02] p-5 sm:p-7 shadow-sm backdrop-blur-sm">
              <ul className="space-y-3 sm:space-y-3.5">
                {service.whatYouCanExpect.map((expectItem, i) => (
                  <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-navy-900 font-medium leading-relaxed">
                    <span className="mt-0.5 flex h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                      <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                    <span>{expectItem}</span>
                  </li>
                ))}
              </ul>

              {/* SEO disclaimer if applicable */}
              {service.slug === "organic-seo" && (
                <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-navy-200 bg-white p-3.5 text-xs text-navy-700 leading-relaxed shadow-xs">
                  <ShieldAlert className="h-4 w-4 shrink-0 text-orange-500 mt-0.5" />
                  <span>
                    <strong>Professional Note:</strong> SEO takes time, and rankings cannot be guaranteed. Progress depends on the website&apos;s starting point, competition, content quality, and technical implementation.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* 07. Relevant Case Studies (if any) */}
      {relevantCaseStudies.length > 0 && (
        <Section tone="white" compact className="relative">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 px-5 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md shadow-xs text-center">
            <SectionHeading
              kicker="Evidence of Impact"
              title={`Proven Results in ${service.short}`}
              description="Explore verified before-and-after results delivered for our UK and international clients."
            />
          </div>
          <div className="mt-6 sm:mt-8 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {relevantCaseStudies.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* 08. Interconnected Core Services Explorer (5 Other Services in a Balanced 3+2 Grid) */}
      <Section tone="muted" compact className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 px-5 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md shadow-xs text-center">
          <SectionHeading
            kicker="Coordinated Marketing"
            title="Explore Other Core Disciplines"
            description="Our six core services coordinate seamlessly around shared commercial goals under one roof."
          />
        </div>

        {/* Balanced 3 + 2 layout across 6 columns: 3 on row 1, 2 on row 2 spanning full width */}
        <div className="mt-6 sm:mt-8 grid gap-3.5 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {otherServices.map((s, idx) => {
            const colSpanClass =
              idx < 3 ? "lg:col-span-2" : "sm:col-span-2 lg:col-span-3";

            return (
              <Reveal key={s.slug} className={`h-full ${colSpanClass}`}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-navy-100/80 bg-white p-5 sm:p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600">
                      {s.kicker}
                    </span>
                    <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold text-navy-900 transition-colors duration-200 group-hover:text-orange-600">
                      {s.short}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
                      {s.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-navy-50 flex items-center justify-between text-xs font-semibold text-orange-600">
                    <span>Explore Blueprint</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 09. FAQs */}
      <Section tone="white" compact className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 px-5 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md shadow-xs text-center">
          <SectionHeading
            kicker="Questions & Clarity"
            title={`${service.short}: Frequently Asked Questions`}
            description="Everything you need to know about working with us on this discipline."
          />
        </div>
        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
          <FAQ items={service.faqs} />
        </div>
      </Section>

      {/* 10. High-Impact Conversion Band */}
      <CTASection
        title={
          <>
            Ready to elevate your <span className="text-orange-400">{service.short}?</span>
          </>
        }
        description={`Discuss your objectives with our UK-based team. Serving clients across the UK and internationally.`}
      />
    </SmoothScroll>
  );
}
