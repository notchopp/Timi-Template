import { useState, useMemo, useCallback } from "react";
import {
  BUSINESSES,
  CATEGORIES,
  type Business,
  type Category,
} from "./data/businesses";
import { useAppStore } from "./store/useAppStore";
import { DiscoverySearch } from "./components/DiscoverySearch";
import { BusinessCard } from "./components/BusinessCard";
import { ForYouFeed } from "./components/ForYouFeed";
import { OperationalAI } from "./components/OperationalAI";
import { DataFreshness } from "./components/DataFreshness";
import { MonetizationAI } from "./components/MonetizationAI";
import {
  AccessibilityBar,
  DietaryFilter,
  AccessibilityFilter,
  t,
} from "./components/Accessibility";
import type { AccessibilityTag, DietaryTag } from "./data/businesses";

function App() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchResults, setSearchResults] = useState<Business[] | null>(null);
  const [dietaryFilter, setDietaryFilter] = useState<DietaryTag[]>([]);
  const [accessibilityFilter, setAccessibilityFilter] = useState<AccessibilityTag[]>([]);
  const language = useAppStore((s) => s.language);

  const filtered = useMemo(() => {
    let list = searchResults ?? BUSINESSES;
    if (activeCategory !== "all") {
      list = list.filter((b) => b.category === activeCategory);
    }
    if (dietaryFilter.length > 0) {
      list = list.filter((b) =>
        dietaryFilter.some((d) => b.dietary?.includes(d))
      );
    }
    if (accessibilityFilter.length > 0) {
      list = list.filter((b) =>
        accessibilityFilter.every((a) => b.accessibility?.includes(a))
      );
    }
    return list;
  }, [
    searchResults,
    activeCategory,
    dietaryFilter,
    accessibilityFilter,
  ]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const handleSearchResults = useCallback((businesses: Business[]) => {
    setSearchResults(businesses.length > 0 ? businesses : null);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults(null);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="font-display text-xl font-semibold tracking-tight">
            Best of Upper Darby
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#listings" className="text-inkMuted hover:text-ink transition-colors">
              Directory
            </a>
            <a href="#owner-tools" className="text-inkMuted hover:text-ink transition-colors">
              Pricing
            </a>
            <a href="#" className="text-inkMuted hover:text-ink transition-colors">
              List Your Business
            </a>
            <a
              href="#"
              className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-accent transition-colors"
            >
              Sign In
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/40 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="mb-2 text-sm font-medium tracking-wide text-inkMuted uppercase">
            Upper Darby, PA
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            your local guide to the best businesses
          </h1>
          <p className="mt-4 max-w-xl text-lg text-inkMuted">
            Discover and support the best local businesses in your community.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#search"
              className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-cream hover:bg-accent transition-colors"
            >
              Browse Listings
            </a>
            <a
              href="#owner-tools"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-ink hover:bg-cream transition-colors"
            >
              List Your Business
            </a>
          </div>
        </div>
      </section>

      {/* 1. Discovery & Search */}
      <section id="search" className="border-b border-border/40 bg-cream py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
            discover with ai
          </h2>
          <p className="mt-1 text-sm text-inkMuted">
            Natural language search, conversational discovery, voice, and image search
          </p>
          <div className="mt-6">
            <DiscoverySearch onResults={handleSearchResults} />
          </div>
          {searchResults && searchResults.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              className="mt-3 text-sm text-inkMuted hover:text-ink"
            >
              Clear search
            </button>
          )}
        </div>
      </section>

      {/* Accessibility bar */}
      <section className="border-b border-border/40 bg-white py-4">
        <div className="mx-auto max-w-6xl px-6">
          <AccessibilityBar />
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/40 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-ink">
                {BUSINESSES.length}
              </p>
              <p className="mt-1 text-sm text-inkMuted">Businesses Listed</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-tight text-ink">0</p>
              <p className="mt-1 text-sm text-inkMuted">Featured</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-tight text-ink">Free</p>
              <p className="mt-1 text-sm text-inkMuted">To List</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-tight text-ink">~500</p>
              <p className="mt-1 text-sm text-inkMuted">Monthly Visitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories + 8. Accessibility filters */}
      <section className="border-b border-border/40 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
            {t("browse by category", language)}
          </h2>
          <p className="mt-1 text-sm text-inkMuted">
            {t("Find exactly what you need in Upper Darby", language)}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-ink text-cream"
                  : "bg-cream text-inkMuted hover:bg-border/50 hover:text-ink"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(9);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-ink text-cream"
                    : "bg-cream text-inkMuted hover:bg-border/50 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            <DietaryFilter selected={dietaryFilter} onChange={setDietaryFilter} />
            <AccessibilityFilter
              selected={accessibilityFilter}
              onChange={setAccessibilityFilter}
            />
          </div>
        </div>
      </section>

      {/* 3. For You + Smart Collections */}
      <section className="border-b border-border/40 bg-cream py-12">
        <div className="mx-auto max-w-6xl px-6">
          <ForYouFeed />
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
            {t("local businesses", language)}
          </h2>
          <p className="mt-1 text-sm text-inkMuted">
            Click any card to see full details and get in touch
          </p>
          <p className="mt-2 text-sm text-inkSubtle">
            Showing {displayed.length} of {filtered.length} businesses
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount((n) => n + 9)}
                className="rounded-md border border-border bg-white px-6 py-3 text-sm font-medium text-ink hover:bg-cream transition-colors"
              >
                Load More ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Data & Freshness */}
      <section className="border-b border-border/40 bg-cream py-12">
        <div className="mx-auto max-w-6xl px-6">
          <DataFreshness />
        </div>
      </section>

      {/* 4. Operational AI + 7. Monetization AI */}
      <section id="owner-tools" className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6 space-y-8">
          <OperationalAI />
          <MonetizationAI />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display font-semibold tracking-tight">
                Best of Upper Darby
              </p>
              <p className="mt-1 text-sm text-inkMuted">
                Your local guide to the best businesses in Upper Darby, PA.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#listings" className="text-inkMuted hover:text-ink transition-colors">
                Directory
              </a>
              <a href="#owner-tools" className="text-inkMuted hover:text-ink transition-colors">
                About & Pricing
              </a>
              <a href="#" className="text-inkMuted hover:text-ink transition-colors">
                Submit a Listing
              </a>
              <a href="#" className="text-inkMuted hover:text-ink transition-colors">
                List Your Business
              </a>
            </div>
          </div>
          <p className="mt-8 border-t border-border pt-8 text-xs text-inkSubtle">
            Upper Darby, PA · Free to list · Featured $10/mo · Promoted $15/mo
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
