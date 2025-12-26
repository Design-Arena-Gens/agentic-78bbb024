"use client";

import { useMemo, useState } from "react";
import { AgentContext, getAgentResponse } from "@/lib/agent";
import { knowledgeBase } from "@/lib/knowledgeBase";

type Message = {
  role: "farmer" | "agent";
  text: string;
  timestamp: number;
};

const QUICK_PROMPTS = [
  "My cotton crop leaves are curling with small insects. What should I spray?",
  "How often should I irrigate sugarcane with drip during peak summer?",
  "Mandis are paying low for tomatoes. Any buyers offering better prices?",
  "Need a soil plan to increase organic carbon before next paddy season.",
];

const LANGUAGES: { code: "en" | "hi"; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

const formatTime = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

export function AgentConsole() {
  const [callerName, setCallerName] = useState("");
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [language, setLanguage] = useState<AgentContext["language"]>("en");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const knowledgeHighlights = useMemo(() => knowledgeBase.slice(0, 3), []);

  const handleSubmit = async (prompt?: string) => {
    const activeQuestion = prompt ?? question.trim();
    if (!activeQuestion) {
      return;
    }

    setIsProcessing(true);

    const farmerMessage: Message = {
      role: "farmer",
      text: activeQuestion,
      timestamp: new Date().getTime(),
    };

    setMessages((prev) => [...prev, farmerMessage]);
    setQuestion("");

    const response = getAgentResponse(activeQuestion, {
      crop,
      state,
      language,
    });

    const agentMessage: Message = {
      role: "agent",
      text: [
        response.headline,
        "",
        response.summary,
        response.detailedPlan.length
          ? [
              "",
              "Action steps:",
              ...response.detailedPlan.map(
                (line, index) => `${index + 1}. ${line}`
              ),
            ].join("\n")
          : "",
        response.seasonalNotes.length
          ? ["", "Seasonal watch-outs:", ...response.seasonalNotes].join(
              "\n- "
            )
          : "",
        response.improvementTips.length
          ? ["", "Pro tips:", ...response.improvementTips].join("\n- ")
          : "",
        response.suggestedFollowUps.length
          ? ["", "Need from farmer:", ...response.suggestedFollowUps].join(
              "\n- "
            )
          : "",
        "",
        `Confidence score: ${(response.confidence * 100).toFixed(0)}%`,
      ]
        .filter(Boolean)
        .join("\n"),
      timestamp: new Date().getTime() + 100,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, agentMessage]);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <section className="flex w-full flex-col gap-6 rounded-3xl border border-white/10 bg-white/40 p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.4)] backdrop-blur-lg dark:border-white/5 dark:bg-slate-900/60">
      <header className="flex flex-col gap-2">
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-300">
          Call Simulation Desk
        </span>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Mission Prosperous India Assistance Console
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Capture key caller details, type the farmer&apos;s query, and dispatch an
          actionable response within the first 180 seconds of the call.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Caller name
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            value={callerName}
            onChange={(event) => setCallerName(event.target.value)}
            placeholder="e.g. Sunita Devi"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          State / district
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            value={state}
            onChange={(event) => setState(event.target.value)}
            placeholder="e.g. Akola, Maharashtra"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Crop focus
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            value={crop}
            onChange={(event) => setCrop(event.target.value)}
            placeholder="e.g. Cotton"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Interaction language
          <select
            className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as AgentContext["language"])
            }
          >
            {LANGUAGES.map((entry) => (
              <option key={entry.code} value={entry.code}>
                {entry.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-left text-xs font-medium text-emerald-700 transition hover:border-emerald-200 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-300/50"
            onClick={() => handleSubmit(prompt)}
            disabled={isProcessing}
          >
            {prompt}
          </button>
        ))}
      </div>

      <label className="flex flex-col gap-2 text-sm">
        Farmer&apos;s question
        <textarea
          className="h-28 resize-none rounded-2xl border border-slate-200 px-3 py-3 text-base text-slate-800 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Summarise the issue the farmer is facing..."
        />
      </label>

      <button
        type="button"
        onClick={() => handleSubmit()}
        disabled={isProcessing}
        className="flex items-center justify-center gap-3 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-emerald-400 dark:bg-emerald-500 dark:hover:bg-emerald-400"
      >
        {isProcessing ? "Analysing scenario..." : "Generate response"}
      </button>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl border border-white/40 bg-white/70 p-4 text-sm leading-relaxed text-slate-800 shadow-inner dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Live call notes
          </h3>
          <div className="flex h-72 flex-col gap-3 overflow-y-auto pr-1">
            {messages.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">
                Capture call details here. Start with the farmer&apos;s question, then
                let the mission assistant craft a response plan.
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={`${message.role}-${message.timestamp}`}
                  className={`flex flex-col gap-1 rounded-2xl border p-3 ${
                    message.role === "farmer"
                      ? "border-emerald-100 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                      : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <span>
                      {message.role === "farmer" ? "Farmer" : "Agent"}
                      {message.role === "farmer" && callerName
                        ? ` · ${callerName}`
                        : ""}
                    </span>
                    <span>{formatTime(message.timestamp)}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-200">
                    {message.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-3 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
            Knowledge capsule
          </h3>
          {knowledgeHighlights.map((card) => (
            <div
              key={card.id}
              className="flex flex-col gap-2 rounded-xl bg-white/70 p-3 shadow-sm dark:bg-emerald-500/5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                {card.title}
              </p>
              <p className="text-xs text-emerald-900/80 dark:text-emerald-100/80">
                {card.summary}
              </p>
              <div className="flex flex-wrap gap-1">
                {card.cropFocus.slice(0, 3).map((cropLabel) => (
                  <span
                    key={cropLabel}
                    className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100"
                  >
                    {cropLabel}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-emerald-200/60 p-3 dark:border-emerald-400/30">
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">
              Escalation playbook
            </p>
            <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-[11px] leading-relaxed">
              <li>Log unresolved cases in CRM within 5 minutes.</li>
              <li>Schedule field officer visit when pest loss &gt; 20%.</li>
              <li>Connect to agri-finance partner for credit relief.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
