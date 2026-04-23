import React, { useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaLink,
  FaSearch,
  FaStar,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { FaGavel, FaPencil, FaRegEnvelope } from "react-icons/fa6";
import bigIcon from "../assets/Image/InstructionPage/bigIcon.png";

function InstructionPopup({ onClose }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const steps = [
    {
      n: 1,
      title: "Read the message",
      blurb: "Check sender identity, tone, and details before you trust it.",
      tone: "blue",
    },
    {
      n: 2,
      title: "Investigate",
      blurb: "Use tools to reveal clues. You can reveal up to 3 tools per case.",
      tone: "amber",
    },
    {
      n: 3,
      title: "Choose a verdict",
      blurb: "Classify the message as phishing, sketchy, or legitimate.",
      tone: "blue",
    },
    {
      n: 4,
      title: "Write a safe reply",
      blurb: "Do not share passwords, codes, payment details, or ID photos.",
      tone: "teal",
    },
  ];

  const tips = [
    {
      icon: <FaUser className="h-4 w-4" />,
      text: "Check who it is really from, not just the display name.",
    },
    {
      icon: <FaExclamationCircle className="h-4 w-4" />,
      text: "Watch for pressure, urgency, or fear language.",
    },
    {
      icon: <FaLink className="h-4 w-4" />,
      text: "Be careful with links and unexpected attachments.",
    },
    {
      icon: <FaCheckCircle className="h-4 w-4" />,
      text: "Verify on an official app/site or ask a trusted adult.",
    },
  ];

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-slate-950/55 p-3 sm:p-5">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-sky-200/60 bg-linear-to-b from-[#dbeaf3] via-[#f0f8ff] to-[#d8e8f2] text-[#1a2b48] shadow-[0_25px_60px_rgba(10,20,40,0.35)]">
        <button
          type="button"
          aria-label="Close instructions"
          onClick={onClose}
          className="sticky right-3 top-3 z-10 ml-auto mr-3 mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <FaTimes className="h-4 w-4" />
        </button>

        <div className="px-4 pb-6 sm:px-8 sm:pb-8">
          <section className="rounded-3xl border border-sky-200/60 bg-linear-to-r from-[#f5fbff] via-[#f0f7fc] to-[#e9f2f8] p-5 shadow-[0_18px_40px_rgba(26,43,72,0.08)] sm:p-8">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <p className="inline-flex items-center rounded-full border border-[#6eb8c8] bg-[#e2f1f5] px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-[#1a2b48] sm:text-xs">
                  HOW TO PLAY
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Inbox Inspector
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2d3f58] sm:text-base">
                  Read messages carefully, investigate clues, choose a verdict,
                  and reply safely across 10 cases.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <img
                  src={bigIcon}
                  alt="Friendly inbox illustration"
                  className="h-auto w-full max-w-[220px] object-contain"
                />
              </div>
            </div>
          </section>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <section className="rounded-2xl border border-sky-200/50 bg-[#f9fcff]/95 p-5 shadow-md">
              <h3 className="text-2xl font-extrabold">What is this game?</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2d3f58] sm:text-base">
                You will inspect emails and DMs that can be phishing, sketchy,
                or legitimate. The goal is to build safe habits before clicking
                links, downloading files, or sharing info.
              </p>

              <h4 className="mt-4 text-xl font-extrabold">Your goal</h4>
              <ul className="mt-3 space-y-3">
                {steps.map((s) => {
                  const ring =
                    s.tone === "amber"
                      ? "bg-amber-50 text-amber-900 ring-amber-200/80"
                      : s.tone === "teal"
                        ? "bg-teal-50 text-teal-900 ring-teal-200/80"
                        : "bg-sky-50 text-sky-900 ring-sky-200/80";
                  return (
                    <li key={s.n} className={`flex gap-3 rounded-xl p-3 ring-1 ${ring}`}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-[#1a2b48] ring-1 ring-sky-200/80">
                        {s.n}
                      </span>
                      <div>
                        <p className="font-bold text-[#1a2b48]">{s.title}</p>
                        <p className="text-xs text-[#3d4f66] sm:text-sm">{s.blurb}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="space-y-5">
              <div className="rounded-2xl border border-sky-200/50 bg-[#f9fcff]/95 p-5 shadow-md">
                <h3 className="text-xl font-extrabold">How a round works</h3>
                <ol className="mt-3 space-y-2 text-sm text-[#2d3f58] sm:text-base">
                  <li className="flex items-start gap-2">
                    <FaRegEnvelope className="mt-0.5 h-4 w-4 text-[#117a8a]" />
                    Read the message context.
                  </li>
                  <li className="flex items-start gap-2">
                    <FaSearch className="mt-0.5 h-4 w-4 text-[#c27803]" />
                    Reveal up to 3 tool clues.
                  </li>
                  <li className="flex items-start gap-2">
                    <FaGavel className="mt-0.5 h-4 w-4 text-[#117a8a]" />
                    Pick your verdict.
                  </li>
                  <li className="flex items-start gap-2">
                    <FaPencil className="mt-0.5 h-4 w-4 text-[#0f766e]" />
                    Submit your safe reply.
                  </li>
                </ol>
              </div>

              <div className="rounded-2xl border border-[#7cc4d4]/55 bg-linear-to-br from-[#e4f3f8] to-[#f5fbff] p-5 shadow-md">
                <h3 className="text-xl font-extrabold">How scoring works</h3>
                <p className="mt-2 text-sm text-[#2d3f58]">
                  Each case totals up to <span className="font-bold">1,000</span> points:
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex justify-between rounded-lg bg-white/85 px-3 py-2 ring-1 ring-sky-200/50">
                    <span>Verdict</span>
                    <span className="font-semibold text-[#117a8a]">up to 520</span>
                  </li>
                  <li className="flex justify-between rounded-lg bg-white/85 px-3 py-2 ring-1 ring-sky-200/50">
                    <span>Investigation efficiency</span>
                    <span className="font-semibold text-[#117a8a]">up to 180</span>
                  </li>
                  <li className="flex justify-between rounded-lg bg-white/85 px-3 py-2 ring-1 ring-sky-200/50">
                    <span>Reply quality</span>
                    <span className="font-semibold text-[#117a8a]">up to 300</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <section className="mt-5 rounded-2xl border border-amber-200/70 bg-linear-to-r from-[#fff8e6] to-[#fffcf5] p-5 shadow-md">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <FaStar className="h-5 w-5 text-amber-500" />
              Quick tips to remember
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {tips.map((t) => (
                <li
                  key={t.text}
                  className="flex gap-2 rounded-xl border border-amber-100/90 bg-white/90 p-3 text-sm text-[#2d3f58]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#1a2b48]">
                    {t.icon}
                  </span>
                  <span>{t.text}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-6 flex flex-col items-center text-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full max-w-sm rounded-2xl border-2 border-[#c9970a] bg-linear-to-b from-[#ffe566] to-[#f5c430] px-6 py-3 text-lg font-extrabold text-[#1a2b48] shadow-[0_8px_0_rgba(150,100,0,0.2)] transition hover:brightness-105"
            >
              Continue investigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructionPopup;
