import { LanguageToggle } from "../components/LanguageToggle";
import { LocalizedText, useLanguage } from "../i18n/LanguageContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Clock,
  Database,
  EyeOff,
  FileCheck,
  Lock,
  Mail,
  Server,
  Shield,
  Users,
} from "lucide-react";

const LAST_UPDATED = "24 September 2026";

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

const sections = [
  { id: "data", label: "Data yang Diproses" },
  { id: "purpose", label: "Tujuan Pemrosesan" },
  { id: "access", label: "Peran & Akses" },
  { id: "security", label: "Kontrol Keamanan" },
  { id: "mobile", label: "Aplikasi Native" },
  { id: "retention", label: "Retensi & Backup" },
  { id: "rights", label: "Hak Pengguna" },
  { id: "providers", label: "Penyedia Layanan" },
  { id: "limitations", label: "Status & Batasan" },
  { id: "contact", label: "Kontak" },
];

function PrivacyNav() {
  const { t } = useLanguage();
  return (
    <nav className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <div className="space-y-1.5 rounded-xl border border-zinc-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block rounded px-2 py-1 font-mono text-[11px] text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-[#CF6A12]"
          >
            <LocalizedText>{section.label}</LocalizedText>
          </a>
        ))}
      </div>
    </nav>
  );
}

