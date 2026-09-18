import { useEffect } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import { motion } from "framer-motion";
import {
  Shield,
  Database,
  Lock,
  Users,
  Clock,
  Server,
  FileCheck,
  Mail,
  ChevronRight,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

function PrivacyNav() {
  const sections = [
    { id: "collection", label: "Data Collection" },
    { id: "usage", label: "Data Usage" },
    { id: "protection", label: "Data Protection" },
    { id: "security", label: "Security Measures" },
    { id: "roles", label: "Roles & Access" },
    { id: "retention", label: "Data Retention" },
    { id: "rights", label: "Your Rights" },
    { id: "roadmap", label: "Security Roadmap" },
    { id: "third-party", label: "Third-Party Services" },
    { id: "legal", label: "Legal Compliance" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-30">
      <div className="rounded-xl border border-zinc-200 bg-white/90 backdrop-blur-sm p-3 shadow-sm space-y-1.5">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="block text-[11px] font-mono text-zinc-500 hover:text-[#CF6A12] transition-colors py-1 px-2 rounded hover:bg-zinc-50"
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function PrivacySection({
  id,
  icon: Icon,
  title,
  children,
  dark = false,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`rounded-2xl border p-6 sm:p-8 ${
        dark
          ? "bg-zinc-950 border-zinc-800 text-white"
          : "bg-white border-zinc-200 text-zinc-900"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            dark ? "bg-[#CF6A12]" : "bg-orange-50 text-[#CF6A12]"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">
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
      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
      <span className="text-zinc-600">{children}</span>
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-[#CF6A12] selection:text-white font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Landing Page</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-medium text-zinc-950">
                karsa
              </span>
              <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                UNTIDAR
              </span>
            </div>
          </div>
        </div>
      </header>

      <PrivacyNav />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-600 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
            Kebijakan Privasi & Keamanan
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight-editorial text-zinc-950">
            Data Anda.
            <br />
            <span className="italic font-normal text-zinc-700">
              Dilindungi sepenuhnya.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
            Kebijakan privasi ini menjelaskan bagaimana Karsa mengumpulkan,
            menggunakan, melindungi, dan menyimpan data akademik Anda di
            Universitas Tidar.
          </p>
          <p className="mt-4 text-xs font-mono text-zinc-400">
            Terakhir diperbarui: September 2026
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
          <PrivacySection id="collection" icon={Database} title="Data Collection">
            <p>
              Karsa hanya mengumpulkan data yang relevan dengan kegiatan
              akademik di Universitas Tidar. Data kami simpan di database
              Supabase (PostgreSQL) yang di-host di wilayah Singapura.
            </p>
            <div className="space-y-2.5 mt-3">
              <BulletItem>
                <strong className="text-zinc-900">Identitas Dasar:</strong>{" "}
                Nama, email UNTIDAR (@students.untidar.ac.id / @untidar.ac.id),
                NIM, dan foto profil dari Google OAuth.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Data Akademik:</strong>{" "}
                Kelas, program studi, semester aktif, mata kuliah yang diikuti.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Aktivitas Keaktifan:</strong>{" "}
                Setiap pencatatan poin — termasuk kategori (Bertanya, Menjawab,
                Presentasi, Lainnya), jumlah poin (1-4), catatan opsional dari
                PJ, dan timestamp pencatatan.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Data Teknis:</strong>{" "}
                Session token (JWT), channel preference (mobile/desktop), dan
                audit log akses.
              </BulletItem>
            </div>
            <p className="mt-4 text-zinc-500 italic">
              Karsa TIDAK mengumpulkan: lokasi GPS, data perangkat, riwayat
              browsing, atau data pribadi di luar konteks akademik.
            </p>
          </PrivacySection>

          <PrivacySection id="usage" icon={FileCheck} title="Data Usage">
            <p>
              Data yang dikumpulkan digunakan secara eksklusif untuk keperluan
              akademik di Universitas Tidar:
            </p>
            <div className="space-y-2.5 mt-3">
              <BulletItem>
                Mencatat dan menghitung poin keaktifan mahasiswa di kelas.
              </BulletItem>
              <BulletItem>
                Menampilkan ranking kelas yang telah di-mask untuk privasi.
              </BulletItem>
              <BulletItem>
                Membuat rapor keaktifan individual yang dapat diakses mahasiswa.
              </BulletItem>
              <BulletItem>
                Mengekspor data ke format Excel/CSV untuk integrasi dengan
                SIAKAD UNTIDAR.
              </BulletItem>
              <BulletItem>
                Audit trail untuk verifikasi dan transparansi akademik.
              </BulletItem>
            </div>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              <strong className="text-amber-900">Catatan:</strong> Karsa TIDAK
              menggunakan data untuk iklan, profiling, atau membagikan data
              kepada pihak ketiga untuk tujuan komersial.
            </div>
          </PrivacySection>

          <PrivacySection id="protection" icon={EyeOff} title="Data Protection">
            <p>
              Karsa menerapkan beberapa lapisan perlindungan untuk menjaga privasi
              mahasiswa:
            </p>
            <div className="space-y-2.5 mt-3">
              <BulletItem>
                <strong className="text-zinc-900">Leaderboard Masking:</strong>{" "}
                Nama mahasiswa di leaderboard kelas disamarkan — hanya 2 karakter
                pertama yang terlihat, sisanya diganti "x" (contoh: "Rizki
                Dermawan" → "Rixxx Dexxxxxx").
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Class-Scoped
                Visibility:</strong> Setiap mahasiswa hanya dapat melihat data
                kelasnya sendiri. Tidak bisa melihat kelas lain.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Immutable Ledger:</strong>{" "}
                Setiap poin yang tercatat bersifat permanen dan tidak dapat
                diubah — hanya PJ yang mencatat yang dapat menghapus.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Audit Trail:</strong> Setiap
                aksi tercatat dengan timestamp, identitas PJ, dan hash
                verifikasi.
              </BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="security" icon={Lock} title="Security Measures">
            <p>
              Keamanan data dijaga di beberapa level — dari transport hingga
              storage:
            </p>
            <div className="space-y-2.5 mt-3">
              <BulletItem>
                <strong className="text-zinc-900">Transport Encryption:</strong>{" "}
                Semua komunikasi dienkripsi via HTTPS/TLS 1.3.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Session Security:</strong>{" "}
                JWT disimpan sebagai httpOnly cookie, di-refresh dari database
                pada setiap request.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">IDOR Prevention:</strong>{" "}
                Server selalu re-query database untuk otorisasi — input dari
                client tidak pernah dipercaya begitu saja.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Input Validation:</strong>{" "}
                Semua input divalidasi dengan Zod di server + CHECK constraint
                di database sebagai lapisan terakhir.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Anti Double-Submit:</strong>{" "}
                Payload identik dalam 3 detik di-skip (bukan error) untuk
                mencegah duplikasi data.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Dev Quick Login Guard:</strong>{" "}
                3-layer security untuk development mode (UI hidden, provider not
                registered, authorize rejects di production).
              </BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="roles" icon={Users} title="Roles & Access">
            <p>
              Sistem Karsa memiliki 2 role utama dengan batasan akses yang
              jelas:
            </p>
            <div className="space-y-3 mt-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-[#CF6A12]" />
                  <span className="font-semibold text-zinc-900">
                    PJ (Penanggung Jawab)
                  </span>
                </div>
                <p className="text-xs text-zinc-600">
                  Dosen atau asisten yang ditugaskan mencatat poin untuk mata
                  kuliah tertentu di kelas tertentu. Akses terkunci hanya ke
                  kelas yang ditugaskan.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-[#CF6A12]" />
                  <span className="font-semibold text-zinc-900">Mahasiswa</span>
                </div>
                <p className="text-xs text-zinc-600">
                  Akses terbatas ke rapor pribadi, leaderboard kelas yang di-mask,
                  dan riwayat poin. Tidak dapat melihat data kelas lain atau
                  mengubah data.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Otorisasi dilakukan di server-side pada setiap request. UI hanya
              lapisan presentasi — akses tetap ditolak di server meskipun
              dimanipulasi di client.
            </p>
          </PrivacySection>

          <PrivacySection id="retention" icon={Clock} title="Data Retention">
            <p>
              Kebijakan retensi data Karsa dirancang untuk menyeimbangkan
              kebutuhan akademik dan privasi mahasiswa:
            </p>
            <div className="space-y-2.5 mt-3">
              <BulletItem>
                Data akademik (PoinLog, keanggotaan kelas) disimpan selama
                mahasiswa aktif terdaftar di Universitas Tidar.
              </BulletItem>
              <BulletItem>
                Setelah mahasiswa dinyatakan lulus atau tidak aktif, data
                akademik akan dihapus secara otomatis oleh sistem.
              </BulletItem>
              <BulletItem>
                Data yang di-export ke SIAKAD menjadi tanggung jawab sistem
                SIAKAD UNTIDAR — di luar scope Karsa.
              </BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="rights" icon={Shield} title="Your Rights">
            <p>
              Sebagai pengguna, Anda memiliki hak-hak berikut terkait data
              pribadi Anda:
            </p>
            <div className="space-y-2.5 mt-3">
              <BulletItem>
                <strong className="text-zinc-900">Right to Access:</strong>{" "}
                Lihat semua data akademik Anda melalui rapor dashboard.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Right to Rectification:</strong>{" "}
                Ajukan koreksi data yang salah kepada PJ atau admin fakultas.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Right to Erasure:</strong>{" "}
                Hubungi tim akademik UNTIDAR untuk penghapusan data (sesuai
                kebijakan universitas).
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">Right to Portability:</strong>{" "}
                Data dapat di-export dalam format Excel/CSV untuk keperluan
                akademik.
              </BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="roadmap" icon={Server} title="Security Roadmap" dark>
            <p className="text-zinc-300">
              Karsa sedang dalam <strong className="text-white">Fase 5</strong>{" "}
              pengembangan. Langkah-langkah keamanan berikut sedang dan akan
              diterapkan:
            </p>
            <div className="space-y-3 mt-3">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CF6A12]">
                  <CheckCircle className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    Penetration Testing
                  </div>
                  <div className="text-xs text-zinc-400">
                    Pengujian keamanan berkala untuk menemukan kerentanan.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CF6A12]">
                  <CheckCircle className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    Rate-Limiting Guards
                  </div>
                  <div className="text-xs text-zinc-400">
                    Perlindungan dari serangan DDoS dan brute-force.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-800">
                  <Clock className="h-3.5 w-3.5 text-orange-300" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    Load Testing 5,000 req/min
                  </div>
                  <div className="text-xs text-zinc-400">
                    Memastikan sistem tetap aman di bawah beban tinggi.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-800">
                  <Clock className="h-3.5 w-3.5 text-orange-300" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    SSO SAML Integration Audit
                  </div>
                  <div className="text-xs text-zinc-400">
                    Integrasi dan audit dengan Single Sign-On UNTIDAR.
                  </div>
                </div>
              </div>
            </div>
          </PrivacySection>

          <PrivacySection id="third-party" icon={Server} title="Third-Party Services">
            <p>
              Karsa menggunakan beberapa layanan pihak ketiga untuk operasional:
            </p>
            <div className="space-y-3 mt-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="font-semibold text-zinc-900 text-sm mb-1">
                  EmailJS
                </div>
                <p className="text-xs text-zinc-600">
                  Layanan untuk mengirim notifikasi email dari form request
                  access di landing page. Hanya email dan nama pengirim yang
                  dikirim.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="font-semibold text-zinc-900 text-sm mb-1">
                  Vercel
                </div>
                <p className="text-xs text-zinc-600">
                  Platform hosting untuk landing page dan aplikasi Karsel.
                  Data disimpan di edge network Vercel.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="font-semibold text-zinc-900 text-sm mb-1">
                  Google Workspace
                </div>
                <p className="text-xs text-zinc-600">
                  Autentikasi Single Sign-On (SSO) menggunakan akun Google
                  @students.untidar.ac.id / @untidar.ac.id.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <div className="font-semibold text-zinc-900 text-sm mb-1">
                  Supabase
                </div>
                <p className="text-xs text-zinc-600">
                  Database PostgreSQL yang di-host di wilayah Singapura dengan
                  enkripsi at-rest dan connection pooling.
                </p>
              </div>
            </div>
          </PrivacySection>

          <PrivacySection id="legal" icon={FileCheck} title="Legal Compliance">
            <p>
              Kebijakan privasi Karsa selaras dengan prinsip-prinsip regulasi
              perlindungan data:
            </p>
            <div className="space-y-2.5 mt-3">
              <BulletItem>
                <strong className="text-zinc-900">FERPA</strong> — Family
                Educational Rights and Privacy Act (US). Prinsip transparansi dan
                hak akses ke data pendidikan di-adopt sesuai konteks
                Universitas Tidar.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">GDPR Principles</strong> —
                Data minimization, purpose limitation, dan storage limitation
                diimplementasikan sesuai prinsip GDPR.
              </BulletItem>
              <BulletItem>
                <strong className="text-zinc-900">UU PDP Indonesia</strong> —
                Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data
                Pribadi. Karsa berkomitmen untuk memenuhi standar perlindungan
                data sesuai regulasi Indonesia.
              </BulletItem>
            </div>
          </PrivacySection>

          <PrivacySection id="contact" icon={Mail} title="Contact & Privacy Concerns">
            <p>
              Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan
              terkait privasi dan keamanan data Anda, silakan hubungi:
            </p>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-[#CF6A12]" />
                <span className="font-semibold text-zinc-900">
                  yuwiaffa@gmail.com
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-3">
                Tim Karsa UNTIDAR akan merespons pertanyaan Anda dalam waktu 1x24
                jam pada hari kerja.
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <ChevronRight className="h-3 w-3 text-[#CF6A12]" />
                  <span>Permintaan akses data pribadi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <ChevronRight className="h-3 w-3 text-[#CF6A12]" />
                  <span>Koreksi data yang tidak akurat</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <ChevronRight className="h-3 w-3 text-[#CF6A12]" />
                  <span>Penghapusan data (sesuai kebijakan universitas)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <ChevronRight className="h-3 w-3 text-[#CF6A12]" />
                  <span>Pelanggaran keamanan atau insiden data</span>
                </div>
              </div>
            </div>
          </PrivacySection>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200/80 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="font-serif text-base font-medium text-zinc-900 hover:text-[#CF6A12] transition-colors"
              >
                karsa
              </Link>
              <span className="font-mono text-zinc-400">
                © 2026 Universitas Tidar
              </span>
            </div>
            <Link
              to="/"
              className="text-zinc-500 hover:text-[#CF6A12] transition-colors"
            >
              ← Kembali ke Landing Page
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
