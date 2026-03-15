import { MessageCircle, Mail } from "lucide-react";
import type { Business } from "../data/businesses";
import { useAppStore } from "../store/useAppStore";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const addViewed = useAppStore((s) => s.addViewed);
  const toggleAlert = useAppStore((s) => s.toggleAlert);
  const subscribedAlerts = useAppStore((s) => s.subscribedAlerts);

  const handleClick = () => {
    addViewed(business.id);
  };

  const smsLink = `sms:${business.phone.replace(/\D/g, "")}`;
  const whatsappLink = `https://wa.me/1${business.phone.replace(/\D/g, "")}`;

  return (
    <div
      className="group block rounded-lg border border-border bg-white p-6 text-left transition-all hover:border-ink/20 hover:shadow-md"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-inkMuted">
          {business.categoryLabel}
        </span>
        <div className="flex items-center gap-2">
          {business.trustLevel === "verified" && (
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              Verified
            </span>
          )}
          {business.trustLevel === "user-claimed" && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              User-claimed
            </span>
          )}
        </div>
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink group-hover:text-accent">
        {business.name}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-inkMuted">
        {business.aiDescription || business.description}
      </p>
      {business.reviewSummary && (
        <p className="mt-2 text-xs text-inkSubtle italic">&quot;{business.reviewSummary}&quot;</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {business.accessibility?.map((a) => (
          <span key={a} className="rounded bg-cream px-2 py-0.5 text-xs text-inkMuted">
            {a.replace("-", " ")}
          </span>
        ))}
        {business.dietary?.map((d) => (
          <span key={d} className="rounded bg-cream px-2 py-0.5 text-xs text-inkMuted">
            {d}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-ink">{business.phone}</p>
      <p className="mt-1 text-xs text-inkSubtle">Last verified: {business.lastVerified}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={`tel:${business.phone}`}
          className="text-sm text-inkMuted hover:text-ink"
        >
          Call
        </a>
        <a href={smsLink} className="flex items-center gap-1 text-sm text-inkMuted hover:text-ink">
          <MessageCircle className="h-3.5 w-3.5" /> SMS
        </a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-inkMuted hover:text-ink">
          <Mail className="h-3.5 w-3.5" /> WhatsApp
        </a>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); toggleAlert(business.id); }}
          className="flex items-center gap-1 text-sm text-inkMuted hover:text-ink"
        >
          {subscribedAlerts.has(business.id) ? "Unsubscribe" : "Alert me"}
        </button>
      </div>
    </div>
  );
}
