import React from "react";
import { IoMdDownload } from "react-icons/io";
import logo from "../assets/Image/WelcomePage/logo.png";
import ScoreDisplay from "../components/ScoreDisplay";
import Leaderboard from "../components/Leaderboard";

function EndgamePage() {
  return (
    <div className="min-h-dvh w-full bg-[#ccffff] px-4 py-4 sm:px-7 sm:py-6">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center">
        <header className="w-full">
          <img
            src={logo}
            alt="Inbox Inspector"
            className="h-12 w-auto sm:h-14"
          />
        </header>

        <div className="mt-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#24346f] sm:text-5xl">
            Case Closed
          </h1>
          <p className="mt-1 text-xl text-slate-700 sm:text-2xl">
            You completed all 10 investigations
          </p>
        </div>

        <div className="mt-5 grid w-full grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-6">
          <ScoreDisplay />
          <Leaderboard />
        </div>

        <div className="mt-5 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
          <section className="rounded-xl bg-[#f7f8fb] p-4">
            <h2 className="text-xl font-extrabold uppercase text-[#2a376d] sm:text-2xl">
              What You Learned
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-lg text-slate-800 sm:text-xl">
              <li>Check sender and real links</li>
              <li>Pressure language is a red flag</li>
            </ul>
          </section>

          <section className="rounded-xl bg-[#f7f8fb] p-4">
            <h2 className="text-xl font-extrabold uppercase text-[#2a376d] sm:text-2xl">
              <span className="text-yellow-500">★</span> Key Takeaway
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-lg text-slate-800 sm:text-xl">
              <li>Pause before you trust.</li>
              <li>Inspect the clues,</li>
              <li>Respond with carefulness</li>
            </ul>
          </section>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#20d4d8] px-6 py-2.5 text-xl font-bold text-[#21326e] shadow-sm hover:bg-[#11c3c8] sm:text-2xl"
          >
            <IoMdDownload aria-hidden className="text-2xl" />
            Download Safety Checklist!
          </button>
          <button
            type="button"
            className="rounded-full bg-[#20d4d8] px-6 py-2.5 text-xl font-bold text-[#21326e] shadow-sm hover:bg-[#11c3c8] sm:text-2xl"
          >
            Exit To Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndgamePage;
