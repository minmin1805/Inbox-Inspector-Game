import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DMWindow from "../components/DMWindow";
import EmailWindow from "../components/EmailWindow";
import InvestigationToolsBar from "../components/InvestigationToolsBar";
import VerdictWindow from "../components/VerdictWindow";
import FeedbackPopup from "../components/FeedbackPopup";
import levels from "../data/inboxInspectorLevels.json";

function GamePage() {
  const navigate = useNavigate();
  const cases = levels.cases;
  const [caseIndex, setCaseIndex] = useState(0);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [revealedTools, setRevealedTools] = useState([]);
  const [feedbackData, setFeedbackData] = useState(null);
  const [gameStats, setGameStats] = useState({
    totalScore: 0,
    correctVerdicts: 0,
  });

  const currentCase = useMemo(
    () => cases[caseIndex] ?? cases[0],
    [caseIndex, cases]
  );
  const totalCases = cases.length;
  const isEmail = currentCase?.channel === "email";
  const isLastCase = caseIndex === totalCases - 1;

  const scoreReply = (replyText) => {
    const text = String(replyText || "").toLowerCase();
    if (!text.trim()) return 40;

    const riskyPattern = /\b(password|passcode|otp|code|gift card|id|ssn|bank|send money|wire)\b/;
    const safePattern = /\b(verify|official|app|website|trusted|report|ignore|won't|will not|in person)\b/;

    let score = 110;
    if (riskyPattern.test(text)) score -= 90;
    if (safePattern.test(text)) score += 70;
    if (text.length > 150) score += 20;

    return Math.max(0, Math.min(200, score));
  };

  const handleInvestigationSubmit = ({ verdict, reply }) => {
    const verdictCorrect = verdict === currentCase.correctVerdict;
    const verdictScore = verdictCorrect ? 600 : 220;
    const scanScore = Math.max(0, 3 - revealedTools.length) * 120;
    const replyScore = scoreReply(reply);
    const caseTotal = Math.min(1000, verdictScore + scanScore + replyScore);
    const nextTotalScore = gameStats.totalScore + caseTotal;
    const nextCorrectVerdicts = gameStats.correctVerdicts + (verdictCorrect ? 1 : 0);

    setGameStats({
      totalScore: nextTotalScore,
      correctVerdicts: nextCorrectVerdicts,
    });

    setFeedbackData({
      verdictCorrect,
      verdictScore,
      scanScore,
      replyScore,
      caseTotal,
      tip: currentCase?.coachTip || "If unsure, verify through an official channel.",
      nextTotalScore,
      nextCorrectVerdicts,
    });
    setShowFeedbackPopup(true);
  };

  const handleFeedbackClose = () => {
    setShowFeedbackPopup(false);
    setRevealedTools([]);

    if (isLastCase) {
      navigate("/endgame", {
        state: {
          totalScore: feedbackData.nextTotalScore,
          correctVerdicts: feedbackData.nextCorrectVerdicts,
          totalCases,
        },
      });
      return;
    }
    setCaseIndex((prev) => prev + 1);
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-cyan-50 text-slate-900">
      <Header caseNumber={currentCase.caseNumber} totalCases={totalCases} />

      <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:gap-10 xl:px-10 2xl:px-14">
        {/* Dev-only: does not affect main layout (reference image 2) */}
        {import.meta.env.DEV && (
          <div
            className="fixed bottom-3 right-3 z-50 flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 px-2 py-1.5 text-xs shadow-md"
            role="region"
            aria-label="Developer preview"
          >
            <span className="text-slate-500">Preview</span>
            <button
              type="button"
              onClick={() => setCaseIndex(0)}
              className="rounded bg-slate-100 px-2 py-0.5 font-medium hover:bg-slate-200"
            >
              Case 1 DM
            </button>
            <button
              type="button"
              onClick={() => setCaseIndex(3)}
              className="rounded bg-slate-100 px-2 py-0.5 font-medium hover:bg-slate-200"
            >
              Case 4 email
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-12 xl:gap-14 2xl:gap-16">
          <div className="min-w-0 lg:col-span-7">
            {isEmail ? (
              <div className="lg:mt-10">
                <EmailWindow caseData={currentCase} />
              </div>
            ) : (
              <div className="lg:mt-10">
                <DMWindow caseData={currentCase} />
              </div>
            )}
          </div>
          <div className="min-w-0 lg:col-span-5">
            <InvestigationToolsBar
              caseData={currentCase}
              onRevealedToolsChange={setRevealedTools}
            />
          </div>
        </div>

        <div className="w-full pb-6 sm:pb-8">
          <VerdictWindow
            caseData={currentCase}
            onSubmit={handleInvestigationSubmit}
          />
        </div>
      </main>

      {showFeedbackPopup && feedbackData && (
        <FeedbackPopup
          onClose={handleFeedbackClose}
          verdictCorrect={feedbackData.verdictCorrect}
          verdictScore={feedbackData.verdictScore}
          scanScore={feedbackData.scanScore}
          replyScore={feedbackData.replyScore}
          caseTotal={feedbackData.caseTotal}
          tip={feedbackData.tip}
          isLastCase={isLastCase}
        />
      )}
    </div>
  );
}

export default GamePage;
