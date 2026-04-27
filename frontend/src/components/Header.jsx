import React from "react";
import { Link } from "react-router-dom";
import logo3 from "../assets/Image/WelcomePage/logo3.png";

function Header({
  caseNumber = 1,
  totalCases = 10,
  currentScore = 0,
  playerName,
  onHowToPlay,
}) {
  return (
    <header className="w-full border-b border-cyan-100/90 bg-[#afdfff] px-4 py-3 sm:px-6">
      <div className="mx-auto w-full">
        {/* Default layout (same structure as big screens) */}
        <div className="flex items-center justify-between gap-3 max-[425px]:hidden">
          <img
            src={logo3}
            alt="Inbox Inspector"
            className="w-full max-w-[200px]"
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
            {onHowToPlay ? (
              <button
                type="button"
                onClick={onHowToPlay}
                className="shrink-0 rounded-xl bg-slate-200/80 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-200 sm:px-4 sm:py-2 sm:text-xl"
              >
                How to play
              </button>
            ) : (
              <Link
                to="/instruction"
                className="shrink-0 rounded-xl bg-slate-200/80 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-200 sm:px-4 sm:py-2 sm:text-xl"
              >
                How to play
              </Link>
            )}
          </div>
        </div>

        {/* Narrow layout (<=425px): left and right stacked columns */}
        <div className="hidden grid-cols-2 gap-2 max-[425px]:grid">
          <div className="flex min-w-0 flex-col items-start gap-1.5">
            <img
              src={logo3}
              alt="Inbox Inspector"
              className="w-full max-w-[120px]"
            />
            <h1 className="text-left text-xs font-extrabold leading-tight tracking-tight text-slate-800">
              Case {caseNumber} of {totalCases}
            </h1>
          </div>

          <div className="flex min-w-0 flex-col items-end gap-1.5">
            <div className="w-full max-w-[130px] rounded-lg border border-slate-500/20 bg-white/80 px-2 py-1 text-right shadow-sm">
              {playerName ? (
                <p className="truncate text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                  {playerName}
                </p>
              ) : null}
              <p className="text-[11px] font-extrabold text-slate-800">
                Score: {currentScore}
              </p>
            </div>
            {onHowToPlay ? (
              <button
                type="button"
                onClick={onHowToPlay}
                className="w-full max-w-[130px] rounded-lg bg-slate-200/80 px-2 py-1 text-[11px] font-bold text-slate-800 shadow-sm transition hover:bg-slate-200"
              >
                How to play
              </button>
            ) : (
              <Link
                to="/instruction"
                className="w-full max-w-[130px] rounded-lg bg-slate-200/80 px-2 py-1 text-center text-[11px] font-bold text-slate-800 shadow-sm transition hover:bg-slate-200"
              >
                How to play
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
