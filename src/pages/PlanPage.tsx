import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgePercent,
  Check,
  Globe,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { LanguageToggle } from "../components/LanguageToggle";
import { LocalizedText } from "../i18n/LanguageContext";

const CONTACT_EMAIL = "yuwiaffa@gmail.com";
// TODO: isi nomor WhatsApp developer (format: 6281234567890). Kosong = tombol disembunyikan.
const WHATSAPP_NUMBER = "";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

function TierCard({
  name,
  price,
  priceNote,
  originalPrice,
  badge,
  features,
  cta,
  highlighted = false,
  dark = false,
}: {
  name: string;
  price: string;
  priceNote: string;
  originalPrice?: string;
  badge?: string;
  features: string[];
  cta: React.ReactNode;
  highlighted?: boolean;
  dark?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
        highlighted
          ? "border-[#CF6A12] bg-white shadow-[0_8px_40px_-12px_rgba(207,106,18,0.35)]"
          : dark
            ? "border-zinc-800 bg-zinc-950 text-white"
            : "border-zinc-200 bg-white"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[#CF6A12] px-3 py-1 text-[11px] font-semibold text-white">
          <BadgePercent className="h-3 w-3" />
          <LocalizedText>{badge}</LocalizedText>
        </span>
      )}
      <h2 className="font-serif text-2xl tracking-tight">
        <LocalizedText>{name}</LocalizedText>
      </h2>
      <div className="mt-3 flex items-baseline gap-2">
        {originalPrice && (
          <span className="text-lg text-zinc-400 line-through">
            <LocalizedText>{originalPrice}</LocalizedText>
          </span>
        )}
        <span className="font-serif text-4xl font-medium tracking-tight">
          <LocalizedText>{price}</LocalizedText>
        </span>
      </div>
      <p className={`mt-1 text-sm ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
        <LocalizedText>{priceNote}</LocalizedText>
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${highlighted || dark ? "text-[#CF6A12]" : "text-zinc-400"}`} />
            <span className={dark ? "text-zinc-300" : "text-zinc-700"}>
              <LocalizedText>{feature}</LocalizedText>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8">{cta}</div>
    </motion.div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div variants={fadeUp} className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 font-serif text-lg text-[#CF6A12]">
        {number}
      </div>
      <div>
        <h3 className="font-medium text-zinc-900">
          <LocalizedText>{title}</LocalizedText>
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">
          <LocalizedText>{description}</LocalizedText>
        </p>
      </div>
    </motion.div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <motion.details variants={fadeUp} className="group rounded-xl border border-zinc-200 bg-white px-5 py-4">
      <summary className="cursor-pointer list-none text-sm font-medium text-zinc-900">
        <LocalizedText>{question}</LocalizedText>
      </summary>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
        <LocalizedText>{answer}</LocalizedText>
      </p>
    </motion.details>
  );
}

export default function PlanPage() {
  const waLink = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya tertarik dengan Karsa Premium.")}`
    : null;

  return (
    <div className="min-h-dvh bg-[#FFFBF7] text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-950">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-serif text-2xl font-medium tracking-tight text-zinc-950">karsa</span>
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Hero */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
          <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-widest text-[#CF6A12]">
            <LocalizedText>Pricing</LocalizedText>
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            <LocalizedText>Simple plans for focused learning</LocalizedText>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            <LocalizedText>
              Karsa Mobile is free for students. Premium unlocks daily web search for Teman Baca — answers grounded in the latest sources, not just the article.
            </LocalizedText>
          </motion.p>
        </motion.div>

        {/* Tiers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2"
        >
          <TierCard
            name="Free"
            price="Rp 0"
            priceNote="Free forever for students"
            features={[
              "Teman Baca: article summaries",
              "Ask about the material (5x/day)",
              "Web search: 3x per month",
            ]}
            cta={
              <span className="block rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-center text-sm font-medium text-zinc-500">
                <LocalizedText>Current plan</LocalizedText>
              </span>
            }
          />
          <TierCard
            name="Premium"
            price="Rp 15.000"
            priceNote="per semester (±6 months)"
            originalPrice="Rp 20.000"
            badge="Introductory price"
            highlighted
            features={[
              "Everything in Free",
              "Web search: 3x per day",
              "Answers with tappable web sources",
              "Priority support",
            ]}
            cta={
              <div className="flex flex-col gap-2">
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CF6A12] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#b55d0f]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <LocalizedText>Chat via WhatsApp</LocalizedText>
                  </a>
                )}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Karsa Premium")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
                >
                  <Mail className="h-4 w-4" />
                  <LocalizedText>Email us</LocalizedText>
                </a>
              </div>
            }
          />
        </motion.div>

        {/* How to upgrade */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto mt-16 max-w-3xl"
        >
          <motion.h2 variants={fadeUp} className="font-serif text-3xl tracking-tight">
            <LocalizedText>How to get Premium</LocalizedText>
          </motion.h2>
          <div className="mt-8 space-y-6">
            <Step
              number="1"
              title="Contact us"
              description="Chat via WhatsApp or send an email. Tell us your name, NIM, and class."
            />
            <Step
              number="2"
              title="Pay manually"
              description="Transfer or QRIS — we will send the payment details after you contact us."
            />
            <Step
              number="3"
              title="Activated within 24 hours"
              description="Your account will be upgraded to Premium for one semester after payment is confirmed."
            />
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto mt-16 max-w-3xl"
        >
          <motion.h2 variants={fadeUp} className="font-serif text-3xl tracking-tight">
            <LocalizedText>Frequently asked questions</LocalizedText>
          </motion.h2>
          <div className="mt-8 space-y-3">
            <FaqItem
              question="What is web search in Teman Baca?"
              answer="Tap the globe icon in Teman Baca chat and the AI will also search the web for the latest information — useful for topics that change, like regulations. Answers include tappable source links."
            />
            <FaqItem
              question="When does the quota reset?"
              answer="Free web search quota (3x) resets on the 1st of each month. Premium quota (3x/day) resets every midnight (WIB)."
            />
            <FaqItem
              question="Is Premium per semester?"
              answer="Yes — one payment covers about 6 months. The Rp 15.000 price is an introductory price for our first faculty."
            />
            <FaqItem
              question="Can I get a refund?"
              answer="Contact us within 7 days of payment if Premium was never activated or is not working for you."
            />
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto mt-16 max-w-3xl text-center text-xs leading-relaxed text-zinc-500"
        >
          <LocalizedText>
            Prices and quotas may change as the pilot grows. Active Premium users keep their current terms until the semester ends.
          </LocalizedText>
        </motion.p>

        {/* Feature icons row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-8 text-zinc-400"
        >
          {[
            { icon: Sparkles, label: "AI summaries" },
            { icon: Globe, label: "Web search" },
            { icon: MessageCircle, label: "Q&A" },
          ].map(({ icon: Icon, label }) => (
            <motion.div key={label} variants={fadeUp} className="flex items-center gap-2 text-xs">
              <Icon className="h-4 w-4" />
              <LocalizedText>{label}</LocalizedText>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
