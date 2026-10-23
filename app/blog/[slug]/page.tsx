import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  Quote,
  ArrowRight,
  Phone,
  Bookmark,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import BlogPostHero from "@/components/BlogPostHero";
import ConsultationTriggerButton from "@/components/ConsultationTriggerButton";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/providers/SmoothScroll";
import {
  getAllBlogPosts,
  getBlogPost,
  getRelatedBlogPosts,
} from "@/lib/blog";
import {
  pageMeta,
  breadcrumbJsonLd,
  blogPostingJsonLd,
} from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return pageMeta({
    title: `${post.title} | Sharper Labs Marketing`,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: post.tags,
    type: "article",
  });
}

export default async function BlogPostDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post.slug, 2);
  const path = `/blog/${post.slug}`;

  return (
    <SmoothScroll>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Blog & Insights", path: "/blog" },
            { name: post.category, path: "/blog" },
            { name: post.title, path },
          ]),
          blogPostingJsonLd({
            title: post.title,
            description: post.metaDescription || post.excerpt,
            path,
            image: post.image,
            publishedAt: post.dateIso,
            authorName: post.author.name,
            category: post.category,
            keywords: post.tags,
          }),
        ]}
      />

      {/* 01. Modern Cinematic Blog Post Hero */}
      <BlogPostHero post={post} />

      {/* 02. Article Main Content & Sidebar */}
      <article className="py-8 sm:py-12 bg-gradient-to-b from-white via-surface-muted/30 to-white relative overflow-hidden">
        {/* Subtle background ambient blur halos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-2/3 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"
        />

        <div className="container-page max-w-6xl relative z-10">
          {/* Feature Image Encased in Luxury Frosted Frame with Specular Glow */}
          <div className="relative group mb-8 sm:mb-10">
            {/* Ambient soft glow behind image */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-orange-500/20 via-cyan-500/10 to-transparent blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
            />
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-3xl border border-white/80 bg-navy-950 shadow-lg">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </div>

          {/* 2-Column Content Layout (Article Body + Sticky Sidebar) */}
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-start">
            {/* Main Content Body */}
            <div className="lg:col-span-8">
              {/* Standfirst / Excerpt Lead */}
              <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/[0.06] via-white/80 to-transparent p-5 sm:p-7 mb-8 sm:mb-10 shadow-xs backdrop-blur-md">
                <p className="font-display text-sm xs:text-base sm:text-lg font-medium leading-relaxed text-navy-900">
                  {post.excerpt}
                </p>
              </div>

              {/* Mobile Table of Contents */}
              <div className="mb-8 rounded-3xl border border-white/80 bg-white/95 p-5 shadow-xs backdrop-blur-md lg:hidden">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-3 flex items-center gap-1.5">
                  <Bookmark className="h-3.5 w-3.5" /> In This Article
                </p>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {post.tableOfContents.map((toc, i) => (
                    <li key={toc.id}>
                      <a
                        href={`#${toc.id}`}
                        className="text-navy-700 hover:text-orange-600 transition-colors flex items-center gap-2"
                      >
                        <span className="text-orange-500 font-mono font-bold text-xs">
                          {String(i + 1).padStart(2, "0")}.
                        </span>
                        <span className="font-medium">{toc.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Sections */}
              <div className="space-y-10 sm:space-y-12">
                {post.sections.map((section, idx) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-navy-900 mb-3.5 sm:mb-4 flex items-center gap-2.5">
                      <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 font-mono text-xs sm:text-sm font-bold border border-orange-500/20">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{section.heading}</span>
                    </h2>

                    <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-ink-muted">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Bullet Points */}
                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <ul className="my-5 sm:my-6 space-y-2.5 rounded-3xl border border-white/80 bg-white/90 p-4 sm:p-6 shadow-xs backdrop-blur-md">
                        {section.bulletPoints.map((point, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-900 font-medium leading-relaxed">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-500 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Quote Callout */}
                    {section.quote && (
                      <blockquote className="my-6 sm:my-8 rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/[0.08] via-white to-transparent p-5 sm:p-7 shadow-xs backdrop-blur-md">
                        <Quote className="h-6 w-6 text-orange-500 mb-2" />
                        <p className="font-display text-sm sm:text-base lg:text-lg font-semibold italic text-navy-900 leading-relaxed">
                          &ldquo;{section.quote.text}&rdquo;
                        </p>
                        {section.quote.author && (
                          <footer className="mt-3 text-xs font-bold text-orange-600 uppercase tracking-wider">
                            — {section.quote.author}
                          </footer>
                        )}
                      </blockquote>
                    )}

                    {/* Key Takeaways */}
                    {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                      <div className="my-6 sm:my-8 rounded-3xl border border-navy-700/60 bg-gradient-to-br from-navy-950 via-navy-900 to-[#071329] text-white p-5 sm:p-7 shadow-lg relative overflow-hidden">
                        <span className="block text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-3">
                          Strategic Takeaways
                        </span>
                        <ul className="space-y-2.5">
                          {section.keyTakeaways.map((takeaway, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-xs sm:text-sm text-navy-100 leading-relaxed">
                              <span className="text-orange-400 font-bold">•</span>
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Tags Section */}
              <div className="mt-10 sm:mt-12 border-t border-navy-100/80 pt-6 sm:pt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-3">
                  Related Topics & Search Keywords:
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-navy-100 bg-white px-3 py-1 text-xs font-medium text-navy-700 shadow-2xs hover:border-orange-300 hover:text-orange-600 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="mt-8 sm:mt-10 rounded-3xl border border-white/80 bg-white/95 p-5 sm:p-8 shadow-sm backdrop-blur-md">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-orange-500 bg-navy-100 shrink-0 shadow-sm">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-navy-900 flex items-center justify-center sm:justify-start gap-2">
                      About {post.author.name}
                      <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-600 border border-orange-200">
                        Lead Practice
                      </span>
                    </h3>
                    <p className="text-xs font-semibold text-orange-600 mb-2">{post.author.role}</p>
                    <p className="text-xs leading-relaxed text-ink-muted">
                      Sharper Labs Marketing is a UK-based digital marketing consultancy helping businesses
                      build stronger brands, reach the right audiences, and achieve sustainable commercial growth
                      across the UK and internationally.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Sticky Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                {/* Table of contents */}
                <div className="hidden lg:block rounded-3xl border border-white/80 bg-white/95 p-5 sm:p-6 shadow-xs backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-3.5 flex items-center gap-1.5">
                    <Bookmark className="h-3.5 w-3.5 text-orange-500" /> In This Article
                  </p>
                  <ul className="space-y-2.5 text-xs leading-snug">
                    {post.tableOfContents.map((toc, i) => (
                      <li key={toc.id}>
                        <a
                          href={`#${toc.id}`}
                          className="text-navy-700 hover:text-orange-600 transition-colors flex items-start gap-2 group"
                        >
                          <span className="text-orange-500 font-mono font-bold shrink-0">
                            {String(i + 1).padStart(2, "0")}.
                          </span>
                          <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                            {toc.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Core Services */}
                {post.relatedServices && post.relatedServices.length > 0 && (
                  <div className="rounded-3xl border border-white/80 bg-white/95 p-5 sm:p-6 shadow-xs backdrop-blur-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-3 flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-orange-500" /> Related Services
                    </p>
                    <div className="space-y-2">
                      {post.relatedServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="flex items-center justify-between rounded-2xl bg-surface-muted/70 px-3.5 py-2.5 text-xs font-semibold text-navy-900 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                        >
                          <span>{service.name}</span>
                          <ChevronRight className="h-3.5 w-3.5 text-navy-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Consultation Widget with Interactive Modal Trigger */}
                <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-navy-950 via-navy-900 to-[#071329] p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/15 blur-2xl"
                  />
                  
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-300 border border-orange-500/30">
                    <Sparkles className="h-3 w-3 text-orange-400" />
                    Free Consultation
                  </span>

                  <h3 className="mt-3 font-display text-base sm:text-lg font-bold text-white">
                    Need tailored strategy for your business?
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy-200">
                    Discuss your commercial objectives with our senior UK consultants. No obligation.
                  </p>

                  <div className="mt-4">
                    <ConsultationTriggerButton
                      label="Discuss Marketing Goals"
                      variant="primary"
                      className="w-full text-xs py-2.5"
                    />
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-white/10 text-center">
                    <a
                      href={site.phoneHref}
                      className="inline-flex items-center gap-1.5 text-xs text-navy-300 hover:text-white transition-colors"
                    >
                      <Phone className="h-3 w-3 text-orange-400" /> Call {site.phoneIntl}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles Strip */}
          {related.length > 0 && (
            <div className="mt-14 sm:mt-18 border-t border-navy-100/80 pt-8 sm:pt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                    Recommended Reading
                  </span>
                  <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-navy-900">
                    More Strategic Insights
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-700 hover:text-orange-600 transition-colors"
                >
                  View All Insights <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                {related.map((item) => (
                  <article
                    key={item.slug}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-5 sm:p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-xl"
                  >
                    {/* Top specular glow line on hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    <div>
                      <div className="flex items-center gap-2 text-xs text-ink-muted mb-2.5">
                        <span className="rounded-full bg-orange-50 px-2 py-0.5 font-bold text-orange-600 text-[10px] border border-orange-200">
                          {item.category}
                        </span>
                        <span>•</span>
                        <span className="text-[11px] text-navy-500">{item.readTime}</span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-navy-900 group-hover:text-orange-600 transition-colors">
                        <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="mt-2 text-xs text-ink-muted line-clamp-2 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-navy-100/70 flex items-center justify-between">
                      <span className="text-[11px] text-navy-500">{item.publishedAt}</span>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:text-orange-500 transition-colors"
                      >
                        Read Guide <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* 03. High-Impact Conversion Banner */}
      <CTASection
        title="Connect with our UK digital marketing consultants"
        description="Whether you are an established business or a growing company, we develop tailored marketing solutions around your goals, your audience, and your ambitions."
      />
    </SmoothScroll>
  );
}
