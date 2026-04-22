import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DMWindow from "../components/DMWindow";
import EmailWindow from "../components/EmailWindow";
import InvestigationToolsBar from "../components/InvestigationToolsBar";
import VerdictWindow from "../components/VerdictWindow";
import FeedbackPopup from "../components/FeedbackPopup";
import levels from "../data/inboxInspectorLevels.json";
import { updatePlayer } from "../services/playerService";

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
    totalReplyScore: 0,
  });
  const [player, setPlayer] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const currentCase = useMemo(
    () => cases[caseIndex] ?? cases[0],
    [caseIndex, cases]
  );
  const totalCases = cases.length;
  const isEmail = currentCase?.channel === "email";
  const isLastCase = caseIndex === totalCases - 1;

  useEffect(() => {
    const playerRaw = sessionStorage.getItem("inboxInspectorPlayer");
    if (!playerRaw) {
      navigate("/welcome", { replace: true });
      return;
    }

    try {
      setPlayer(JSON.parse(playerRaw));
    } catch {
      navigate("/welcome", { replace: true });
    }
  }, [navigate]);

  const scoreReply = (replyText) => {
    const text = String(replyText || "").toLowerCase();
    if (!text.trim()) return 60;

    const riskyPattern = /\b(password|passcode|otp|code|gift card|id|ssn|bank|send money|wire)\b/;
    const safePattern = /\b(verify|official|app|website|trusted|report|ignore|won't|will not|in person)\b/;

    let score = 160;
    if (riskyPattern.test(text)) score -= 130;
    if (safePattern.test(text)) score += 100;
    if (text.length > 150) score += 40;

    return Math.max(0, Math.min(300, score));
  };

  const handleInvestigationSubmit = ({ verdict, reply }) => {
    const verdictCorrect = verdict === currentCase.correctVerdict;
    const verdictScore = verdictCorrect ? 520 : 180;
    const scanScore = Math.max(0, 3 - revealedTools.length) * 60;
    const replyScore = scoreReply(reply);
    const caseTotal = Math.min(1000, verdictScore + scanScore + replyScore);
    const nextTotalScore = gameStats.totalScore + caseTotal;
    const nextCorrectVerdicts = gameStats.correctVerdicts + (verdictCorrect ? 1 : 0);
    const nextTotalReplyScore = gameStats.totalReplyScore + replyScore;

    setGameStats({
      totalScore: nextTotalScore,
      correctVerdicts: nextCorrectVerdicts,
      totalReplyScore: nextTotalReplyScore,
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
      nextTotalReplyScore,
    });
    setShowFeedbackPopup(true);
  };

  const getBadgeFromScore = (score) => {
    if (score >= 8500) {
      return {
        title: "Phish Shield Pro",
        blurb: "Strong evidence-based decisions",
      };
    }
    if (score >= 6500) {
      return {
        title: "Phish Shield Plus",
        blurb: "Solid instincts with room to improve",
      };
    }
    return {
      title: "Phish Shield Starter",
      blurb: "Good effort — keep practicing your checks",
    };
  };

  const finalizeRunAndGoEndgame = async () => {
    if (!feedbackData) return;
    const finalScore = feedbackData.nextTotalScore;
    const finalCorrect = feedbackData.nextCorrectVerdicts;
    const replySafetyPercent = Math.round(
      (feedbackData.nextTotalReplyScore / (totalCases * 300)) * 100
    );
    const badge = getBadgeFromScore(finalScore);

    const resultState = {
      totalScore: finalScore,
      correctVerdicts: finalCorrect,
      totalCases,
      replySafetyPercent,
      badgeTitle: badge.title,
      badgeBlurb: badge.blurb,
      playerName: player?.name || "Player",
    };

    sessionStorage.setItem(
      "inboxInspectorLastResult",
      JSON.stringify(resultState)
    );

    if (player?.id) {
      try {
        await updatePlayer(player.id, {
          inboxInspectorTotalScore: finalScore,
          inboxInspectorCorrectDecisions: finalCorrect,
          inboxInspectorBadge: badge.title,
          inboxInspectorCompletedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Failed to persist inbox inspector results:", error);
      }
    }

    navigate("/endgame", { state: resultState });
  };

  const handleFeedbackClose = async () => {
    if (isFinalizing) return;
    setShowFeedbackPopup(false);
    setRevealedTools([]);

    if (isLastCase) {
      setIsFinalizing(true);
      await finalizeRunAndGoEndgame();
      setIsFinalizing(false);
      return;
    }
    setCaseIndex((prev) => prev + 1);
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-cyan-50 text-slate-900">
      <Header
        caseNumber={currentCase.caseNumber}
        totalCases={totalCases}
        currentScore={gameStats.totalScore}
        playerName={player?.name}
      />

      <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:gap-10 xl:px-10 2xl:px-14">
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
