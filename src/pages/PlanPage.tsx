import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  BadgePercent,
  Check,
  Globe,
  Mail,
  MessageCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { LanguageToggle } from "../components/LanguageToggle";
import { Tilt } from "../components/fx/Tilt";
import { LocalizedText } from "../i18n/LanguageContext";

const CONTACT_EMAIL = "yuwiaffa@gmail.com";
// TODO: isi nomor WhatsApp developer (format: 6281234567890). Kosong = tombol disembunyikan.
const WHATSAPP_NUMBER = "";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const revealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

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
    <div
      className={`relative flex h-full flex-col rounded-3xl border p-6 sm:p-8 ${
        highlighted
          ? "depth-dark border-zinc-800 bg-[#0A0A0A] text-white"
          : dark
            ? "depth-md border-zinc-800 bg-zinc-950 text-white"
            : "depth-md border-zinc-200 bg-white"
      }`}
    >
      {highlighted && (
        <div aria-hidden="true" className="dot-grid-dark pointer-events-none absolute inset-0 rounded-3xl opacity-50" />
      )}
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1 rounded-full bg-[#CF6A12] px-3 py-1 text-[11px] font-semibold text-white shadow-[0_10px_24px_-8px_rgba(207,106,18,0.7)]"
        >
          <BadgePercent className="h-3 w-3" />
          <LocalizedText>{badge}</LocalizedText>
        </motion.span>
      )}
      <div className="relative">
        <h2 className="font-serif text-2xl tracking-tight">
          <LocalizedText>{name}</LocalizedText>
        </h2>
        <div className="mt-3 flex items-baseline gap-2">
          {originalPrice && (
            <span className={`text-lg line-through ${highlighted ? "text-zinc-500" : "text-zinc-400"}`}>
              <LocalizedText>{originalPrice}</LocalizedText>
            </span>
          )}
          <span className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            <LocalizedText>{price}</LocalizedText>
          </span>
        </div>
        <p className={`mt-1 text-sm ${highlighted || dark ? "text-zinc-400" : "text-zinc-500"}`}>
          <LocalizedText>{priceNote}</LocalizedText>
        </p>
      </div>
      <ul className="relative mt-6 flex-1 space-y-3">
        {features.map((feature, i) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: EASE }}
            className="flex items-start gap-2.5 text-sm"
          >
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${highlighted ? "bg-[#CF6A12]/20" : dark ? "bg-white/10" : "bg-[#FBF4EE]"}`}>
              <Check className="h-3.5 w-3.5 text-[#CF6A12]" />
            </span>
            <span className={highlighted || dark ? "text-zinc-300" : "text-zinc-700"}>
              <LocalizedText>{feature}</LocalizedText>
            </span>
          </motion.li>
        ))}
      </ul>
      <div className="relative mt-8">{cta}</div>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div {...revealProps()} className="group flex gap-4">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="depth-sm flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBF4EE] font-serif text-lg text-[#CF6A12] transition-colors group-hover:bg-[#CF6A12] group-hover:text-white"
      >
        {number}
      </motion.div>
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

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      {...revealProps()}
      className={`rounded-2xl border bg-white px-5 transition-all duration-300 ${
        open
          ? "depth-md border-[#CF6A12]/40 py-4"
          : "depth-sm border-zinc-200 py-4 hover:border-zinc-300"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-sm font-medium text-zinc-900">
          <LocalizedText>{question}</LocalizedText>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
            open ? "bg-[#CF6A12] text-white" : "bg-zinc-100 text-zinc-500"
          }`}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pt-2 text-sm leading-relaxed text-zinc-600">
              <LocalizedText>{answer}</LocalizedText>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const FAQS = [
  {
    question: "What is web search in Teman Baca?",
    answer:
      "Tap the globe icon in Teman Baca chat and the AI will also search the web for the latest information — useful for topics that change, like regulations. Answers include tappable source links.",
  },
  {
    question: "When does the quota reset?",
    answer:
      "Free web search quota (3x) resets on the 1st of each month. Premium quota (3x/day) resets every midnight (WIB).",
  },
  {
    question: "Is Premium billed monthly?",
    answer:
      "Yes — Premium is billed monthly. The Rp 15.000 price is an introductory price for our first faculty.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Contact us within 7 days of payment if Premium was never activated or is not working for you.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="mx-auto mt-20 max-w-3xl sm:mt-24">
      <motion.h2 {...revealProps()} className="font-serif text-3xl tracking-tight text-zinc-950 sm:text-4xl">
        <LocalizedText>Frequently asked questions</LocalizedText>
      </motion.h2>
      <div className="mt-8 space-y-3">
        {FAQS.map((faq, i) => (
          <FaqItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function PlanPage() {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  // Lenis smooth scroll, like the landing page
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Parallax on mouse move (hero cards)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });
  const cardsX = useTransform(smoothX, [-300, 300], [-7, 7]);
  const cardsY = useTransform(smoothY, [-300, 300], [-5, 5]);
  const cardsTransform = useMotionTemplate`translate3d(${cardsX}px, ${cardsY}px, 0)`;

  useEffect(() => {
    setMounted(true);
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, reduceMotion]);

  const waLink = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya tertarik dengan Karsa Premium.")}`
    : null;

  return (
    <div className="min-h-dvh bg-[#FAFAFA] font-sans text-zinc-900 antialiased selection:bg-[#CF6A12] selection:text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="glass-light sticky top-0 z-40 border-b border-zinc-200/80"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-950">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-serif text-2xl font-medium tracking-tight text-zinc-950">karsa</span>
          </Link>
          <LanguageToggle />
        </div>
      </motion.header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-200/60">
          <div aria-hidden="true" className="dot-grid-light absolute inset-0" />
          <div aria-hidden="true" className="glow-orange absolute -top-40 left-1/2 h-96 w-[42rem] max-w-none -translate-x-1/2 rounded-full opacity-60 blur-3xl" />
          {/* Editorial grid guides */}
          <div className="pointer-events-none absolute inset-0 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid h-full grid-cols-12 gap-8 border-x border-zinc-200/40 opacity-40">
              <div className="col-span-6 hidden border-r border-zinc-200/40 lg:block" />
              <div className="col-span-6 hidden lg:block" />
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <motion.div
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              variants={containerVariants}
              className="text-center"
            >
              <motion.div variants={itemVariants} className="depth-sm mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
                <LocalizedText>Pricing</LocalizedText>
              </motion.div>
              <motion.h1 variants={itemVariants} className="font-serif text-4xl tracking-tight text-zinc-950 sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
                <LocalizedText>Simple plans for focused learning</LocalizedText>
              </motion.h1>
              <motion.p variants={itemVariants} className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                <LocalizedText>
                  Karsa Mobile is free for students. Premium unlocks daily web search for Teman Baca — answers grounded in the latest sources, not just the article.
                </LocalizedText>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Tiers */}
        <section className="relative overflow-hidden">
          {/* Giant watermark, like the landing's CTA section */}
          <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center overflow-hidden" aria-hidden>
            <span className="select-none font-serif text-[180px] font-normal leading-none text-zinc-950/[0.03] sm:text-[280px]">
              paket
            </span>
          </div>

          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <motion.div style={{ transform: reduceMotion ? undefined : cardsTransform }}>
                <div className="perspective-1200 mx-auto grid max-w-4xl items-stretch gap-6 md:grid-cols-2 md:gap-8">
                  <Tilt max={3} className="h-full">
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
                        <span className="block rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-center text-sm font-medium text-zinc-500">
                          <LocalizedText>Current plan</LocalizedText>
                        </span>
                      }
                    />
                  </Tilt>
                  <Tilt max={3} className="h-full">
                    <TierCard
                      name="Premium"
                      price="Rp 15.000"
                      priceNote="per month"
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
                            <motion.a
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#CF6A12] px-4 py-2.5 text-sm font-medium text-white shadow-[0_14px_30px_-10px_rgba(207,106,18,0.65)] transition-colors hover:bg-[#B85B0D]"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <LocalizedText>Chat via WhatsApp</LocalizedText>
                            </motion.a>
                          )}
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Karsa Premium")}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                          >
                            <Mail className="h-4 w-4" />
                            <LocalizedText>Email us</LocalizedText>
                          </motion.a>
                        </div>
                      }
                    />
                  </Tilt>
                </div>
              </motion.div>
            </motion.div>

            {/* How to upgrade */}
            <div className="mx-auto mt-20 max-w-3xl sm:mt-24">
              <motion.h2 {...revealProps()} className="font-serif text-3xl tracking-tight text-zinc-950 sm:text-4xl">
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
                  description="Your account will be upgraded to Premium for one month after payment is confirmed."
                />
              </div>
            </div>

            {/* FAQ */}
            <FaqSection />

            {/* Footnote */}
            <motion.p
              {...revealProps()}
              className="mx-auto mt-16 max-w-3xl text-center text-xs leading-relaxed text-zinc-500"
            >
              <LocalizedText>
                Prices and quotas may change as the pilot grows. Active Premium users keep their current terms until the current billing period ends.
              </LocalizedText>
            </motion.p>

            {/* Feature icons row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-8 text-zinc-400"
            >
              {[
                { icon: Sparkles, label: "AI summaries" },
                { icon: Globe, label: "Web search" },
                { icon: MessageCircle, label: "Q&A" },
              ].map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                  whileHover={{ y: -3, color: "#CF6A12" }}
                  className="flex items-center gap-2 text-xs"
                >
                  <Icon className="h-4 w-4" />
                  <LocalizedText>{label}</LocalizedText>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
