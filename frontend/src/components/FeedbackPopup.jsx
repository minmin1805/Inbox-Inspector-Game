import React from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { FaLightbulb } from "react-icons/fa";

const DEFAULT_WHY = {
  heading: "Read the clues",
  points: [
    "Use sender, links, and asks from your tools before picking Phishing, Sketchy, or Legit.",
  ],
};

const DEFAULT_IF_YOU_SEE = {
  heading: "In real life",
  actions: [
    "Don’t put passwords, codes, or ID in chat replies.",
    "Check real apps, sites, or a trusted contact path — not random links in the message.",
  ],
};

function FeedbackPopup({
  onClose,
  verdictCorrect = false,
  verdictScore = 0,
  scanScore = 0,
  replyScore = 0,
  caseTotal = 0,
  tip = "If unsure, verify through an official channel.",
  isLastCase = false,
  feedbackWhyVerdict = null,
  feedbackIfYouSeeThis = null,
}) {
  const why = feedbackWhyVerdict && feedbackWhyVerdict.heading
    ? feedbackWhyVerdict
    : DEFAULT_WHY;
  const ifYou = feedbackIfYouSeeThis && feedbackIfYouSeeThis.heading
    ? feedbackIfYouSeeThis
    : DEFAULT_IF_YOU_SEE;

  const verdictText = verdictCorrect
    ? "Great call - your verdict matches the clues."
    : "Not quite - compare clues next time.";

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-300 bg-[#f4f5f7] shadow-2xl sm:rounded-4xl">
        <div className="bg-[#20d4d8] px-5 py-4 text-center sm:px-8">
          <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
            How your choices landed
          </h2>
          <p className="mt-1.5 text-base font-medium text-cyan-50 sm:text-xl">
            Here&apos;s how your score was calculated
          </p>
        </div>

        <div className="space-y-4 overflow-y-auto p-4 sm:p-6">
          <section className="rounded-xl border border-slate-500/70 bg-[#eef2f6] p-4">
            <p className="text-lg font-semibold text-slate-800 sm:text-2xl">
              <span aria-hidden>{verdictCorrect ? "✅ " : "⚠️ "}</span>
              Verdict
            </p>
            <p className="mt-1.5 text-base text-slate-800 sm:text-2xl">
              {verdictText}
            </p>
          </section>

          <section className="mx-auto w-full max-w-2xl rounded-xl border border-slate-500/70 bg-[#eef2f6] p-4 sm:p-5">
            <h3 className="text-xl font-semibold text-slate-800 sm:text-3xl">
              Score breakdown
            </h3>
            <div className="mt-2.5 space-y-2.5 text-base text-slate-900 sm:text-2xl">
              <div className="flex items-center justify-between border-b border-slate-500/50 pb-2">
                <span>Verdict</span>
                <span className="font-semibold">+{verdictScore}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-500/50 pb-2">
                <span>Scan efficiency</span>
                <span className="font-semibold">+{scanScore}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-500/50 pb-2">
                <span>Safe reply quality</span>
                <span className="font-semibold">+{replyScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Case total</span>
                <span className="font-semibold">{caseTotal}/1000</span>
              </div>
            </div>
          </section>

          <section className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-slate-500/70 bg-linear-to-b from-white to-slate-50/90 p-4 text-slate-800 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">
                Learn
              </p>
              <p className="mt-1 flex items-center gap-1 text-lg font-extrabold leading-snug sm:text-2xl">
                <span className="text-cyan-600" aria-hidden>
                  <HiQuestionMarkCircle className="w-7 h-7" />
                </span>
                {why.heading}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-lg">
                {(why.points || []).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col rounded-2xl border border-slate-500/70 bg-linear-to-b from-white to-cyan-50/40 p-4 text-slate-800 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                Do this
              </p>
              <p className="mt-1 text-lg font-extrabold leading-snug sm:text-2xl">
                <span className="text-emerald-600" aria-hidden>
                  ✓{" "}
                </span>
                {ifYou.heading}
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed sm:text-lg">
                {(ifYou.actions || []).map((line, i) => (
                  <li key={i} className="pl-0.5">
                    {line}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-500/70 bg-[#d9fbff] px-4 py-3 text-slate-900 sm:px-5">
            <p className="flex items-start gap-2 text-sm font-medium sm:text-xl">
              <FaLightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400 sm:h-7 sm:w-7" />
              <span>Tip: {tip}</span>
            </p>
          </section>

          <div className="flex justify-center pt-0.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full max-w-sm rounded-2xl bg-[#20d4d8] px-8 py-2.5 text-base font-extrabold text-white shadow-sm transition hover:bg-[#13c2c8] sm:w-auto sm:text-2xl"
            >
              {isLastCase ? "Finish game" : "Next case"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPopup;
