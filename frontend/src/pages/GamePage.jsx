import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DMWindow from "../components/DMWindow";
import EmailWindow from "../components/EmailWindow";
import InvestigationToolsBar from "../components/InvestigationToolsBar";
import VerdictWindow from "../components/VerdictWindow";
import FeedbackPopup from "../components/FeedbackPopup";
import levels from "../data/inboxInspectorLevels.json";
import { gradeInboxReply, updatePlayer } from "../services/playerService";

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
  const [isGradingReply, setIsGradingReply] = useState(false);

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

  const scoreReplyWithAI = async (replyText) => {
    const localScore = scoreReply(replyText);
    const text = String(replyText || "").trim();
    const lower = text.toLowerCase();

    // Hard local penalties for blank/gibberish before AI.
    const noWhitespace = text.toLowerCase().replace(/\s+/g, "");
    const uniqueRatio =
      noWhitespace.length > 0 ? new Set(noWhitespace).size / noWhitespace.length : 0;
    const alphaRatio =
      noWhitespace.length > 0
        ? noWhitespace.replace(/[^a-z]/g, "").length / noWhitespace.length
        : 0;
    const looksLikeGibberish =
      text.length > 0 &&
      (text.length < 8 ||
        uniqueRatio < 0.22 ||
        alphaRatio < 0.45 ||
        /(.)\1{4,}/.test(noWhitespace));

    if (!text || looksLikeGibberish) {
      return {
        replyScore: Math.min(localScore, 40),
        aiCoachTip:
          "Your reply should be clear and specific. Avoid blank or random text.",
      };
    }

    // Strong deterministic penalties for unsafe advice, especially in phishing/sketchy levels.
    const riskyActionPattern =
      /\b(click|tap|open|use)\b.{0,40}\b(link|button|url)\b|\bsend\b.{0,30}\b(code|otp|id|money|payment)\b|\bshare\b.{0,30}\b(code|password|id)\b/i;
    const trustsMessagePattern =
      /\b(this|it|message)\b.{0,20}\b(legit|safe|trusted|real)\b|\bi\s*(will|would)\s*(click|tap|open)\b/i;
    const encouragesUnsafe =
      riskyActionPattern.test(text) || trustsMessagePattern.test(text);

    if (currentCase.correctVerdict !== "legit" && encouragesUnsafe) {
      return {
        replyScore: 15,
        aiCoachTip:
          "Unsafe plan detected. For suspicious messages, do not click links/buttons; verify through official channels.",
      };
    }

    if (currentCase.correctVerdict === "legit" && riskyActionPattern.test(text) && /send|share|code|password|id|money|payment/i.test(lower)) {
      return {
        replyScore: 45,
        aiCoachTip:
          "Even when messages look legit, never share sensitive details in replies.",
      };
    }

    try {
      const ai = await gradeInboxReply({
        caseId: currentCase.id,
        playerReply: text,
        channel: currentCase.channel,
        correctVerdict: currentCase.correctVerdict,
        theme: currentCase.theme,
      });

      const bandBonus = ai.replySafetyBand === "strong" ? 70 : ai.replySafetyBand === "ok" ? 25 : -70;
      const credentialPenalty = ai.sharesCredentials ? -80 : 0;
      const blended = Math.max(0, Math.min(300, localScore + bandBonus + credentialPenalty));

      return {
        replyScore: blended,
        aiCoachTip: ai.coachTip,
      };
    } catch {
      return {
        replyScore: localScore,
        aiCoachTip: "Use clear safe actions and avoid sharing sensitive details.",
      };
    }
  };

  const handleInvestigationSubmit = async ({ verdict, reply }) => {
    if (isGradingReply) return;
    setIsGradingReply(true);
    const verdictCorrect = verdict === currentCase.correctVerdict;
    const verdictScore = verdictCorrect ? 520 : 180;
    const scanScore = Math.max(0, 3 - revealedTools.length) * 60;
    const { replyScore, aiCoachTip } = await scoreReplyWithAI(reply);
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
      tip:
        aiCoachTip ||
        currentCase?.coachTip ||
        "If unsure, verify through an official channel.",
      nextTotalScore,
      nextCorrectVerdicts,
      nextTotalReplyScore,
    });
    setShowFeedbackPopup(true);
    setIsGradingReply(false);
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
            isSubmitting={isGradingReply}
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
