import { useMemo } from "react";
import { BUSINESSES, SMART_COLLECTIONS } from "../data/businesses";
import { useAppStore } from "../store/useAppStore";
import { BusinessCard } from "./BusinessCard";
import type { Business } from "../data/businesses";

export function ForYouFeed() {
  const viewedBusinessIds = useAppStore((s) => s.viewedBusinessIds);

  const forYou = useMemo(() => {
    const viewedBizs = BUSINESSES.filter((b) => viewedBusinessIds.includes(b.id));
    const similar: Business[] = [];
    viewedBizs.forEach((b) => {
      b.similarIds.forEach((id) => {
        const biz = BUSINESSES.find((x) => x.id === id);
        if (biz && !viewedBizs.find((v) => v.id === biz.id) && !similar.find((s) => s.id === biz.id)) {
          similar.push(biz);
        }
      });
    });
    const popular = BUSINESSES.filter((b) => !viewedBusinessIds.includes(b.id))
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 3);
    return { similar, popular };
  }, [viewedBusinessIds]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
          for you
        </h2>
        <p className="mt-1 text-sm text-inkMuted">
          Based on what you&apos;ve viewed and popular in Upper Darby
        </p>
        {(forYou.similar.length > 0 || forYou.popular.length > 0) ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forYou.similar.slice(0, 3).map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
            {forYou.similar.length < 3 && forYou.popular
              .filter((p) => !forYou.similar.find((s) => s.id === p.id))
              .slice(0, 3 - forYou.similar.length)
              .map((b) => (
                <BusinessCard key={b.id} business={b} />
              ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-inkMuted">
            Browse some listings and we&apos;ll personalize recommendations.
          </p>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
          smart collections
        </h2>
        <p className="mt-1 text-sm text-inkMuted">
          AI-generated lists for common needs
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {SMART_COLLECTIONS.map((col) => {
            const bizs = BUSINESSES.filter((b) => col.businessIds.includes(b.id));
            return (
              <div
                key={col.id}
                className="rounded-lg border border-border bg-white p-4"
              >
                <h3 className="font-display font-medium text-ink">{col.title}</h3>
                <p className="mt-1 text-sm text-inkMuted">{col.description}</p>
                <ul className="mt-3 space-y-1">
                  {bizs.map((b) => (
                    <li key={b.id}>
                      <a href="#" className="text-sm text-ink hover:underline">
                        {b.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
