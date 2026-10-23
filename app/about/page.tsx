import Image from "next/image";
import Link from "next/link";
import {
  Lightbulb,
  Target,
  Eye,
  Globe2,
  Layers,
  BarChart3,
  Repeat,
  MessageSquare,
  Users,
  ArrowRight,
  Phone,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import AboutHero from "@/components/AboutHero";
import ServicesTicker from "@/components/ServicesTicker";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import ParallaxBand from "@/components/ParallaxBand";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { pageMeta, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { services, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Us | UK & International Digital Marketing Consultancy",
  description:
    "Sharper Labs Marketing is a UK-based digital marketing consultancy serving businesses across the UK and internationally. Learn about our approach, values, and commitment to measurable progress.",
  path: "/about",
  keywords: [
    "about Sharper Labs Marketing",
    "digital marketing consultancy UK",
    "B2B digital marketing agency UK",
    "international marketing consultancy",
    "business growth marketing agency",
  ],
});

const pillars = [
  {
    icon: Lightbulb,
    badge: "01 · PHILOSOPHY",
    title: "Our Philosophy",
    text: "Our consultants connect your brand with the right audience, investors, and community, while integrating actionable marketing data at every step of your journey.",
  },
  {
    icon: Target,
    badge: "02 · MISSION",
    title: "Our Mission",
    text: "To support our clients in achieving sustainable commercial growth through data-driven digital marketing, brand positioning, and conversion-focused experiences.",
  },
  {
    icon: Eye,
    badge: "03 · VISION",
    title: "Our Vision",
    text: "To be the premier digital marketing partner for ambitious businesses, coordinating strategy and execution under one roof with measurable return.",
  },
];

const whyPartnerPillars = [
  {
    title: "Marketing Built Around Your Business",
    text: "We begin by understanding your business objectives, target audience, challenges, and priorities. Our recommendations are designed around your specific needs rather than a rigid, one-size-fits-all package.",
    icon: Target,
  },
  {
    title: "Strategy and Execution Under One Roof",
    text: "Our six core services cover brand marketing, website design and development, social media, PPC, data analysis, and organic SEO, allowing us to coordinate different marketing activities around shared business goals.",
    icon: Layers,
  },
  {
    title: "Decisions Informed by Data",
    text: "We use relevant performance information to assess what is working, identify areas for improvement, and guide marketing decisions. Our aim is to make performance easier to understand and opportunities easier to identify.",
    icon: BarChart3,
  },
  {
    title: "Continuous Improvement",
    text: "Our Initiation, Iteration, and Integration approach focuses on understanding the audience, improving campaigns based on feedback and performance, and connecting marketing activities into a more consistent strategy.",
    icon: Repeat,
  },
  {
    title: "Clear Communication & Reporting",
    text: "We aim to provide clear updates on agreed activities, performance indicators, and next steps, helping clients understand the work being delivered and the reasons behind our recommendations.",
    icon: MessageSquare,
  },
  {
    title: "Flexible Support for Different Goals",
    text: "Whether you need support with one service or a coordinated digital marketing strategy, we work with you to identify an approach that reflects your priorities, resources, and commercial timeline.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <SmoothScroll>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "About Us", path: "/about" }]),
          webPageJsonLd({
            name: "About Us | Sharper Labs Marketing",
            description:
              "Sharper Labs Marketing is a UK-based digital marketing consultancy serving clients across the UK and internationally.",
            path: "/about",
          }),
        ]}
      />

      {/* 01. Modern Cinematic About Us Hero with 3D Global Network Scene */}
      <AboutHero />

      {/* 02. Continuous Animated Services Ticker Strip */}
      <ServicesTicker />

      {/* 03. Intro Split — Who We Are */}
      <Section tone="white" className="relative overflow-hidden">
        {/* Subtle background ambient blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl"
        />

        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Visual Presentation with Layered Glass Effect & Floating Pill Badge */}
          <Reveal>
            <div className="relative group">
              {/* Soft ambient back-glow behind image */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-orange-500/20 via-cyan-500/10 to-transparent blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
              />

              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-b from-white via-surface-muted/60 to-white p-4 xs:p-6 sm:p-8 md:p-10 pb-16 sm:pb-8 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:shadow-xl group-hover:border-orange-200">
                <Image
                  src="/images/marketing-hero-1.png"
                  alt="Sharper Labs Marketing consultant"
                  width={620}
                  height={560}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  className="h-auto w-full max-w-sm sm:max-w-md lg:max-w-lg object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Floating Credential Micro-Pill */}
                <div className="absolute bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-auto sm:right-6 flex justify-center sm:justify-end">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-navy-900 shadow-md backdrop-blur-md max-w-full">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                    </span>
                    <span className="text-[10px] sm:text-xs text-navy-900 font-semibold truncate sm:whitespace-normal">
                      UK Strategic Consultancy · Global Standards
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Narrative Column */}
          <div>
            <span className="kicker">Who We Are</span>
            <h2 className="mt-3 font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-tight">
              Local Expertise. <span className="text-orange-500">Global Perspective.</span>
            </h2>
            <div className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4 leading-relaxed text-ink-muted text-xs xs:text-sm sm:text-base">
              <p>
                Based in the UK and working with businesses across markets, Sharper Labs Marketing
                combines strategic thinking with practical digital expertise. We help organisations
                strengthen their online presence, connect with relevant audiences, and create
                sustainable opportunities for growth.
              </p>
              <p>
                From brand strategy and website development to paid advertising, social media, data
                analysis, and SEO, we bring strategy, creativity, and performance measurement
                together to help businesses make smarter marketing decisions.
              </p>
              <p>
                Whether you are an established company or a growing business, we develop marketing
                solutions around your goals, your audience, and your ambitions, maintaining a strict
                commitment to measurable progress not empty promises.
              </p>
            </div>
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Button href="/contact" variant="primary" className="w-full sm:w-auto justify-center">
                Discuss Your Marketing Goals <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={site.phoneHref} external variant="outline" className="w-full sm:w-auto justify-center">
                <Phone className="h-4 w-4" /> {site.phoneIntl}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 04. Philosophy / Mission / Vision ("What Drives Us") */}
      <Section tone="muted" className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-8 backdrop-blur-md shadow-xs text-center">
          <SectionHeading kicker="What Drives Us" title="Our Philosophy, Mission and Vision" />
        </div>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} index={i} className="h-full">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 sm:p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:bg-white hover:shadow-xl">
                {/* Top specular glow line on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(244,123,32,0.4)]">
                      <p.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-navy-400 uppercase">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 sm:mt-6 font-display text-lg sm:text-xl font-bold text-navy-900 transition-colors duration-200 group-hover:text-orange-600">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-ink-muted">
                    {p.text}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-navy-50 flex items-center justify-between text-xs font-semibold text-orange-600">
                  <span>Core Pillar</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 05. Why Choose Section (Differentiated Strengths) */}
      <Section tone="white" className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-8 backdrop-blur-md shadow-xs text-center">
          <SectionHeading
            kicker="Differentiated Strengths"
            title="Why Partner with Sharper Labs Marketing?"
            description="Here is what makes us different from conventional agencies: genuine commercial focus, data-informed strategy, and execution under one roof."
          />
        </div>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyPartnerPillars.map((p, i) => (
            <Reveal key={p.title} index={i} className="h-full">
              <div className="group flex h-full flex-col justify-between rounded-3xl border border-navy-100/80 bg-surface-muted/40 p-5 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-navy-900 text-orange-400 shadow-sm transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(244,123,32,0.4)]">
                      <p.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-navy-400 uppercase">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-bold text-navy-900 transition-colors duration-200 group-hover:text-orange-600">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                    {p.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Commitment Box */}
        <Reveal className="mt-10 sm:mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-500/[0.08] via-white to-orange-500/[0.03] p-6 sm:p-8 md:p-10 text-center shadow-md backdrop-blur-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-orange-600">
              Our Core Commitment
            </span>
            <p className="mt-3 font-display text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 leading-snug max-w-3xl mx-auto">
              &ldquo;A considered strategy, transparent communication, and a focus on measurable progress not empty promises.&rdquo;
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 06. Parallax Statement */}
      <ParallaxBand image="/images/marketing-landing-1.jpeg">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="kicker justify-center text-orange-400">Creativity, Integrity, Excellence</span>
          <h2 className="mt-3 font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            We instil adaptable, remarkable and transparent values
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-100 text-xs xs:text-sm sm:text-base leading-relaxed">
            Your digital marketing projects are carried out by our talented in-house team to provide
            you with best-in-class services, so you can succeed in your business whilst we focus on
            creativity, integrity, and measurable excellence.
          </p>
        </Reveal>
      </ParallaxBand>

      {/* 07. Complete Directory Grid of All 6 Core Disciplines */}
      <Section tone="navy" id="services">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8 backdrop-blur-md shadow-sm text-center">
          <SectionHeading
            light
            kicker="What We Offer"
            title="Our Six Core Digital Marketing Services"
            description="Explore the full range of ways Sharper Labs Marketing can help your business grow across the UK and internationally."
          />
        </div>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </Section>

      {/* 08. High-Impact Conversion Band */}
      <CTASection
        title={
          <>
            Partner with a <span className="text-orange-400">results-driven UK consultancy</span>
          </>
        }
        description="Book a free consultation today to discuss your brand, search, paid media, or web objectives."
      />
    </SmoothScroll>
  );
}
