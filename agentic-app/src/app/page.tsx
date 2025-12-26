import { AgentConsole } from "@/components/AgentConsole";
import { knowledgeBase } from "@/lib/knowledgeBase";

const impactMetrics = [
  { label: "Inbound calls resolved", value: "3.2K" },
  { label: "Average response time", value: "142s" },
  { label: "Farmer satisfaction", value: "94%" },
];

const missionPillars = [
  {
    title: "Real-time agronomy guidance",
    description:
      "Map the caller’s crop, region, and current season to deliver precise, field-ready instructions within seconds.",
  },
  {
    title: "Market & finance escalations",
    description:
      "Bridge farmers to FPOs, buyers, and credit partners with ready-to-use scripts and templated follow-ups.",
  },
  {
    title: "Mission Prosperous India analytics",
    description:
      "Log every call outcome against national prosperity indicators to track income uplift and risk reduction.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6fff8]/80 pb-24 pt-16 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35)_0,_rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2)_0,_rgba(15,23,42,0)_60%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
        <header className="flex flex-col gap-8 rounded-3xl border border-emerald-100/80 bg-white/70 p-10 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.8)] backdrop-blur-xl dark:border-emerald-500/20 dark:bg-slate-900/80">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700 dark:text-emerald-300">
                Mission Prosperous India
              </span>
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">
                Call centre command for farmer-first resolutions
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Equip your agri advisory desk with a bilingual response engine that understands
                every farming query, maps it to a trusted knowledge capsule, and delivers clear,
                doable actions before the call timer hits three minutes.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-left text-sm text-emerald-900 shadow-inner dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-100">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-200">
                Live readiness
              </span>
              <p>
                Knowledge capsules synced · Scripts bilingual · Escalation partners aligned.
              </p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-200">
                National helpline code: MP-AGRI-1088
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {impactMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-emerald-100 bg-white/80 p-5 text-center shadow-sm dark:border-emerald-500/20 dark:bg-slate-900/70"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-300">
                  {metric.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.3fr,1fr]">
          <AgentConsole />

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-100 bg-white/70 p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Mission-ready playbook
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Anchor your callers with a consistent conversation structure. Every interaction
                aligns to the national prosperity charter to boost income, reduce risk, and connect
                farmers with credit and market levers.
              </p>
              <ul className="mt-6 flex list-none flex-col gap-4">
                {missionPillars.map((pillar) => (
                  <li
                    key={pillar.title}
                    className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100"
                  >
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-200">
                      {pillar.title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-emerald-900/80 dark:text-emerald-100/80">
                      {pillar.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-[0_20px_60px_-35px_rgba(16,185,129,0.6)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Knowledge channels
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300">
                {knowledgeBase.slice(0, 2).map((capsule) => (
                  <div
                    key={capsule.id}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {capsule.title}
                    </p>
                    <p className="text-xs leading-relaxed">{capsule.summary}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">
                      Focus crops: {capsule.cropFocus.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                ))}
                <div className="rounded-2xl border border-dashed border-emerald-200 p-4 text-xs text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-200">
                  Last synchronized:{" "}
                  {new Date().toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  . Next audit due in 7 days.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
