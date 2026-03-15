import { Bell } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { BUSINESSES } from "../data/businesses";

export function DataFreshness() {
  const subscribedAlerts = useAppStore((s) => s.subscribedAlerts);
  const subscribed = BUSINESSES.filter((b) => subscribedAlerts.has(b.id));

  return (
    <section className="rounded-lg border border-border bg-white p-6">
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
        data & freshness
      </h2>
      <p className="mt-1 text-sm text-inkMuted">
        All listings show last verified date. Subscribe to get alerted when hours, menu, or info changes.
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-cream px-4 py-2">
          <span className="text-2xl">✓</span>
          <div>
            <p className="text-sm font-medium text-ink">Auto-updated</p>
            <p className="text-xs text-inkMuted">Hours & info refreshed from web</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-cream px-4 py-2">
          <Bell className="h-5 w-5 text-inkMuted" />
          <div>
            <p className="text-sm font-medium text-ink">Change alerts</p>
            <p className="text-xs text-inkMuted">You&apos;re subscribed to {subscribed.length} business{subscribed.length !== 1 ? "es" : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-cream px-4 py-2">
          <span className="text-2xl">↔</span>
          <div>
            <p className="text-sm font-medium text-ink">Duplicate detection</p>
            <p className="text-xs text-inkMuted">Similar listings merged</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-cream px-4 py-2">
          <span className="text-2xl">📍</span>
          <div>
            <p className="text-sm font-medium text-ink">Geo-corrected</p>
            <p className="text-xs text-inkMuted">Addresses validated</p>
          </div>
        </div>
      </div>
    </section>
  );
}
