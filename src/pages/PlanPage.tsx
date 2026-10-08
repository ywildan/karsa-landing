import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import {
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
  Sparkles,
} from "lucide-react";
import { LanguageToggle } from "../components/LanguageToggle";
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
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
        highlighted
          ? "border-[#CF6A12] bg-white shadow-[0_8px_40px_-12px_rgba(207,106,18,0.35)]"
          : dark
            ? "border-zinc-800 bg-zinc-950 text-white"
            : "border-zinc-200 bg-white"
      }`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[#CF6A12] px-3 py-1 text-[11px] font-semibold text-white"
        >
          <BadgePercent className="h-3 w-3" />
          <LocalizedText>{badge}</LocalizedText>
        </motion.span>
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
        {features.map((feature, i) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: EASE }}
            className="flex items-start gap-2.5 text-sm"
          >
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${highlighted || dark ? "text-[#CF6A12]" : "text-zinc-400"}`} />
            <span className={dark ? "text-zinc-300" : "text-zinc-700"}>
              <LocalizedText>{feature}</LocalizedText>
            </span>
          </motion.li>
        ))}
      </ul>
      <div className="mt-8">{cta}</div>
    </motion.div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div {...revealProps()} className="group flex gap-4">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 font-serif text-lg text-[#CF6A12] transition-colors group-hover:bg-[#CF6A12] group-hover:text-white"
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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <motion.details
      {...revealProps()}
      className="group rounded-xl border border-zinc-200 bg-white px-5 py-4 transition-colors open:border-[#CF6A12]/40 open:shadow-[0_4px_24px_-8px_rgba(207,106,18,0.25)]"
    >
      <summary className="cursor-pointer list-none text-sm font-medium text-zinc-900 [&::-webkit-details-marker]:hidden">
        <LocalizedText>{question}</LocalizedText>
      </summary>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-2 text-sm leading-relaxed text-zinc-600"
      >
        <LocalizedText>{answer}</LocalizedText>
      </motion.p>
    </motion.details>
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
    <div className="min-h-dvh bg-[#FFFBF7] text-zinc-900 selection:bg-[#CF6A12] selection:text-white font-sans antialiased">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="border-b border-zinc-200/80 bg-white/85 backdrop-blur-md"
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
          {/* Editorial grid guides */}
          <div className="pointer-events-none absolute inset-0 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid h-full grid-cols-12 gap-8 border-x border-zinc-200/40 opacity-40">
              <div className="col-span-6 hidden border-r border-zinc-200/40 lg:block" />
              <div className="col-span-6 hidden lg:block" />
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <motion.div
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              variants={containerVariants}
              className="text-center"
            >
              <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-zinc-600 shadow-2xs">
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
            <span className="font-serif text-[180px] font-normal leading-none text-zinc-950/[0.03] sm:text-[280px] select-none">
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
                <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
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
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CF6A12] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#b55d0f]"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <LocalizedText>Chat via WhatsApp</LocalizedText>
                          </motion.a>
                        )}
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Karsa Premium")}`}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
                        >
                          <Mail className="h-4 w-4" />
                          <LocalizedText>Email us</LocalizedText>
                        </motion.a>
                      </div>
                    }
                  />
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
                  description="Your account will be upgraded to Premium for one semester after payment is confirmed."
                />
              </div>
            </div>

            {/* FAQ */}
            <div className="mx-auto mt-20 max-w-3xl sm:mt-24">
              <motion.h2 {...revealProps()} className="font-serif text-3xl tracking-tight text-zinc-950 sm:text-4xl">
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
            </div>

            {/* Footnote */}
            <motion.p
              {...revealProps()}
              className="mx-auto mt-16 max-w-3xl text-center text-xs leading-relaxed text-zinc-500"
            >
              <LocalizedText>
                Prices and quotas may change as the pilot grows. Active Premium users keep their current terms until the semester ends.
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
