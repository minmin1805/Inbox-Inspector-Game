import React from "react";
import mockBadge from "../assets/Image/EndgamePage/mockBadge.png";

function ScoreDisplay() {
  return (
    <section className="w-full max-w-[700px] self-start rounded-3xl border border-slate-600/70 bg-[#f7f8fb] p-5 shadow-sm sm:p-6 lg:mt-12">
      <h2 className="text-2xl font-extrabold tracking-tight text-[#25356f] sm:text-4xl">
        Your Final Score
      </h2>

      <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#eef3f8] p-4 sm:p-5">
        <img
          src={mockBadge}
          alt="Phish Shield Pro badge"
          className="h-16 w-16 shrink-0 rounded-2xl sm:h-30 sm:w-30 mr-5"
        />
        <div className="min-w-0">
          <p className="text-3xl font-extrabold leading-none text-[#22316a] sm:text-4xl">
            8920 <span className="text-2xl font-medium sm:text-3xl">out of 10000</span>
          </p>
          <p className="mt-1 text-2xl font-extrabold text-[#25356f] sm:text-3xl">
            Phish Shield Pro
          </p>
          <p className="mt-0.5 text-base text-slate-700 sm:text-lg">
            Strong evidence - biased decisions
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-lg text-slate-800 sm:text-2xl">
        <p>Correct verdicts: 9/10</p>
        <p>Reply safety score 88%</p>
      </div>
    </section>
  );
}

export default ScoreDisplay;
