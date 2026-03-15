import { useAppStore } from "../store/useAppStore";
import type { Language } from "../store/useAppStore";
import type { AccessibilityTag, DietaryTag } from "../data/businesses";

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    "browse by category": "browse by category",
    "Find exactly what you need in Upper Darby": "Find exactly what you need in Upper Darby",
    "local businesses": "local businesses",
    "for you": "for you",
    "smart collections": "smart collections",
  },
  es: {
    "browse by category": "explorar por categoría",
    "Find exactly what you need in Upper Darby": "Encuentra exactamente lo que necesitas en Upper Darby",
    "local businesses": "negocios locales",
    "for you": "para ti",
    "smart collections": "colecciones inteligentes",
  },
  zh: {
    "browse by category": "按类别浏览",
    "Find exactly what you need in Upper Darby": "在 Upper Darby 找到您需要的一切",
    "local businesses": "本地企业",
    "for you": "为您推荐",
    "smart collections": "精选合集",
  },
};

export function t(key: string, lang: Language): string {
  return TRANSLATIONS[lang]?.[key] ?? key;
}

export function AccessibilityBar() {
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-white px-4 py-3">
      <span className="text-sm text-inkMuted">Language:</span>
      {(["en", "es", "zh"] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
            language === lang ? "bg-ink text-cream" : "bg-cream text-inkMuted hover:bg-border/50"
          }`}
        >
          {lang === "en" ? "English" : lang === "es" ? "Español" : "中文"}
        </button>
      ))}
      <span className="text-sm text-inkMuted">·</span>
      <span className="text-sm text-inkMuted">
        Accessibility tags: wheelchair, quiet, parking, dietary on listings
      </span>
    </div>
  );
}

export function DietaryFilter({
  selected,
  onChange,
}: {
  selected: DietaryTag[];
  onChange: (tags: DietaryTag[]) => void;
}) {
  const options: DietaryTag[] = ["vegetarian", "vegan", "gluten-free", "halal", "kosher", "nut-free"];

  const toggle = (tag: DietaryTag) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm text-inkMuted">Dietary:</span>
      {options.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => toggle(tag)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            selected.includes(tag)
              ? "bg-ink text-cream"
              : "bg-cream text-inkMuted hover:bg-border/50"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export function AccessibilityFilter({
  selected,
  onChange,
}: {
  selected: AccessibilityTag[];
  onChange: (tags: AccessibilityTag[]) => void;
}) {
  const options: AccessibilityTag[] = ["wheelchair", "quiet", "low-sensory", "parking", "assistive-listening"];

  const toggle = (tag: AccessibilityTag) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm text-inkMuted">Accessibility:</span>
      {options.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => toggle(tag)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            selected.includes(tag)
              ? "bg-ink text-cream"
              : "bg-cream text-inkMuted hover:bg-border/50"
          }`}
        >
          {tag.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}
