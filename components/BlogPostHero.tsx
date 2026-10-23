"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import type { BlogPost } from "@/lib/blog";

interface BlogPostHeroProps {
  post: BlogPost;
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  const [copied, setCopied] = useState(false);

  const postUrl = typeof window !== "undefined" ? window.location.href : `${site.url}/blog/${post.slug}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060b18] via-[#091124] to-[#060b18] text-white">
      {/* Subtle geometric grid texture */}
      <div className="hero-grid absolute inset-0 opacity-25" aria-hidden="true" />

      {/* Dynamic ambient chromatic glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-orange-500/15 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/6 h-96 w-96 rounded-full bg-cyan-500/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-orange-500/15 blur-[100px]"
      />

      <div className="container-page relative z-10 pt-8 sm:pt-12 md:pt-14 pb-10 sm:pb-14">
        {/* Top row: Back link + Frosted Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-navy-200 backdrop-blur-md hover:bg-white/15 hover:text-white transition-all shadow-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-orange-400" />
            <span>Back to All Guides</span>
          </Link>

          <nav
            aria-label="Breadcrumb"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-navy-200 backdrop-blur-md shadow-xs"
          >
            <Link href="/" className="transition-colors hover:text-orange-400">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-navy-400" />
            <Link href="/blog" className="transition-colors hover:text-orange-400">
              Blog & Insights
            </Link>
            <ChevronRight className="h-3 w-3 text-navy-400" />
            <span className="font-semibold text-orange-400 truncate max-w-[200px]">
              {post.category}
            </span>
          </nav>
        </div>

        {/* Category Pill + Read Time + Date Badges */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 font-semibold text-orange-300 backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              {post.category}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-navy-200 backdrop-blur-xs">
              <Clock className="h-3.5 w-3.5 text-orange-400" />
              {post.readTime}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-navy-200 backdrop-blur-xs">
              <Calendar className="h-3.5 w-3.5 text-cyan-400" />
              {post.publishedAt}
            </span>
          </div>
        </Reveal>

        {/* Main Article Title */}
        <Reveal delay={0.05}>
          <h1 className="mt-4 sm:mt-6 font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.18] max-w-5xl">
            {post.title}
          </h1>
        </Reveal>

        {/* Author Chip & Social Share Bar */}
        <Reveal delay={0.1}>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            {/* Author Profile */}
            <div className="flex items-center gap-3.5">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-orange-500/60 bg-navy-800 shadow-md">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  {post.author.name}
                  <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-500/30">
                    Verified
                  </span>
                </p>
                <p className="text-xs text-navy-300">{post.author.role}</p>
              </div>
            </div>

            {/* Social Share Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-navy-300">Share:</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `${site.url}/blog/${post.slug}/`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-navy-200 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-sm"
                aria-label="Share on LinkedIn"
              >
                <Share2 className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-navy-200 transition-all hover:bg-white/15 hover:text-white shadow-sm cursor-pointer"
                aria-label="Copy article link"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Subtle bottom fade transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-navy-950/60 to-transparent"
      />
    </section>
  );
}
