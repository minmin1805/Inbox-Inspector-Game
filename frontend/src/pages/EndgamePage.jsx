import React from "react";
import { IoMdDownload } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Image/WelcomePage/logo.png";
import ScoreDisplay from "../components/ScoreDisplay";
import Leaderboard from "../components/Leaderboard";
import logo3 from "../assets/Image/WelcomePage/logo3.png";
import pdfChecklist from '../assets/PDF/pdf.pdf';

function EndgamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const fallbackRaw = sessionStorage.getItem("inboxInspectorLastResult");
  const fallback = fallbackRaw ? JSON.parse(fallbackRaw) : null;
  const result = location.state || fallback || {};

  const totalScore = Number(result.totalScore || 0);
  const correctVerdicts = Number(result.correctVerdicts || 0);
  const totalCases = Number(result.totalCases || 10);
  const replySafetyPercent = Number(result.replySafetyPercent || 0);
  // Rank title/blurb are derived from totalScore in ScoreDisplay (source of truth).

  const handleExit = () => {
    sessionStorage.removeItem("inboxInspectorLastResult");
    sessionStorage.removeItem("inboxInspectorPlayer");
    navigate("/welcome");
  };

  return (
    <div className="min-h-dvh w-full bg-[#ccffff] px-4 py-4 sm:px-7 sm:py-6">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center">
        <header className="w-full flex justify-center items-center">
          <img
            src={logo3}
            alt="Inbox Inspector"
            className="w-63 "
          />
        </header>

        <div className="mt-5 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#24346f] sm:text-3xl">
            Case Closed
          </h1>
          <p className="mt-1 text-xl text-slate-700 sm:text-2xl">
            You completed all 10 investigations
          </p>
        </div>

        <div className="mt-5 grid w-full grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-6">
          <ScoreDisplay
            totalScore={totalScore}
            maxScore={10000}
            correctVerdicts={correctVerdicts}
            totalCases={totalCases}
            replySafetyPercent={replySafetyPercent}
          />
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
            onClick={() => window.open(pdfChecklist, '_blank')}
            className="inline-flex items-center gap-2 rounded-full bg-[#20d4d8] px-6 py-2.5 text-xl font-bold text-[#21326e] shadow-sm hover:bg-[#11c3c8] sm:text-2xl"
          >
            <IoMdDownload aria-hidden className="text-2xl" />
            Download Safety Checklist!
          </button>
          <button
            type="button"
            onClick={handleExit}
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
