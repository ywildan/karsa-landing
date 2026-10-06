import { useLanguage, type Language } from "../i18n/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div role="group" aria-label={t("Language")} className="inline-flex shrink-0 items-center rounded-lg border border-zinc-200 bg-white/90 p-0.5 font-mono text-[11px]">
      {(["en", "id"] as Language[]).map((value) => (
        <button
          key={value}
          type="button"
          lang={value}
          aria-label={value === "en" ? "English" : "Bahasa Indonesia"}
          aria-pressed={language === value}
          onClick={() => setLanguage(value)}
          className={`min-h-8 min-w-8 rounded-md px-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CF6A12] ${language === value ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
