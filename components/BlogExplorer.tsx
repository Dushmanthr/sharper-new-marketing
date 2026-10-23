"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Clock,
  ArrowRight,
  Calendar,
  Sparkles,
  BookOpen,
  SlidersHorizontal,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface BlogExplorerProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featured = filteredPosts[0] || posts[0];
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Search & Category Filter Command Bar */}
      <div className="rounded-3xl border border-white/80 bg-white/90 p-4 sm:p-5 shadow-sm backdrop-blur-md transition-all">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search input with focus glow */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, strategies, SEO, PPC..."
              className="w-full rounded-2xl border border-navy-100 bg-surface-muted/60 py-2.5 pl-11 pr-4 text-xs sm:text-sm text-navy-900 placeholder-navy-400 focus:border-orange-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* Results Counter Chip */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-navy-500 shrink-0">
            <SlidersHorizontal className="h-3.5 w-3.5 text-orange-500" />
            <span>
              Showing <strong className="text-navy-900">{filteredPosts.length}</strong> of {posts.length} Guides
            </span>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 pt-3 border-t border-navy-100/60 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]"
                    : "border border-navy-100/80 bg-white text-navy-700 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-navy-200 bg-white/80 p-10 sm:p-14 text-center backdrop-blur-md">
          <BookOpen className="mx-auto h-10 w-10 text-orange-400/80 mb-3" />
          <p className="font-display text-lg font-bold text-navy-900">No strategy guides found</p>
          <p className="mt-1.5 text-xs sm:text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
            We couldn&apos;t find any articles matching your search query or filter. Try a broader term or reset filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          {/* Featured Post Card (Hero Spotlight with Specular Glow) */}
          {featured && (
            <article className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-5 sm:p-7 lg:p-9 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl">
              {/* Top specular glow line on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
                {/* Feature Image with subtle scale */}
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-navy-950 sm:aspect-16/9 lg:col-span-7 shadow-inner">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  
                  {/* Floating Frosted Badge */}
                  <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-navy-900/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400 border border-white/10 shadow-sm">
                    <Sparkles className="h-3 w-3 text-orange-400" />
                    Featured Insight
                  </span>
                </div>

                <div className="flex flex-col justify-between lg:col-span-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-semibold text-ink-muted">
                      <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-orange-600 border border-orange-200/60 font-semibold text-[11px]">
                        {featured.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-navy-500">
                        <Clock className="h-3 w-3 text-orange-500" /> {featured.readTime}
                      </span>
                      <span className="text-navy-300">•</span>
                      <span className="flex items-center gap-1 text-[11px] text-navy-500">
                        <Calendar className="h-3 w-3 text-cyan-500" /> {featured.publishedAt}
                      </span>
                    </div>

                    <h2 className="mt-3.5 font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-navy-900 group-hover:text-orange-600 transition-colors leading-snug">
                      <Link href={`/blog/${featured.slug}`} className="focus:outline-hidden">
                        {featured.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-muted line-clamp-3">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 flex items-center justify-between border-t border-navy-100/70 pt-4 sm:pt-5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-orange-500/30 bg-navy-100 shadow-xs">
                        <Image
                          src={featured.author.avatar}
                          alt={featured.author.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy-900">{featured.author.name}</p>
                        <p className="text-[10px] text-ink-muted">{featured.author.role}</p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
                    >
                      Read Guide <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Grid of Remaining Posts */}
          {gridPosts.length > 0 && (
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-5 sm:p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-xl"
                >
                  {/* Top specular glow line on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div>
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-navy-950">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-navy-900/85 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-orange-400 border border-white/10 shadow-xs">
                        {post.category}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-[11px] text-ink-muted">
                      <span className="flex items-center gap-1 text-navy-500">
                        <Clock className="h-3 w-3 text-orange-500" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span className="text-navy-500">{post.publishedAt}</span>
                    </div>

                    <h3 className="mt-2.5 font-display text-base sm:text-lg font-bold leading-snug text-navy-900 group-hover:text-orange-600 transition-colors">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-hidden">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-ink-muted line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-navy-100/70 pt-3.5 sm:pt-4">
                    <span className="text-[11px] font-medium text-navy-600 truncate max-w-[140px]">
                      {post.author.name}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:text-orange-500 transition-colors"
                    >
                      Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
