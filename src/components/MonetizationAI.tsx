import { useState } from "react";
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { BUSINESSES } from "../data/businesses";

export function MonetizationAI() {
  const [category, setCategory] = useState("restaurant");
  const [leadScore] = useState(85);

  const avgLeadScore = Math.round(
    BUSINESSES.reduce((a, b) => a + (b.leadScore ?? 0), 0) / BUSINESSES.length
  );
  const benchmarkBusiness = BUSINESSES.find((b) => b.category === category) || BUSINESSES[0];

  return (
    <section className="rounded-lg border border-border bg-white p-6">
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
        monetization ai
      </h2>
      <p className="mt-1 text-sm text-inkMuted">
        Smart pricing, lead scoring, and competitor benchmarks for business owners
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-cream p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-inkMuted" />
            <h3 className="font-medium text-ink">Smart pricing</h3>
          </div>
          <p className="mt-2 text-sm text-inkMuted">
            Suggested pricing based on category demand and competition.
          </p>
          <div className="mt-3 rounded bg-white p-3">
            <p className="text-xs text-inkSubtle">Suggested for {category}</p>
            <p className="text-lg font-semibold text-ink">Featured: $10/mo</p>
            <p className="text-sm text-inkMuted">Promoted: $15/mo</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-cream p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-inkMuted" />
            <h3 className="font-medium text-ink">Lead scoring</h3>
          </div>
          <p className="mt-2 text-sm text-inkMuted">
            Every lead gets a score. High-intent leads surface first.
          </p>
          <div className="mt-3 rounded bg-white p-3">
            <p className="text-xs text-inkSubtle">Your avg lead score</p>
            <p className="text-2xl font-semibold text-ink">{leadScore}</p>
            <p className="text-xs text-inkMuted">/ 100 (platform avg: {avgLeadScore})</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-cream p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-inkMuted" />
            <h3 className="font-medium text-ink">Competitor benchmark</h3>
          </div>
          <p className="mt-2 text-sm text-inkMuted">
            See how your listing performs vs similar businesses.
          </p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-3 w-full rounded border border-border bg-white px-3 py-2 text-sm focus:outline-none"
          >
            {["restaurant", "electrician", "plumber", "barber-salon"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="mt-2 rounded bg-white p-2 text-sm">
            <p className="text-inkSubtle">{benchmarkBusiness?.name}</p>
            <p>Views: {benchmarkBusiness?.viewCount} · Lead score: {benchmarkBusiness?.leadScore}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
