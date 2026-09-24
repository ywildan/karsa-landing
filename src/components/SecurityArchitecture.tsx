import { CheckCircle2, Database, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";

const gates = [
  {
    number: "01",
    title: "Identity",
    description: "Google domain gate or a valid native bearer token.",
    icon: KeyRound,
    delay: "0.35s",
  },
  {
    number: "02",
    title: "Current role",
    description: "Claims are refreshed from the database and fail closed.",
    icon: ShieldCheck,
    delay: "1.05s",
  },
  {
    number: "03",
    title: "Resource scope",
    description: "Class and assignment ownership are checked server-side.",
    icon: LockKeyhole,
    delay: "1.75s",
  },
  {
    number: "04",
    title: "Validated write",
    description: "Input, idempotency, constraints, and audit stay in sequence.",
    icon: Database,
    delay: "2.45s",
  },
];

const controls = [
  "Runtime role without BYPASSRLS",
  "RLS on every application table",
  "Native tokens stored as hashes",
  "Encrypted daily backup",
  "Restore tested in isolation",
  "Safe API failure responses",
];

export function SecurityArchitecture() {
  return (
    <section
      id="security"
      className="relative overflow-hidden border-b border-zinc-800 bg-[#0A0A0A] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-7xl px-4 opacity-30 sm:px-6 lg:px-8">
        <div className="grid h-full w-full grid-cols-12 gap-8 border-x border-zinc-800/60">
          <div className="col-span-4 hidden border-r border-zinc-800/60 lg:block" />
          <div className="col-span-4 hidden border-r border-zinc-800/60 lg:block" />
          <div className="col-span-4 hidden lg:block" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-[#CF6A12]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CF6A12]" />
              Security architecture
            </div>
            <h2 className="font-serif text-4xl leading-[1.04] tracking-tight-editorial sm:text-5xl lg:text-[54px]">
              Trust is checked.
              <br />
              <span className="font-normal italic text-zinc-400">
                Never assumed.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
              A signed-in session is only the beginning. Every protected request
              must pass identity, current-role, and resource-scope checks before
              Karsa reads or changes academic data.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border border-emerald-900/70 bg-emerald-950/30 p-4">
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  VERIFIED
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Return only the data allowed for that role and resource.
                </p>
              </div>
              <div className="rounded-xl border border-orange-900/60 bg-orange-950/20 p-4">
                <div className="flex items-center gap-2 font-mono text-xs text-orange-400">
                  <LockKeyhole className="h-4 w-4" />
                  UNVERIFIED
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Remove privileged claims and deny the protected operation.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 sm:p-7">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <span>Protected request / server path</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-500">
                  <span className="security-status-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Controls active
                </span>
              </div>

              <div className="relative mt-7">
                <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-zinc-800 md:block" />
                <div className="security-flow-line absolute left-[12.5%] right-[12.5%] top-5 hidden h-px origin-left bg-[#CF6A12] md:block" />

                <div className="relative grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
                  {gates.map((gate) => {
                    const Icon = gate.icon;
                    return (
                      <div
                        key={gate.number}
                        className="relative flex flex-col items-center text-center md:px-3"
                      >
                        <div
                          className="security-gate-signal relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300"
                          style={{ animationDelay: gate.delay }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="mt-4 font-mono text-[10px] text-[#CF6A12]">
                          GATE {gate.number}
                        </div>
                        <h3 className="mt-1 text-sm font-semibold text-zinc-100">
                          {gate.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                          {gate.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 border-t border-zinc-800 pt-5">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Defense in depth
                </div>
                <div className="flex flex-wrap gap-2">
                  {controls.map((control) => (
                    <span
                      key={control}
                      className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-[11px] text-zinc-400"
                    >
                      {control}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              The animation explains request order; it is not a live traffic
              monitor or a claim that any system is risk-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
