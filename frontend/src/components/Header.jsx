import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Image/WelcomePage/logo.png";

function Header({
  caseNumber = 1,
  totalCases = 10,
  currentScore = 0,
  playerName,
}) {
  return (
    <header className="w-full border-b border-cyan-100/90 bg-[#afdfff] px-4 py-5 sm:px-6">
      <div className="mx-auto flex w-full items-center justify-between gap-3">
        <img
          src={logo}
          alt="Inbox Inspector"
          className="h-10 w-auto shrink-0 rounded-lg border border-slate-400/30 bg-white p-1.5 sm:h-15"
        />
        <h1 className="min-w-0 text-center text-lg font-extrabold tracking-tight text-slate-800 sm:text-3xl">
          Case {caseNumber} of {totalCases}
        </h1>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="rounded-xl border border-slate-500/20 bg-white/80 px-3 py-1.5 text-right shadow-sm sm:px-4 sm:py-2">
            {playerName ? (
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                {playerName}
              </p>
            ) : null}
            <p className="text-sm font-extrabold text-slate-800 sm:text-xl">
              Score: {currentScore}
            </p>
          </div>
          <Link
            to="/instruction"
            className="shrink-0 rounded-xl bg-slate-200/80 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-200 sm:px-4 sm:py-2 sm:text-xl"
          >
            How to play
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
