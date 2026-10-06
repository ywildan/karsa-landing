import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLanguage, type Language } from "../i18n/LanguageContext";

const languages: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "id", label: "Bahasa Indonesia" },
];

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    selectedRef.current?.focus();

    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${t("Language")}: ${language === "en" ? "English" : "Bahasa Indonesia"}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((previous) => !previous)}
        className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-2 font-mono text-[11px] font-medium tracking-wide transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CF6A12] ${open ? "bg-[#CF6A12]/[0.07] text-[#CF6A12]" : "text-zinc-500 hover:bg-zinc-100/70 hover:text-zinc-900"}`}
      >
        <Globe2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
        <span>{language.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 text-zinc-400 transition-transform duration-150 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={t("Language")}
          className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-[0_4px_8px_-4px_rgba(24,24,27,0.08),0_12px_32px_-8px_rgba(24,24,27,0.14)]"
        >
          <div className="px-3 pb-2 pt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-400">
            {t("Language")}
          </div>
          {languages.map(({ value, label }) => (
            <button
              key={value}
              ref={language === value ? selectedRef : undefined}
              type="button"
              lang={value}
              aria-pressed={language === value}
              onClick={() => {
                setLanguage(value);
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 text-left font-sans text-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#CF6A12] ${language === value ? "bg-[#CF6A12]/[0.06] font-medium text-[#CF6A12]" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}`}
            >
              <span>{label}</span>
              {language === value && <Check className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
