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
  return (
    <nav className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <div className="space-y-1.5 rounded-xl border border-zinc-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block rounded px-2 py-1 font-mono text-[11px] text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-[#CF6A12]"
          >
            {section.label}
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
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-sm leading-relaxed">{children}</div>
    </motion.section>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
      <span className="text-zinc-600">{children}</span>
    </div>
  );
}

function RoleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Users className="h-4 w-4 text-[#CF6A12]" />
        <span className="font-semibold text-zinc-900">{title}</span>
      </div>
      <p className="text-xs text-zinc-600">{children}</p>
    </div>
  );
}

function ProviderCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-1 text-sm font-semibold text-zinc-900">{title}</div>
      <p className="text-xs text-zinc-600">{children}</p>
    </div>
  );
}

export default function PrivacyPage() {
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
              <span>Kembali ke Landing Page</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-medium text-zinc-950">
                karsa
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                UNTIDAR
              </span>
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
            <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
            Privasi & Keamanan
          </div>
          <h1 className="font-serif text-4xl tracking-tight-editorial text-zinc-950 sm:text-5xl lg:text-6xl">
            Privasi yang jelas.
            <br />
            <span className="font-normal italic text-zinc-700">
              Keamanan yang terukur.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg">
            Halaman ini menjelaskan data yang diproses Karsa, alasan
            pemrosesannya, kontrol keamanan yang aktif, dan batasan yang perlu
            diketahui pengguna.
          </p>
          <p className="mt-4 font-mono text-xs text-zinc-400">
            Terakhir diperbarui: {LAST_UPDATED}
          </p>
        </motion.div>

        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          <strong>Status layanan:</strong> Karsa saat ini merupakan proyek dan
          pilot independen untuk lingkungan Universitas Tidar. Karsa belum
          mewakili kebijakan resmi universitas sampai memperoleh persetujuan dan
          tata kelola institusional yang formal.
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <PrivacySection id="data" index={0} icon={Database} title="Data yang Diproses">
            <p>
              Karsa memproses data yang diperlukan untuk autentikasi, pengelolaan
              kelas, dan pencatatan keaktifan akademik.
            </p>
            <div className="mt-3 space-y-2.5">
              <BulletItem>
                <strong className="text-zinc-900">Identitas:</strong> nama,
                alamat email kampus, dan foto profil yang diberikan melalui
                Google OAuth; NIM dikelola oleh admin Karsa.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Data akademik:</strong>
                program studi, kelas, semester, mata kuliah, dan penugasan PJ.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Data keaktifan:</strong>
                mahasiswa, mata kuliah, kategori, nilai poin, catatan opsional,
                identitas PJ, serta waktu pencatatan.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Data autentikasi:</strong>
                tautan akun serta metadata/token OAuth yang dikelola Auth.js,
                session web, token yang telah di-hash untuk aplikasi native,
                dan timestamp penggunaan.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Data audit:</strong>
                identitas aktor, jenis aksi, konteks kelas/mata kuliah, waktu,
                serta snapshot perubahan penting.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Metadata layanan:</strong>
                penyedia hosting dapat memproses metadata request seperti
                alamat IP dan user-agent untuk operasional serta keamanan.
              </BulletItem>
            </div>
            <p className="mt-4 text-zinc-500">
              Aplikasi Android Karsa hanya meminta izin internet dan status
              jaringan. Aplikasi tidak meminta akses lokasi, kamera, mikrofon,
              kontak, atau penyimpanan pengguna.
            </p>
          </PrivacySection>

          <PrivacySection id="purpose" index={1} icon={FileCheck} title="Tujuan Pemrosesan">
            <div className="space-y-2.5">
              <BulletItem>Mengautentikasi akun kampus yang diizinkan.</BulletItem>
              <BulletItem>Mencatat, menampilkan, dan mengoreksi poin keaktifan.</BulletItem>
              <BulletItem>
                Menyediakan rapor pribadi dan leaderboard kelas dengan identitas
                pengguna lain yang disamarkan.
              </BulletItem>
              <BulletItem>
                Membantu admin mengelola data akademik dan membuat rekap Excel.
              </BulletItem>
              <BulletItem>
                Mencatat perubahan penting untuk audit, penelusuran kesalahan,
                dan penanganan insiden.
              </BulletItem>
            </div>
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
              Karsa tidak menggunakan data akademik untuk iklan, penjualan data,
              atau profiling komersial.
            </div>
          </PrivacySection>

          <PrivacySection id="access" index={2} icon={Users} title="Peran & Batas Akses">
            <p>
              Hak akses ditentukan di server dan diverifikasi ulang terhadap
              database. Menyembunyikan tombol di antarmuka bukan satu-satunya
              pengamanan.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <RoleCard title="Mahasiswa">
                Melihat rapor sendiri serta leaderboard dan mata kuliah dalam
                kelasnya. Tidak dapat mengubah data akademik.
              </RoleCard>
              <RoleCard title="PJ">
                Mencatat dan menghapus poin hanya pada mata kuliah yang memang
                ditugaskan kepadanya. Kepemilikan penugasan diperiksa ulang.
              </RoleCard>
              <RoleCard title="Admin">
                Mengelola data master, kelas, mahasiswa, penugasan PJ, audit,
                dan rekap melalui dashboard web.
              </RoleCard>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Jika role tidak dapat diverifikasi karena gangguan database, hak
              admin, PJ, dan akses berbasis kelas dicabut sementara secara
              fail-closed sampai verifikasi berhasil kembali.
            </p>
          </PrivacySection>

          <PrivacySection id="security" index={3} icon={Lock} title="Kontrol Keamanan Aktif">
            <div className="space-y-2.5">
              <BulletItem>
                <strong className="text-zinc-900">Koneksi terenkripsi:</strong>
                aplikasi dilayani melalui HTTPS dan koneksi PostgreSQL wajib
                menggunakan SSL.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Database least privilege:</strong>
                runtime memakai role khusus dengan hak minimum; Data API publik
                dinonaktifkan, grant anonim dicabut, dan RLS aktif pada tabel.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Validasi berlapis:</strong>
                input divalidasi di server, resource sensitif di-query ulang,
                dan constraint database menjaga integritas data.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Session web:</strong> JWT
                berada dalam cookie httpOnly dan klaim akses diperbarui dari
                database setiap session dibaca.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Hardening browser:</strong>
                HSTS serta header anti-sniffing, anti-framing, referrer,
                permissions, dan cross-origin diterapkan pada aplikasi.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Akun pengelola:</strong> MFA
                aktif pada akun tim Supabase dan secret runtime hanya disimpan
                di environment platform, bukan di repository.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Respons galat aman:</strong>
                API native mengembalikan pesan terkontrol tanpa stack trace,
                query, token, atau detail internal.
              </BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="mobile" index={4} icon={Shield} title="Keamanan Aplikasi Native">
            <div className="space-y-2.5">
              <BulletItem>
                Login berlangsung di browser sistem melalui Google OAuth dan
                kembali ke aplikasi menggunakan authorization code sekali pakai.
              </BulletItem>
              <BulletItem>
                Alur login memakai state dan PKCE untuk mengikat permintaan ke
                perangkat yang memulainya.
              </BulletItem>
              <BulletItem>
                Access token berlaku singkat; refresh token dapat dicabut saat
                logout dan disimpan melalui secure storage perangkat.
              </BulletItem>
              <BulletItem>
                Database hanya menyimpan hash token SHA-256, bukan access token
                atau refresh token mentah.
              </BulletItem>
              <BulletItem>
                Pencatatan poin memakai idempotency key dan pemeriksaan duplikasi
                untuk mengurangi risiko double-submit.
              </BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="retention" index={5} icon={Clock} title="Retensi, Penghapusan & Backup">
            <p>
              Data akademik dan audit disimpan selama masih diperlukan untuk
              operasional, akuntabilitas akademik, penyelesaian sengketa, dan
              kewajiban yang berlaku. Jadwal retensi final akan ditetapkan
              bersama universitas sebelum adopsi resmi.
            </p>
            <div className="mt-3 space-y-2.5">
              <BulletItem>
                Permintaan login native kedaluwarsa dalam 10 menit dan dibersihkan
                oleh layanan ketika tidak lagi berlaku.
              </BulletItem>
              <BulletItem>
                Access token native berlaku 15 menit dan refresh token paling
                lama 30 hari, kecuali dicabut lebih awal.
              </BulletItem>
              <BulletItem>
                Backup database dienkripsi AES-256, dibuat setiap hari, dan
                artifact backup disimpan selama 30 hari.
              </BulletItem>
              <BulletItem>
                Prosedur restore telah diuji pada project database terisolasi,
                bukan dengan menimpa production.
              </BulletItem>
              <BulletItem>
                File Excel yang telah diunduh berada di luar kendali teknis
                Karsa dan menjadi tanggung jawab pihak yang mengunduhnya.
              </BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="rights" index={6} icon={EyeOff} title="Pilihan & Hak Pengguna">
            <p>Pengguna dapat menghubungi pengelola Karsa untuk:</p>
            <div className="mt-3 space-y-2.5">
              <BulletItem>Meminta penjelasan mengenai data yang diproses.</BulletItem>
              <BulletItem>Meminta akses atau salinan data yang relevan.</BulletItem>
              <BulletItem>Meminta koreksi atas data yang tidak akurat.</BulletItem>
              <BulletItem>
                Mengajukan pembatasan atau penghapusan data, sejauh tidak
                bertentangan dengan kewajiban akademik, audit, atau hukum.
              </BulletItem>
              <BulletItem>
                Melaporkan dugaan penyalahgunaan akun atau insiden keamanan.
              </BulletItem>
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Identitas pemohon perlu diverifikasi sebelum permintaan terkait
              data diproses. Waktu penyelesaian bergantung pada jenis permintaan
              dan koordinasi dengan pihak akademik terkait.
            </p>
          </PrivacySection>

          <PrivacySection id="providers" index={7} icon={Server} title="Penyedia Layanan">
            <p>
              Karsa menggunakan layanan berikut untuk menjalankan produk. Setiap
              penyedia memproses data sesuai fungsi teknisnya masing-masing.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ProviderCard title="Vercel">
                Hosting landing page, web, dan API Karsa; juga menyediakan HTTPS,
                deployment, firewall platform, dan observability request.
              </ProviderCard>
              <ProviderCard title="Supabase">
                Hosting database PostgreSQL Karsa di region Asia Pasifik
                (Singapura), termasuk koneksi terenkripsi dan connection pooler.
              </ProviderCard>
              <ProviderCard title="Google OAuth">
                Memverifikasi identitas akun kampus. Karsa menerima profil dasar
                sesuai scope autentikasi yang disetujui pengguna.
              </ProviderCard>
              <ProviderCard title="GitHub">
                Menyimpan source code dan menjalankan otomasi build serta backup.
                Artifact database yang disimpan di GitHub telah dienkripsi.
              </ProviderCard>
              <ProviderCard title="EmailJS">
                Mengirim formulir “Request Pilot Access” dari landing page:
                nama, email, peran, fakultas, mata kuliah, dan waktu pengiriman.
                Data akademik aplikasi tidak dikirim melalui formulir ini.
              </ProviderCard>
            </div>
          </PrivacySection>

          <PrivacySection id="limitations" index={8} icon={Shield} title="Status Keamanan & Batasan" dark>
            <p className="text-zinc-300">
              Keamanan adalah proses berkelanjutan, bukan jaminan absolut. Kontrol
              di bawah ini mencerminkan status yang sudah diverifikasi serta
              pekerjaan yang masih terbuka.
            </p>
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
                    <div className="text-sm font-medium text-white">{title}</div>
                    <div className="text-xs text-zinc-400">{description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-400">
              Pendekatan Karsa mengacu pada prinsip pembatasan tujuan,
              minimisasi data, akurasi, keamanan, transparansi, dan retensi yang
              proporsional dalam UU Nomor 27 Tahun 2022 tentang Pelindungan Data
              Pribadi. Pernyataan ini bukan sertifikasi kepatuhan hukum.
            </div>
          </PrivacySection>

          <PrivacySection id="contact" index={9} icon={Mail} title="Kontak Privasi & Keamanan">
            <p>
              Untuk pertanyaan, permintaan terkait data, atau laporan dugaan
              insiden keamanan, hubungi pengelola Karsa:
            </p>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <a
                href="mailto:yuwiaffa@gmail.com"
                className="mb-2 flex items-center gap-3 font-semibold text-zinc-900 transition-colors hover:text-[#CF6A12]"
              >
                <Mail className="h-5 w-5 text-[#CF6A12]" />
                <span>yuwiaffa@gmail.com</span>
              </a>
              <p className="mb-3 text-xs text-zinc-500">
                Sertakan jenis permintaan dan informasi secukupnya. Jangan
                mengirim password, token, atau credential melalui email.
              </p>
              <div className="space-y-1.5">
                {[
                  "Akses atau salinan data pribadi",
                  "Koreksi data yang tidak akurat",
                  "Pembatasan atau penghapusan data",
                  "Dugaan penyalahgunaan akun atau insiden keamanan",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-zinc-600">
                    <ChevronRight className="h-3 w-3 text-[#CF6A12]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </PrivacySection>
        </motion.div>
      </main>

      <footer className="border-t border-zinc-200/80 bg-white py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <span>© 2026 Karsa. Proyek independen untuk lingkungan UNTIDAR.</span>
          <span className="font-mono">Privacy & Security · v{LAST_UPDATED}</span>
        </div>
      </footer>
    </div>
  );
}
