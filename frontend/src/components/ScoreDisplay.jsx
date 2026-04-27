import React from "react";
import inboxMasterBadge from "../assets/Image/EndgamePage/inboxMasterBadge.png";
import caseAnalystBadge from "../assets/Image/EndgamePage/caseAnalystBadge.png";
import inboxRookieBadge from "../assets/Image/EndgamePage/inboxRookieBadge.png";
import { getInboxInspectorRankByScore } from "../utils/inboxInspectorBadges.js";

const BADGE_IMAGES = {
  master: inboxMasterBadge,
  analyst: caseAnalystBadge,
  rookie: inboxRookieBadge,
};

function ScoreDisplay({
  totalScore = 0,
  maxScore = 10000,
  correctVerdicts = 0,
  totalCases = 10,
  replySafetyPercent = 0,
}) {
  const rank = getInboxInspectorRankByScore(totalScore);
  const badgeSrc = BADGE_IMAGES[rank.id];
  const badgeAlt = `${rank.title} badge`;

  return (
    <section className="w-full max-w-[700px] self-start rounded-3xl border border-slate-600/70 bg-[#f7f8fb] p-4 shadow-sm sm:p-6 lg:mt-12">
      <h2 className="text-xl font-extrabold tracking-tight text-[#25356f] sm:text-4xl">
        Your Final Score
      </h2>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#eef3f8] p-3 sm:mt-5 sm:gap-4 sm:p-5">
        <img
          src={badgeSrc}
          alt={badgeAlt}
          className="h-14 w-14 shrink-0 rounded-2xl sm:mr-5 sm:h-30 sm:w-30"
        />
        <div className="min-w-0">
          <p className="text-2xl font-extrabold leading-none text-[#22316a] sm:text-4xl">
            {totalScore}{" "}
            <span className="text-lg font-medium sm:text-3xl">
              out of {maxScore}
            </span>
          </p>
          <p className="mt-1 text-xl font-extrabold text-[#25356f] sm:text-3xl">
            {rank.title}
          </p>
          <p className="mt-0.5 text-sm text-slate-700 sm:text-lg">
            {rank.blurb}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5 text-sm text-slate-800 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:text-2xl">
        <p>
          Correct verdicts: {correctVerdicts}/{totalCases}
        </p>
        <p>Reply safety score {replySafetyPercent}%</p>
      </div>
    </section>
  );
}

export default ScoreDisplay;
