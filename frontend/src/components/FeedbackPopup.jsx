import React from "react";

function FeedbackPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-4xl border border-slate-300 bg-[#f4f5f7] shadow-2xl">
        <div className="bg-[#20d4d8] px-5 py-4 text-center sm:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            How your choices landed
          </h2>
          <p className="mt-1.5 text-base font-medium text-cyan-50 sm:text-xl">
            Here&apos;s how your score was calculated
          </p>
        </div>

        <div className="space-y-4 overflow-y-auto p-4 sm:p-6">
          <section className="rounded-xl border border-slate-500/70 bg-[#eef2f6] p-4">
            <p className="text-xl font-semibold text-slate-800 sm:text-2xl">
              <span aria-hidden>⚠️ </span>
              Verdict
            </p>
            <p className="mt-1.5 text-lg text-slate-800 sm:text-2xl">
              Not quite - compare clues next time
            </p>
          </section>

          <section className="mx-auto w-full max-w-2xl rounded-xl border border-slate-500/70 bg-[#eef2f6] p-4 sm:p-5">
            <h3 className="text-2xl font-semibold text-slate-800 sm:text-3xl">
              Score breakdown
            </h3>
            <div className="mt-2.5 space-y-2.5 text-xl text-slate-900 sm:text-2xl">
              <div className="flex items-center justify-between border-b border-slate-500/50 pb-2">
                <span>Verdict</span>
                <span className="font-semibold">+600</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-500/50 pb-2">
                <span>Scan efficiency</span>
                <span className="font-semibold">+120</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-500/50 pb-2">
                <span>Safe reply quality</span>
                <span className="font-semibold">+200</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Case total</span>
                <span className="font-semibold">920/1000</span>
              </div>
            </div>
          </section>

          <section className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-500/70 bg-white p-4 text-slate-800">
              <p className="text-xl font-extrabold sm:text-2xl">
                <span aria-hidden>✅ </span>
                Choose verdict
              </p>
              <ul className="mt-2.5 list-disc space-y-1 pl-5 text-base sm:text-lg">
                <li>Pick Phishing, Sketchy, or Legit</li>
                <li>Base it on your scan clues</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-500/70 bg-white p-4 text-slate-800">
              <p className="text-xl font-extrabold sm:text-2xl">
                <span aria-hidden>✅ </span>
                Write a safe reply
              </p>
              <ul className="mt-2.5 list-disc space-y-1 pl-5 text-base sm:text-lg">
                <li>No passwords, codes, or ID photos</li>
                <li>Don&apos;t use risky links to prove anything</li>
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-500/70 bg-[#d9fbff] px-4 py-3 text-slate-900 sm:px-5">
            <p className="text-lg font-medium sm:text-xl">
              <span aria-hidden>❔ </span>
              Tip: if unsure, pick Sketchy and verify through an official
              channel
            </p>
          </section>

          <div className="flex justify-center pt-0.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-[#20d4d8] px-8 py-2.5 text-xl font-extrabold text-white shadow-sm transition hover:bg-[#13c2c8] sm:text-2xl"
            >
              Next case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPopup;
