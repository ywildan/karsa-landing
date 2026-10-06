import { LanguageToggle } from "../components/LanguageToggle";
import { LocalizedText, useLanguage } from "../i18n/LanguageContext";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  FileClock,
  Menu,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";

type GithubAsset = {
  name: string;
  browser_download_url: string;
  size: number;
  digest?: string | null;
};

type GithubRelease = {
  id: number;
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  body: string | null;
  assets: GithubAsset[];
};

type MobileRelease = GithubRelease & { apk: GithubAsset };

const RELEASES_API = "https://api.github.com/repos/ywildan/karsa/releases?per_page=100";
const RELEASES_URL = "https://github.com/ywildan/karsa/releases";
const ease = [0.22, 1, 0.36, 1] as const;

function formatDate(value: string | null, language: "en" | "id") {
  if (!value) return "Tanggal belum tersedia";
  return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function version(release: MobileRelease) {
  return release.tag_name.replace(/^karsa-v/i, "v");
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(18px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduceMotion ? 0.2 : 0.6, delay: reduceMotion ? 0 : delay, ease }}
    >
      <LocalizedText>{children}</LocalizedText>
    </motion.div>
  );
}

function DownloadLink({ release, prominent = false }: { release: MobileRelease; prominent?: boolean }) {
  const { t } = useLanguage();
  return (
    <a
      href={release.apk.browser_download_url}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg px-5 text-sm font-medium text-white transition-[background-color,transform,box-shadow] duration-150 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CF6A12] ${
        prominent
          ? "bg-[#CF6A12] shadow-[0_8px_20px_rgba(207,106,18,0.18)] hover:bg-[#B85B0D]"
          : "bg-white text-zinc-950 hover:bg-orange-50"
      }`}
      aria-label={t(`Unduh Karsa Mobile ${version(release)} untuk Android`)}
    >
      <Download className="h-4 w-4" aria-hidden="true" /><LocalizedText>
      Unduh APK <LocalizedText></LocalizedText>{prominent ? "terbaru" : ""}</LocalizedText>
    </a>
  );
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*)|(https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1]) {
      parts.push(
        <strong key={`${keyPrefix}-b${key++}`} className="font-semibold text-zinc-900">
          <LocalizedText>{match[1].slice(2, -2)}</LocalizedText>
        </strong>
      );
    } else {
      const url = match[2];
      const prMatch = url.match(/\/pull\/(\d+)/);
      const label = prMatch ? `#${prMatch[1]}` : url.replace(/^https?:\/\/(www\.)?/, "");
      parts.push(
        <a
          key={`${keyPrefix}-a${key++}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#CF6A12] underline decoration-[#CF6A12]/40 underline-offset-2 hover:decoration-[#CF6A12]"
        >
          <LocalizedText>{label}</LocalizedText>
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function ReleaseNotes({ body }: { body: string | null }) {
  const { t } = useLanguage();
  if (!body || !body.trim()) return null;

  const blocks: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(
        <ul key={`notes-ul-${blocks.length}`} className="mt-4 space-y-2.5">
          <LocalizedText>{listItems}</LocalizedText>
        </ul>
      );
      listItems = [];
    }
  };

  body.split("\n").forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) return;
    if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h4 key={`notes-h-${index}`} className="font-serif text-xl tracking-tight text-zinc-950">
          <LocalizedText>{renderInline(line.slice(3), `h${index}`)}</LocalizedText>
        </h4>
      );
    } else if (line.startsWith("* ") || line.startsWith("- ")) {
      listItems.push(
        <li key={`notes-li-${index}`} className="flex gap-2.5 text-sm leading-6 text-zinc-600">
          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#CF6A12]" aria-hidden="true" />
          <span><LocalizedText>{renderInline(line.slice(2), `li${index}`)}</LocalizedText></span>
        </li>
      );
    } else {
      flushList();
      blocks.push(
        <p key={`notes-p-${index}`} className="mt-4 text-sm leading-7 text-zinc-600">
          <LocalizedText>{renderInline(line, `p${index}`)}</LocalizedText>
        </p>
      );
    }
  });
  flushList();
  if (blocks.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10">
      <div className="font-mono text-[11px] uppercase tracking-widest text-[#CF6A12]"><LocalizedText>Catatan rilis</LocalizedText></div>
      <h3 className="mt-3 font-serif text-3xl tracking-tight text-zinc-950 sm:text-4xl"><LocalizedText>Yang berubah di versi ini.</LocalizedText></h3>
      <div className="mt-6 border-t border-zinc-100 pt-6"><LocalizedText>{blocks}</LocalizedText></div>
    </div>
  );
}

const FAQS: [string, string][] = [
  ["Haruskah menghapus aplikasi lama sebelum memperbarui?", "Biasanya tidak. APK baru bisa memperbarui aplikasi lama jika identitas paket dan kunci penandatanganannya sama. Gunakan rilis resmi."],
  ["Apakah versi lama masih tersedia?", "Jika sudah pernah diterbitkan sebagai rilis GitHub dengan APK, versi lama akan muncul di bagian arsip."],
  ["Apakah unduhan membutuhkan akun Karsa?", "Tidak. Halaman ini terbuka untuk umum. Akun mahasiswa UNTIDAR diperlukan saat menggunakan aplikasi."],
  ["Bagaimana memastikan APK tidak berubah?", "Lihat sumber rilis resmi dan, jika tersedia, bandingkan checksum SHA-256 berkas yang diunduh."],
  ["Apakah tersedia untuk iPhone (iOS)?", "Belum. Karsa dibangun dengan Flutter sehingga versi iOS secara teknis sudah siap, tetapi tayang di App Store mewajibkan keanggotaan Apple Developer Program seharga $99 per tahun (sekitar Rp1,6 juta) serta perangkat Apple untuk pengujian. Selama kendala biaya dan perangkat ini belum teratasi, Karsa Mobile tersedia untuk Android."],
];

function FaqItem({ index, question, answer, open, onToggle }: { index: number; question: string; answer: string; open: boolean; onToggle: () => void }) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <div className="py-5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-button-${index}`}
        className="flex w-full cursor-pointer items-center justify-between gap-5 text-left text-sm font-medium text-zinc-900"
      >
        <span><LocalizedText>{question}</LocalizedText></span>
        <span className={`text-xl text-[#CF6A12] transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-xl pt-3 text-xs leading-7 text-zinc-500"><LocalizedText>{answer}</LocalizedText></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PhonePreview() {
  const { t } = useLanguage();
  return (
    <div className="relative mx-auto w-full max-w-[430px] select-none" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif text-[350px] leading-none text-zinc-900/[0.035]"><LocalizedText>K</LocalizedText></div>
      <div className="relative mx-auto w-[245px] rounded-[36px] border-[7px] border-zinc-900 bg-zinc-950 p-[5px] shadow-[0_28px_70px_rgba(22,22,25,0.22)] sm:w-[270px]">
        <div className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-zinc-950" />
        <div className="overflow-hidden rounded-[25px] bg-[#FAFAFA]">
          <div className="bg-[#CF6A12] px-5 pb-7 pt-12 text-white">
            <div className="font-serif text-2xl"><LocalizedText>karsa</LocalizedText></div>
            <div className="mt-7 text-[11px] text-orange-100"><LocalizedText>Selamat datang kembali,</LocalizedText></div>
            <div className="mt-1 text-sm font-semibold"><LocalizedText>Mahasiswa UNTIDAR</LocalizedText></div>
          </div>
          <div className="min-h-[342px] space-y-3 px-4 py-5">
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70">
              <div className="font-mono text-[9px] tracking-widest text-zinc-500"><LocalizedText>POIN KEAKTIFAN</LocalizedText></div>
              <div className="mt-1 flex items-center justify-between text-zinc-900"><strong className="font-serif text-4xl font-normal">24</strong><span className="text-sm text-[#CF6A12]">↗</span></div>
              <div className="text-[10px] text-zinc-400"><LocalizedText>Semester ini</LocalizedText></div>
            </div>
            <div className="flex justify-between pt-2 text-[11px] font-semibold text-zinc-900"><span><LocalizedText>Ruang kelas</LocalizedText></span><span className="font-mono text-[9px] text-[#CF6A12]"><LocalizedText>LIHAT SEMUA →</LocalizedText></span></div>
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-zinc-200/70"><span className="rounded-md bg-orange-50 p-2 text-[#CF6A12]">◈</span><span className="flex-1"><strong className="block text-[10px]"><LocalizedText>Akuntansi Perpajakan</LocalizedText></strong><small className="text-[9px] text-zinc-400"><LocalizedText>Aktivitas terbaru</LocalizedText></small></span><span className="text-xs text-[#CF6A12]">+4</span></div>
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-zinc-200/70"><span className="rounded-md bg-orange-50 p-2 text-[#CF6A12]">✦</span><span className="flex-1"><strong className="block text-[10px]"><LocalizedText>Karsa Lib</LocalizedText></strong><small className="text-[9px] text-zinc-400"><LocalizedText>Tulisan dari prodimu</LocalizedText></small></span><span className="text-xs text-[#CF6A12]">↗</span></div>
          </div>
          <div className="flex justify-around border-t border-zinc-100 bg-white px-2 py-3 text-[9px] text-zinc-400"><strong className="text-[#CF6A12]"><LocalizedText>Beranda</LocalizedText></strong><span><LocalizedText>Grup</LocalizedText></span><span><LocalizedText>Karsa Lib</LocalizedText></span><span><LocalizedText>Profil</LocalizedText></span></div>
        </div>
      </div>
      <div className="absolute -left-1 top-[15%] hidden items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-[10px] text-zinc-600 shadow-md sm:flex"><ShieldCheck className="h-3.5 w-3.5 text-[#CF6A12]" /><LocalizedText>Rilis resmi Karsa</LocalizedText></div>
      <div className="absolute -right-1 bottom-[13%] hidden items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-[10px] text-zinc-600 shadow-md sm:flex"><Smartphone className="h-3.5 w-3.5 text-[#CF6A12]" /><LocalizedText>Satu aplikasi, banyak kegiatan</LocalizedText></div>
    </div>
  );
}

export default function DownloadPage() {
  const { t, language } = useLanguage();
  const [releases, setReleases] = useState<MobileRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const latest = releases[0];

  useEffect(() => {
    const controller = new AbortController();

    fetch(RELEASES_API, { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub releases: ${response.status}`);
        return response.json() as Promise<GithubRelease[]>;
      })
      .then((items) => {
        const mobileReleases = items
          .filter((item) => !item.draft && !item.prerelease && /^karsa-v/i.test(item.tag_name))
          .map((item) => ({ ...item, apk: item.assets.find((asset) => asset.name.toLowerCase().endsWith(".apk")) }))
          .filter((item): item is MobileRelease => Boolean(item.apk))
          .sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime());
        setReleases(mobileReleases);
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name === "AbortError") return;
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900 antialiased selection:bg-[#CF6A12] selection:text-white">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200/80 bg-[#FAFAFA]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-baseline gap-2" aria-label={t("Karsa, kembali ke beranda")}><span className="font-serif text-2xl text-zinc-950"><LocalizedText>karsa</LocalizedText></span><span className="hidden font-mono text-[10px] uppercase tracking-widest text-zinc-400 sm:inline"><LocalizedText>UNTIDAR</LocalizedText></span></Link>
          <nav className="hidden items-center gap-8 text-xs font-medium text-zinc-600 md:flex" aria-label={t("Navigasi halaman unduhan")}><Link to="/" className="hover:text-[#CF6A12]"><LocalizedText>Beranda</LocalizedText></Link><a href="#rilis" className="hover:text-[#CF6A12]"><LocalizedText>Rilis terbaru</LocalizedText></a><a href="#arsip" className="hover:text-[#CF6A12]"><LocalizedText>Versi lama</LocalizedText></a><a href="#panduan" className="hover:text-[#CF6A12]"><LocalizedText>Panduan</LocalizedText></a></nav>
          <div className="flex items-center gap-2"><LanguageToggle /><a href="https://www.sikarsa.id/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white hover:bg-zinc-800"><LocalizedText>Sign in </LocalizedText><ArrowUpRight className="h-3.5 w-3.5" /></a><button type="button" onClick={() => setMenuOpen(!menuOpen)} className="rounded-md p-2 text-zinc-700 md:hidden" aria-label={t(menuOpen ? "Tutup menu" : "Buka menu")} aria-expanded={menuOpen}>{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div>
        </div>
        {menuOpen && <nav className="border-t border-zinc-200 bg-white px-5 py-3 text-sm md:hidden" aria-label={t("Navigasi seluler")}>{[["Beranda", "/"], ["Rilis terbaru", "#rilis"], ["Versi lama", "#arsip"], ["Panduan", "#panduan"]].map(([label, href]) => href.startsWith("#") ? <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block rounded px-2 py-2.5 text-zinc-700"><LocalizedText>{label}</LocalizedText></a> : <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="block rounded px-2 py-2.5 text-zinc-700"><LocalizedText>{label}</LocalizedText></Link>)}</nav>}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-zinc-200/70 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="pointer-events-none absolute inset-0 mx-auto grid max-w-7xl grid-cols-12 border-x border-zinc-200/30" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index} className="border-r border-zinc-200/20" />)}</div>
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
            <div>
              <Reveal><div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" /><LocalizedText>KARSA / ANDROID APP</LocalizedText></div></Reveal>
              <Reveal delay={0.08}><h1 className="mt-6 font-serif text-[clamp(4.2rem,8vw,7.5rem)] leading-[.9] tracking-[-.045em] text-zinc-950"><LocalizedText>Bawa Karsa</LocalizedText><br /><LocalizedText>ke </LocalizedText><em className="text-[#CF6A12]"><LocalizedText>kelasmu.</LocalizedText></em></h1></Reveal>
              <Reveal delay={0.16}><p className="mt-7 max-w-lg text-base leading-8 text-zinc-600"><LocalizedText>Catat partisipasi, pantau aktivitas, dan temukan tulisan mahasiswa dalam satu aplikasi. Unduh Karsa Mobile dari rilis resmi proyek.</LocalizedText></p></Reveal>
              <Reveal delay={0.24}><div className="mt-8 flex flex-wrap items-center gap-5">{latest ? <DownloadLink release={latest} prominent /> : <a href="#rilis" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#CF6A12] px-5 text-sm font-medium text-white"><LocalizedText>Lihat status rilis </LocalizedText><ArrowDown className="h-4 w-4" /></a>}<span className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2.5 rounded-lg border border-zinc-200 bg-white/70 px-5 text-sm font-medium text-zinc-400" aria-disabled="true" title={t("Versi iOS sedang disiapkan")}><Smartphone className="h-4 w-4" aria-hidden="true" /><LocalizedText>App Store · Segera hadir</LocalizedText></span><a href="#rilis" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-[#CF6A12]"><LocalizedText>Lihat detail rilis </LocalizedText><ArrowDown className="h-4 w-4" /></a></div><div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] text-zinc-500"><span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#CF6A12]" /><LocalizedText>APK dari rilis GitHub</LocalizedText></span><span><LocalizedText>Android</LocalizedText></span><span><LocalizedText>Tanpa login untuk mengunduh</LocalizedText></span></div></Reveal>
            </div>
            <Reveal delay={0.18}><PhonePreview /></Reveal>
          </div>
        </section>

        <section className="border-b border-zinc-200/70 bg-white py-6"><div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">{[[ShieldCheck, "Sumber resmi", "APK dari rilis proyek Karsa"], [FileClock, "Riwayat versi", "Pembaruan terdokumentasi"], [Smartphone, "Android", "Satu aplikasi untuk kelas dan Karsa Lib"]].map(([Icon, title, detail]) => { const IconComponent = Icon as typeof ShieldCheck; return <div key={title as string} className="flex items-center gap-3"><IconComponent className="h-5 w-5 text-[#CF6A12]" /><div><strong className="block text-xs text-zinc-900"><LocalizedText>{title as string}</LocalizedText></strong><span className="text-[11px] text-zinc-500"><LocalizedText>{detail as string}</LocalizedText></span></div></div>; })}</div></section>

        <section id="rilis" className="scroll-mt-20 py-24 lg:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Reveal><div className="font-mono text-[11px] uppercase tracking-widest text-[#CF6A12]"><LocalizedText>01 / RILIS TERBARU</LocalizedText></div><h2 className="mt-3 font-serif text-5xl leading-none tracking-tight text-zinc-950 sm:text-6xl"><LocalizedText>Versi yang siap dipakai.</LocalizedText></h2><p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500"><LocalizedText>Gunakan rilis terbaru untuk fitur dan perbaikan Karsa Mobile yang paling lengkap.</LocalizedText></p></Reveal>
          {loading ? <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-10 text-sm text-zinc-500" role="status"><LocalizedText>Memuat rilis resmi...</LocalizedText></div> : latest ? <Reveal delay={0.08}><div className="mt-8 grid overflow-hidden rounded-2xl bg-[#101012] text-white shadow-[0_20px_50px_rgba(20,20,25,0.15)] lg:grid-cols-[1.25fr_.75fr]"><div className="p-8 sm:p-10"><span className="inline-flex items-center gap-2 rounded border border-[#654226] bg-[#332215] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-orange-200"><span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" /><LocalizedText>Recommended release</LocalizedText></span><h3 className="mt-6 font-serif text-6xl leading-none tracking-tight sm:text-7xl"><LocalizedText>Karsa <LocalizedText></LocalizedText>{version(latest)}</LocalizedText></h3><p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400"><LocalizedText>Rilis Android terbaru yang tersedia dari proyek Karsa. Detail perubahan dan aset lengkap dapat dilihat di halaman rilis GitHub.</LocalizedText></p><div className="mt-7 flex flex-wrap items-center gap-4"><DownloadLink release={latest} prominent /><span className="font-mono text-xs text-zinc-400"><LocalizedText>{formatSize(latest.apk.size)}<LocalizedText></LocalizedText> · APK Android</LocalizedText></span></div><a href={latest.html_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"><LocalizedText>Lihat catatan rilis </LocalizedText><ArrowUpRight className="h-3.5 w-3.5" /></a></div><div className="border-t border-white/10 bg-white/[0.035] p-8 sm:p-10 lg:border-l lg:border-t-0"><dl className="space-y-5">{[["Platform", "Android"], ["Versi", version(latest)], ["Dirilis", formatDate(latest.published_at, language)], ["Ukuran APK", formatSize(latest.apk.size)]].map(([label, value]) => <div key={label} className="flex justify-between gap-5 border-b border-white/10 pb-4 text-sm"><dt className="text-zinc-500"><LocalizedText>{label}</LocalizedText></dt><dd className="text-right text-zinc-200"><LocalizedText>{value}</LocalizedText></dd></div>)}</dl><div className="mt-6 flex gap-3 rounded-lg border border-white/10 p-4 text-xs leading-6 text-zinc-400"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#CF6A12]" /><span>{latest.apk.digest?.startsWith("sha256:") ? <><LocalizedText>SHA-256: </LocalizedText><code className="break-all text-[10px] text-zinc-200"><LocalizedText>{latest.apk.digest.slice(7)}</LocalizedText></code></> : "Unduh hanya dari tautan rilis resmi. Periksa sumber berkas sebelum memasang APK."}</span></div></div></div><ReleaseNotes body={latest.body} /></Reveal> : <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-sm leading-7 text-zinc-700"><strong className="block text-base text-zinc-900"><LocalizedText>{error ? "Rilis belum bisa dimuat" : "Belum ada APK publik"}</LocalizedText></strong><span><LocalizedText>{error ? "Koneksi ke daftar rilis GitHub sedang bermasalah. Coba buka halaman rilis proyek secara langsung." : "APK yang ditandatangani akan muncul di sini setelah rilis resmi diterbitkan."}</LocalizedText></span><a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-1 font-medium text-[#CF6A12]"><LocalizedText>Buka rilis GitHub </LocalizedText><ArrowUpRight className="h-4 w-4" /></a></div>}
        </div></section>

        <section id="arsip" className="scroll-mt-20 border-y border-zinc-200/70 bg-white py-24"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:px-8"><Reveal><div className="font-mono text-[11px] uppercase tracking-widest text-[#CF6A12]"><LocalizedText>02 / RIWAYAT RILIS</LocalizedText></div><h2 className="mt-3 font-serif text-5xl leading-none tracking-tight text-zinc-950"><LocalizedText>Versi sebelumnya.</LocalizedText></h2><p className="mt-4 max-w-sm text-sm leading-7 text-zinc-500"><LocalizedText>Arsip untuk kompatibilitas atau pengujian. Jika tidak ada alasan khusus, gunakan rilis terbaru.</LocalizedText></p><div className="mt-7 max-w-sm border-l-2 border-[#CF6A12] pl-4 text-xs leading-6 text-zinc-500"><LocalizedText>Versi lama mungkin tidak mendukung semua fitur baru. Hindari APK dari sumber yang tidak dikenal.</LocalizedText></div></Reveal><Reveal delay={0.08}><div className="divide-y divide-zinc-200 border-y border-zinc-200">{loading ? <p className="py-8 text-sm text-zinc-500"><LocalizedText>Memuat arsip...</LocalizedText></p> : releases.slice(1, 6).length ? releases.slice(1, 6).map((release) => <div key={release.id} className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5 sm:flex-nowrap"><span className="min-w-20 font-serif text-2xl text-zinc-900"><LocalizedText>{version(release)}</LocalizedText></span><div className="min-w-0 flex-1"><strong className="block truncate text-xs font-semibold text-zinc-900"><LocalizedText>{release.name || `Karsa Mobile ${version(release)}`}</LocalizedText></strong><span className="font-mono text-[10px] text-zinc-500"><LocalizedText>{formatDate(release.published_at, language)}</LocalizedText> · <LocalizedText>{formatSize(release.apk.size)}</LocalizedText></span></div><a href={release.apk.browser_download_url} aria-label={t(`Unduh Karsa Mobile ${version(release)}`)} className="inline-flex items-center gap-2 text-xs font-medium text-[#CF6A12] hover:text-[#B85B0D]"><LocalizedText>Unduh </LocalizedText><Download className="h-3.5 w-3.5" /></a></div>) : <p className="py-8 text-sm text-zinc-500"><LocalizedText>Belum ada versi lama yang tersedia.</LocalizedText></p>}</div><a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-zinc-700 hover:text-[#CF6A12]"><LocalizedText>Lihat semua rilis di GitHub </LocalizedText><ArrowUpRight className="h-4 w-4" /></a></Reveal></div></section>

        <section id="panduan" className="scroll-mt-20 bg-[#101012] py-24 text-white lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8"><Reveal><div className="font-mono text-[11px] uppercase tracking-widest text-[#CF6A12]"><LocalizedText>03 / MULAI GUNAKAN</LocalizedText></div><h2 className="mt-3 font-serif text-5xl leading-none tracking-tight sm:text-6xl"><LocalizedText>Dari unduh</LocalizedText><br /><LocalizedText>ke kelas.</LocalizedText></h2><p className="mt-5 max-w-md text-sm leading-7 text-zinc-400"><LocalizedText>Kamu baru perlu akun mahasiswa UNTIDAR ketika membuka aplikasinya.</LocalizedText></p><div className="mt-9 flex max-w-md gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 text-xs leading-6 text-zinc-300"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#CF6A12]" /><LocalizedText>Android mungkin meminta izin memasang aplikasi dari browser. Beri izin hanya untuk APK yang diunduh dari sumber resmi Karsa.</LocalizedText></div></Reveal><div className="space-y-0">{[["01", "Unduh APK terbaru", "Gunakan tombol rilis utama dan tunggu berkas selesai diunduh."], ["02", "Buka berkas dan pasang", "Ikuti petunjuk Android. Jika diminta, izinkan pemasangan dari browser yang kamu gunakan."], ["03", "Masuk dengan akun mahasiswa", "Buka aplikasi dan masuk menggunakan @students.untidar.ac.id."]].map(([number, title, detail], index) => <Reveal key={number} delay={index * 0.08}><div className="flex gap-6 border-b border-white/10 py-6"><span className="font-mono text-xs text-[#CF6A12]"><LocalizedText>{number}</LocalizedText> /</span><div><h3 className="text-base font-medium"><LocalizedText>{title}</LocalizedText></h3><p className="mt-2 text-xs leading-6 text-zinc-400"><LocalizedText>{detail}</LocalizedText></p></div></div></Reveal>)}</div></div></section>

        <section className="py-24 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:px-8"><Reveal><div className="font-mono text-[11px] uppercase tracking-widest text-[#CF6A12]"><LocalizedText>04 / BANTUAN</LocalizedText></div><h2 className="mt-3 font-serif text-5xl leading-none tracking-tight text-zinc-950"><LocalizedText>Pertanyaan singkat.</LocalizedText></h2></Reveal><div className="divide-y divide-zinc-200 border-y border-zinc-200">{FAQS.map(([question, answer], index) => <FaqItem key={question} index={index} question={question} answer={answer} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? null : index)} />)}</div></div></section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-4 sm:flex-row sm:px-6 lg:px-8"><div><div className="flex items-baseline gap-2"><span className="font-serif text-3xl text-zinc-950"><LocalizedText>karsa</LocalizedText></span><span className="font-mono text-[10px] tracking-widest text-[#CF6A12]"><LocalizedText>UNTIDAR</LocalizedText></span></div><p className="mt-2 font-serif text-lg italic text-zinc-700"><LocalizedText>“Every karsa, one point.”</LocalizedText></p><p className="mt-4 max-w-md text-xs leading-6 text-zinc-500"><LocalizedText>Karsa adalah proyek independen untuk lingkungan pembelajaran UNTIDAR, bukan layanan resmi universitas.</LocalizedText></p></div><div className="flex flex-col gap-3 text-xs text-zinc-600"><Link to="/" className="hover:text-[#CF6A12]"><LocalizedText>Karsa Landing</LocalizedText></Link><a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#CF6A12]"><LocalizedText>Rilis GitHub ↗</LocalizedText></a><Link to="/privacy" className="hover:text-[#CF6A12]"><LocalizedText>Privasi & Keamanan</LocalizedText></Link><a href="#rilis" className="hover:text-[#CF6A12]"><LocalizedText>Kembali ke rilis ↑</LocalizedText></a></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-zinc-100 px-4 pt-6 font-mono text-[10px] text-zinc-400 sm:px-6 lg:px-8"><LocalizedText>© 2026 Karsa. Independent project for the UNTIDAR environment.</LocalizedText></div></footer>
    </div>
  );
}
