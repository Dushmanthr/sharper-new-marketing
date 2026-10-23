import { Clock, Phone, Mail, MapPin, Globe } from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import ContactHero from "@/components/ContactHero";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { pageMeta, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { offices, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Us | UK & International Digital Marketing Enquiry",
  description:
    "Get in touch with Sharper Labs Marketing. Book a free consultation, request a quotation, or call our UK head office. Serving clients across the UK and internationally.",
  path: "/contact",
  keywords: [
    "contact Sharper Labs Marketing",
    "digital marketing enquiry UK",
    "book digital marketing consultation",
    "marketing agency quotation",
    "digital marketing consultancy London",
  ],
});

type Office = (typeof offices)[keyof typeof offices];

function mapEmbed(o: Office) {
  const q = encodeURIComponent(`${o.name} ${o.street} ${o.city} ${o.postcode}`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

function OfficeMap({ office }: { office: Office }) {
  return (
    <Reveal className="group overflow-hidden rounded-3xl border border-navy-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
      <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-navy-950">
        <iframe
          title={`${office.label} map`}
          src={mapEmbed(office)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>
      <div className="p-5 sm:p-7">
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-orange-600">
          {office.label}
        </span>
        <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-navy-900 transition-colors duration-200 group-hover:text-orange-600">
          {office.name}
        </h3>
        <p className="mt-2.5 flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
          <span>
            {office.street}, {office.city} {office.postcode}, {office.country}
          </span>
        </p>
      </div>
    </Reveal>
  );
}

export default function ContactPage() {
  return (
    <SmoothScroll>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Contact Us", path: "/contact" }]),
          webPageJsonLd({
            name: "Contact Us | Sharper Labs Marketing",
            description:
              "Get in touch with Sharper Labs Marketing to promote your business across the UK and internationally.",
            path: "/contact",
          }),
        ]}
      />

      {/* 01. Modern Cinematic Contact Hero with Consultation Modal Trigger */}
      <ContactHero />

      {/* 02. Intro & International Contact Hub */}
      <Section tone="white" className="relative overflow-hidden">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-8 backdrop-blur-md shadow-xs text-center">
          <SectionHeading
            kicker="Direct Communication"
            title="Connect with Our Senior Consultancy Team"
            description="Whether you are an established company or a growing business in the UK or overseas, we make the enquiry process transparent and frictionless. Choose the contact channel that fits your workflow."
          />
        </div>

        {/* 3 Channels Strip */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="group flex h-full flex-col justify-between rounded-3xl border border-navy-100/80 bg-surface-muted/50 p-6 sm:p-7 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-lg">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-orange-400 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_16px_rgba(244,123,32,0.4)]">
                <Clock className="h-5 w-5" />
              </span>
              <span className="mt-4 block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-orange-600">
                Office Hours & Timezone
              </span>
              <p className="mt-1 font-display text-base sm:text-lg font-bold text-navy-900">
                Mon – Fri: 09:00 – 17:00
              </p>
              <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                London Time (GMT/BST). Weekends & UK Bank Holidays closed.
              </p>
            </div>
          </Reveal>

          <Reveal index={1} className="group flex h-full flex-col justify-between rounded-3xl border border-navy-100/80 bg-surface-muted/50 p-6 sm:p-7 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-lg">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-orange-400 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_16px_rgba(244,123,32,0.4)]">
                <Phone className="h-5 w-5" />
              </span>
              <span className="mt-4 block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-orange-600">
                Telephone Presentation
              </span>
              <p className="mt-1 font-display text-base sm:text-lg font-bold text-navy-900">
                <a href={site.phoneHref} className="hover:text-orange-600 transition-colors">
                  {site.phoneIntl}
                </a>
              </p>
              <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                UK Local: {site.phone} · Direct connection to consultancy team
              </p>
            </div>
          </Reveal>

          <Reveal index={2} className="group flex h-full flex-col justify-between rounded-3xl border border-navy-100/80 bg-surface-muted/50 p-6 sm:p-7 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-orange-400 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_16px_rgba(244,123,32,0.4)]">
                <Mail className="h-5 w-5" />
              </span>
              <span className="mt-4 block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-orange-600">
                Email & International RFPs
              </span>
              <p className="mt-1 font-display text-base sm:text-lg font-bold text-navy-900 truncate">
                <a href={`mailto:${site.email}`} className="hover:text-orange-600 transition-colors break-all sm:break-normal">
                  {site.email}
                </a>
              </p>
              <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                Responses within 24 business hours with initial strategic assessment
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 03. Main Enquiry Form Section */}
      <Section tone="navy" className="relative">
        <div className="grid items-start gap-8 lg:gap-12 lg:grid-cols-12">
          {/* Left Column: Details & Fast-Track Modal Trigger */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-semibold text-orange-400 backdrop-blur-md">
              <Globe className="h-3.5 w-3.5" /> International Enquiries Welcome
            </span>
            <h2 className="mt-4 font-display text-2xl xs:text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Arrange a Free Consultation or Request a Quotation
            </h2>
            <p className="mt-4 text-xs xs:text-sm sm:text-base leading-relaxed text-navy-100">
              Share your marketing objectives with our consultants. We evaluate your current market presence, review your competitor landscape, and recommend an actionable roadmap.
            </p>

            <div className="mt-7 sm:mt-8 space-y-3.5 text-xs sm:text-sm text-navy-200">
              <p className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                  ✓
                </span>
                Complimentary 30-minute discovery call via Teams or Google Meet
              </p>
              <p className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                  ✓
                </span>
                Clear quotation breakdown with zero hidden fees
              </p>
              <p className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                  ✓
                </span>
                Strict confidentiality & full UK GDPR compliance
              </p>
            </div>

            {/* Overseas Enquirers Note */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-xs text-navy-200 leading-relaxed">
              <span className="font-semibold text-white">Overseas Enquirers:</span> If your business operates outside UK business hours, simply submit the form with your timezon, and we will arrange a convenient call time.
            </div>
          </div>

          {/* Right Column: Embedded Form */}
          <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-white/10 bg-white p-5 sm:p-8 shadow-2xl lg:col-span-7">
            <EnquiryForm />
          </Reveal>
        </div>
      </Section>

      {/* 04. UK Physical Presence / Offices */}
      <Section tone="muted">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-8 backdrop-blur-md shadow-xs text-center">
          <SectionHeading
            kicker="Our Locations"
            title="UK Office Locations"
            description="We maintain our registered offices in Hertfordshire and our executive head office in London, serving clients across the UK and globally."
          />
        </div>
        <div className="mt-8 sm:mt-12 grid gap-6 md:grid-cols-2">
          <OfficeMap office={offices.registered} />
          <OfficeMap office={offices.head} />
        </div>
      </Section>
    </SmoothScroll>
  );
}
