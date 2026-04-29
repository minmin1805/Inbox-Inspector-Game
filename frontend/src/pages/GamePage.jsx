import React from "react";
import Header from "../components/Header";
import DMWindow from "../components/DMWindow";
import EmailWindow from "../components/EmailWindow";
import InvestigationToolsBar from "../components/InvestigationToolsBar";
import VerdictWindow from "../components/VerdictWindow";
import FeedbackPopup from "../components/FeedbackPopup";
import InstructionPopup from "../components/InstructionPopup";
import {
  InboxInspectorProvider,
  useInboxInspector,
} from "../context/InboxInspectorContext";

function GamePageContent() {
  const {
    currentCase,
    totalCases,
    isEmail,
    isLastCase,
    gameStats,
    player,
    isGradingReply,
    showFeedbackPopup,
    showInstructionPopup,
    feedbackData,
    revealedTools,
    setRevealedTools,
    trackRiskyCtaClick,
    handleInvestigationSubmit,
    handleFeedbackClose,
    openInstructionPopup,
    closeInstructionPopup,
  } = useInboxInspector();

  return (
    <div className="relative flex min-h-dvh flex-col bg-cyan-50 text-slate-900">
      <Header
        caseNumber={currentCase.caseNumber}
        totalCases={totalCases}
        currentScore={gameStats.totalScore}
        playerName={player?.name}
        onHowToPlay={openInstructionPopup}
      />

      <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:gap-10 xl:px-10 2xl:px-14">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-12 xl:gap-14 2xl:gap-16">
          <div className="min-w-0 lg:col-span-7">
            {isEmail ? (
              <div className="lg:mt-10">
                <EmailWindow
                  caseData={currentCase}
                  revealedTools={revealedTools}
                  onRiskyClick={trackRiskyCtaClick}
                />
              </div>
            ) : (
              <div className="lg:mt-10">
                <DMWindow
                  caseData={currentCase}
                  revealedTools={revealedTools}
                  onRiskyClick={trackRiskyCtaClick}
                />
              </div>
            )}
          </div>
          <div className="min-w-0 lg:col-span-5 lg:mt-10">
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

      {showInstructionPopup && (
        <InstructionPopup onClose={closeInstructionPopup} />
      )}

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
          feedbackWhyVerdict={currentCase?.feedbackWhyVerdict}
          feedbackIfYouSeeThis={currentCase?.feedbackIfYouSeeThis}
        />
      )}
    </div>
  );
}

function GamePage() {
  return (
    <InboxInspectorProvider>
      <GamePageContent />
    </InboxInspectorProvider>
  );
}

export default GamePage;