function createSlideVariants(index: number) {
  return {
    hidden: { opacity: 0, x: index % 2 === 0 ? 72 : -72, y: 16 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

function PrivacySection({
  id,
  index,
  icon: Icon,
  title,
  children,
  dark = false,
}: {
  id: string;
  index: number;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <motion.section
      id={id}
      variants={createSlideVariants(index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`scroll-mt-24 rounded-2xl border p-6 sm:p-8 ${
        dark
          ? "border-zinc-800 bg-zinc-950 text-white"
          : "border-zinc-200 bg-white text-zinc-900"
      }`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            dark ? "bg-[#CF6A12]" : "bg-orange-50 text-[#CF6A12]"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
          <LocalizedText>{title}</LocalizedText>
        </h2>
      </div>
      <div className="space-y-4 text-sm leading-relaxed"><LocalizedText>{children}</LocalizedText></div>
    </motion.section>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-start gap-2.5">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
      <span className="text-zinc-600"><LocalizedText>{children}</LocalizedText></span>
    </div>
  );
}

function RoleCard({ title, children }: { title: string; children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Users className="h-4 w-4 text-[#CF6A12]" />
        <span className="font-semibold text-zinc-900"><LocalizedText>{title}</LocalizedText></span>
      </div>
      <p className="text-xs text-zinc-600"><LocalizedText>{children}</LocalizedText></p>
    </div>
  );
}

function ProviderCard({ title, children }: { title: string; children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-1 text-sm font-semibold text-zinc-900"><LocalizedText>{title}</LocalizedText></div>
      <p className="text-xs text-zinc-600"><LocalizedText>{children}</LocalizedText></p>
    </div>
  );
}

export default function PrivacyPage() {
  const { t } = useLanguage();
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900 antialiased selection:bg-[#CF6A12] selection:text-white">
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span><LocalizedText>Kembali ke Landing Page</LocalizedText></span>
            </Link>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <span className="font-serif text-xl font-medium text-zinc-950"><LocalizedText>
                karsa
              </LocalizedText></span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400"><LocalizedText>
                UNTIDAR
              </LocalizedText></span>
            </div>
          </div>
        </div>
      </header>

      <PrivacyNav />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" /><LocalizedText>
            Privasi & Keamanan
          </LocalizedText></div>
          <h1 className="font-serif text-4xl tracking-tight-editorial text-zinc-950 sm:text-5xl lg:text-6xl"><LocalizedText>
            Privasi yang jelas.
            </LocalizedText><br />
            <span className="font-normal italic text-zinc-700"><LocalizedText>
              Keamanan yang terukur.
            </LocalizedText></span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg"><LocalizedText>
            Halaman ini menjelaskan data yang diproses Karsa, alasan
            pemrosesannya, kontrol keamanan yang aktif, dan batasan yang perlu
            diketahui pengguna.
          </LocalizedText></p>
          <p className="mt-4 font-mono text-xs text-zinc-400"><LocalizedText>
            Terakhir diperbarui: <LocalizedText></LocalizedText>{LAST_UPDATED}</LocalizedText>
          </p>
        </motion.div>

        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          <strong><LocalizedText>Status layanan:</LocalizedText></strong><LocalizedText> Karsa saat ini merupakan proyek dan
          pilot independen untuk lingkungan Universitas Tidar. Karsa belum
          mewakili kebijakan resmi universitas sampai memperoleh persetujuan dan
          tata kelola institusional yang formal.
        </LocalizedText></div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <PrivacySection id="data" index={0} icon={Database} title={t("Data yang Diproses")}>
            <p><LocalizedText>
              Karsa memproses data yang diperlukan untuk autentikasi, pengelolaan
              kelas, dan pencatatan keaktifan akademik.
            </LocalizedText></p>
            <div className="mt-3 space-y-2.5">
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Identitas:</LocalizedText></strong><LocalizedText> nama,
                alamat email kampus, dan foto profil yang diberikan melalui
                Google OAuth; NIM dikelola oleh admin Karsa.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Data akademik:</LocalizedText></strong><LocalizedText>
                program studi, kelas, semester, mata kuliah, dan penugasan PJ.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Data keaktifan:</LocalizedText></strong><LocalizedText>
                mahasiswa, mata kuliah, kategori, nilai poin, catatan opsional,
                identitas PJ, serta waktu pencatatan.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Data autentikasi:</LocalizedText></strong><LocalizedText>
                tautan akun serta metadata/token OAuth yang dikelola Auth.js,
                session web, token yang telah di-hash untuk aplikasi native,
                dan timestamp penggunaan.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Data audit:</LocalizedText></strong><LocalizedText>
                identitas aktor, jenis aksi, konteks kelas/mata kuliah, waktu,
                serta snapshot perubahan penting.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Metadata layanan:</LocalizedText></strong><LocalizedText>
                penyedia hosting dapat memproses metadata request seperti
                alamat IP dan user-agent untuk operasional serta keamanan.
              </LocalizedText></BulletItem>
            </div>
            <p className="mt-4 text-zinc-500"><LocalizedText>
              Aplikasi Android Karsa hanya meminta izin internet dan status
              jaringan. Aplikasi tidak meminta akses lokasi, kamera, mikrofon,
              kontak, atau penyimpanan pengguna.
            </LocalizedText></p>
          </PrivacySection>

          <PrivacySection id="purpose" index={1} icon={FileCheck} title={t("Tujuan Pemrosesan")}>
            <div className="space-y-2.5">
              <BulletItem><LocalizedText>Mengautentikasi akun kampus yang diizinkan.</LocalizedText></BulletItem>
              <BulletItem><LocalizedText>Mencatat, menampilkan, dan mengoreksi poin keaktifan.</LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Menyediakan rapor pribadi dan leaderboard kelas dengan identitas
                pengguna lain yang disamarkan.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Membantu admin mengelola data akademik dan membuat rekap Excel.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Mencatat perubahan penting untuk audit, penelusuran kesalahan,
                dan penanganan insiden.
              </LocalizedText></BulletItem>
            </div>
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900"><LocalizedText>
              Karsa tidak menggunakan data akademik untuk iklan, penjualan data,
              atau profiling komersial.
            </LocalizedText></div>
          </PrivacySection>

          <PrivacySection id="access" index={2} icon={Users} title={t("Peran & Batas Akses")}>
            <p><LocalizedText>
              Hak akses ditentukan di server dan diverifikasi ulang terhadap
              database. Menyembunyikan tombol di antarmuka bukan satu-satunya
              pengamanan.
            </LocalizedText></p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <RoleCard title={t("Mahasiswa")}><LocalizedText>
                Melihat rapor sendiri serta leaderboard dan mata kuliah dalam
                kelasnya. Tidak dapat mengubah data akademik.
              </LocalizedText></RoleCard>
              <RoleCard title={t("PJ")}><LocalizedText>
                Mencatat dan menghapus poin hanya pada mata kuliah yang memang
                ditugaskan kepadanya. Kepemilikan penugasan diperiksa ulang.
              </LocalizedText></RoleCard>
              <RoleCard title={t("Admin")}><LocalizedText>
                Mengelola data master, kelas, mahasiswa, penugasan PJ, audit,
                dan rekap melalui dashboard web.
              </LocalizedText></RoleCard>
            </div>
            <p className="mt-3 text-xs text-zinc-500"><LocalizedText>
              Jika role tidak dapat diverifikasi karena gangguan database, hak
              admin, PJ, dan akses berbasis kelas dicabut sementara secara
              fail-closed sampai verifikasi berhasil kembali.
            </LocalizedText></p>
          </PrivacySection>

          <PrivacySection id="security" index={3} icon={Lock} title={t("Kontrol Keamanan Aktif")}>
            <div className="space-y-2.5">
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Koneksi terenkripsi:</LocalizedText></strong><LocalizedText>
                aplikasi dilayani melalui HTTPS dan koneksi PostgreSQL wajib
                menggunakan SSL.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Database least privilege:</LocalizedText></strong><LocalizedText>
                runtime memakai role khusus dengan hak minimum; Data API publik
                dinonaktifkan, grant anonim dicabut, dan RLS aktif pada tabel.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Validasi berlapis:</LocalizedText></strong><LocalizedText>
                input divalidasi di server, resource sensitif di-query ulang,
                dan constraint database menjaga integritas data.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Session web:</LocalizedText></strong><LocalizedText> JWT
                berada dalam cookie httpOnly dan klaim akses diperbarui dari
                database setiap session dibaca.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Hardening browser:</LocalizedText></strong><LocalizedText>
                HSTS serta header anti-sniffing, anti-framing, referrer,
                permissions, dan cross-origin diterapkan pada aplikasi.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Akun pengelola:</LocalizedText></strong><LocalizedText> MFA
                aktif pada akun tim Supabase dan secret runtime hanya disimpan
                di environment platform, bukan di repository.
              </LocalizedText></BulletItem>
              <BulletItem>
                <strong className="text-zinc-900"><LocalizedText>Respons galat aman:</LocalizedText></strong><LocalizedText>
                API native mengembalikan pesan terkontrol tanpa stack trace,
                query, token, atau detail internal.
              </LocalizedText></BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="mobile" index={4} icon={Shield} title={t("Keamanan Aplikasi Native")}>
            <div className="space-y-2.5">
              <BulletItem><LocalizedText>
                Login berlangsung di browser sistem melalui Google OAuth dan
                kembali ke aplikasi menggunakan authorization code sekali pakai.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Alur login memakai state dan PKCE untuk mengikat permintaan ke
                perangkat yang memulainya.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Access token berlaku singkat; refresh token dapat dicabut saat
                logout dan disimpan melalui secure storage perangkat.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Database hanya menyimpan hash token SHA-256, bukan access token
                atau refresh token mentah.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Pencatatan poin memakai idempotency key dan pemeriksaan duplikasi
                untuk mengurangi risiko double-submit.
              </LocalizedText></BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="retention" index={5} icon={Clock} title={t("Retensi, Penghapusan & Backup")}>
            <p><LocalizedText>
              Data akademik dan audit disimpan selama masih diperlukan untuk
              operasional, akuntabilitas akademik, penyelesaian sengketa, dan
              kewajiban yang berlaku. Jadwal retensi final akan ditetapkan
              bersama universitas sebelum adopsi resmi.
            </LocalizedText></p>
            <div className="mt-3 space-y-2.5">
              <BulletItem><LocalizedText>
                Permintaan login native kedaluwarsa dalam 10 menit dan dibersihkan
                oleh layanan ketika tidak lagi berlaku.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Access token native berlaku 15 menit dan refresh token paling
                lama 30 hari, kecuali dicabut lebih awal.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Backup database dienkripsi AES-256, dibuat setiap hari, dan
                artifact backup disimpan selama 30 hari.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Prosedur restore telah diuji pada project database terisolasi,
                bukan dengan menimpa production.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                File Excel yang telah diunduh berada di luar kendali teknis
                Karsa dan menjadi tanggung jawab pihak yang mengunduhnya.
              </LocalizedText></BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="rights" index={6} icon={EyeOff} title={t("Pilihan & Hak Pengguna")}>
            <p><LocalizedText>Pengguna dapat menghubungi pengelola Karsa untuk:</LocalizedText></p>
            <div className="mt-3 space-y-2.5">
              <BulletItem><LocalizedText>Meminta penjelasan mengenai data yang diproses.</LocalizedText></BulletItem>
              <BulletItem><LocalizedText>Meminta akses atau salinan data yang relevan.</LocalizedText></BulletItem>
              <BulletItem><LocalizedText>Meminta koreksi atas data yang tidak akurat.</LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Mengajukan pembatasan atau penghapusan data, sejauh tidak
                bertentangan dengan kewajiban akademik, audit, atau hukum.
              </LocalizedText></BulletItem>
              <BulletItem><LocalizedText>
                Melaporkan dugaan penyalahgunaan akun atau insiden keamanan.
              </LocalizedText></BulletItem>
            </div>
            <p className="mt-4 text-xs text-zinc-500"><LocalizedText>
              Identitas pemohon perlu diverifikasi sebelum permintaan terkait
              data diproses. Waktu penyelesaian bergantung pada jenis permintaan
              dan koordinasi dengan pihak akademik terkait.
            </LocalizedText></p>
          </PrivacySection>

          <PrivacySection id="providers" index={7} icon={Server} title={t("Penyedia Layanan")}>
            <p><LocalizedText>
              Karsa menggunakan layanan berikut untuk menjalankan produk. Setiap
              penyedia memproses data sesuai fungsi teknisnya masing-masing.
            </LocalizedText></p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ProviderCard title={t("Vercel")}><LocalizedText>
                Hosting landing page, web, dan API Karsa; juga menyediakan HTTPS,
                deployment, firewall platform, dan observability request.
              </LocalizedText></ProviderCard>
              <ProviderCard title={t("Supabase")}><LocalizedText>
                Hosting database PostgreSQL Karsa di region Asia Pasifik
                (Singapura), termasuk koneksi terenkripsi dan connection pooler.
              </LocalizedText></ProviderCard>
              <ProviderCard title={t("Google OAuth")}><LocalizedText>
                Memverifikasi identitas akun kampus. Karsa menerima profil dasar
                sesuai scope autentikasi yang disetujui pengguna.
              </LocalizedText></ProviderCard>
              <ProviderCard title={t("GitHub")}><LocalizedText>
                Menyimpan source code dan menjalankan otomasi build serta backup.
                Artifact database yang disimpan di GitHub telah dienkripsi.
              </LocalizedText></ProviderCard>
              <ProviderCard title={t("EmailJS")}><LocalizedText>
                Mengirim formulir “Request Pilot Access” dari landing page:
                nama, email, peran, fakultas, mata kuliah, dan waktu pengiriman.
                Data akademik aplikasi tidak dikirim melalui formulir ini.
              </LocalizedText></ProviderCard>
            </div>
          </PrivacySection>

          <PrivacySection id="limitations" index={8} icon={Shield} title={t("Status Keamanan & Batasan")} dark>
            <p className="text-zinc-300"><LocalizedText>
              Keamanan adalah proses berkelanjutan, bukan jaminan absolut. Kontrol
              di bawah ini mencerminkan status yang sudah diverifikasi serta
              pekerjaan yang masih terbuka.
            </LocalizedText></p>
            <div className="mt-4 space-y-4">
              {[
                [
                  "Aktif dan terverifikasi",
                  "Least-privilege database, RLS, SSL enforcement, MFA pengelola, backup terenkripsi, restore test, security headers, dan otorisasi fail-closed.",
                ],
                [
                  "Sedang dipantau",
                  "Rule WAF untuk endpoint autentikasi native berada pada mode observasi sebelum batas blokir diterapkan berdasarkan trafik nyata.",
                ],
                [
                  "Belum diklaim selesai",
                  "Penetration test independen, kebijakan retensi institusional, CSP penuh, dan persetujuan tata kelola universitas masih memerlukan proses lanjutan.",
                ],
              ].map(([title, description], index) => (
                <div key={title} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      index === 0 ? "bg-emerald-600" : "bg-zinc-800"
                    }`}
                  >
                    {index === 0 ? (
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-zinc-300" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white"><LocalizedText>{title}</LocalizedText></div>
                    <div className="text-xs text-zinc-400"><LocalizedText>{description}</LocalizedText></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-400"><LocalizedText>
              Pendekatan Karsa mengacu pada prinsip pembatasan tujuan,
              minimisasi data, akurasi, keamanan, transparansi, dan retensi yang
              proporsional dalam UU Nomor 27 Tahun 2022 tentang Pelindungan Data
              Pribadi. Pernyataan ini bukan sertifikasi kepatuhan hukum.
            </LocalizedText></div>
          </PrivacySection>

          <PrivacySection id="contact" index={9} icon={Mail} title={t("Kontak Privasi & Keamanan")}>
            <p><LocalizedText>
              Untuk pertanyaan, permintaan terkait data, atau laporan dugaan
              insiden keamanan, hubungi pengelola Karsa:
            </LocalizedText></p>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <a
                href="mailto:yuwiaffa@gmail.com"
                className="mb-2 flex items-center gap-3 font-semibold text-zinc-900 transition-colors hover:text-[#CF6A12]"
              >
                <Mail className="h-5 w-5 text-[#CF6A12]" />
                <span><LocalizedText>yuwiaffa@gmail.com</LocalizedText></span>
              </a>
              <p className="mb-3 text-xs text-zinc-500"><LocalizedText>
                Sertakan jenis permintaan dan informasi secukupnya. Jangan
                mengirim password, token, atau credential melalui email.
              </LocalizedText></p>
              <div className="space-y-1.5">
                {[
                  "Akses atau salinan data pribadi",
                  "Koreksi data yang tidak akurat",
                  "Pembatasan atau penghapusan data",
                  "Dugaan penyalahgunaan akun atau insiden keamanan",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-zinc-600">
                    <ChevronRight className="h-3 w-3 text-[#CF6A12]" />
                    <span><LocalizedText>{item}</LocalizedText></span>
                  </div>
                ))}
              </div>
            </div>
          </PrivacySection>
        </motion.div>
      </main>

      <footer className="border-t border-zinc-200/80 bg-white py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <span><LocalizedText>© 2026 Karsa. Proyek independen untuk lingkungan UNTIDAR.</LocalizedText></span>
          <span className="font-mono"><LocalizedText>Privacy & Security · v<LocalizedText></LocalizedText>{LAST_UPDATED}</LocalizedText></span>
        </div>
      </footer>
    </div>
  );
}
