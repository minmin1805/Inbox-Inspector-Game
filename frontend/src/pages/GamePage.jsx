import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import DMWindow from "../components/DMWindow";
import EmailWindow from "../components/EmailWindow";
import InvestigationToolsBar from "../components/InvestigationToolsBar";
import VerdictWindow from "../components/VerdictWindow";
import FeedbackPopup from "../components/FeedbackPopup";
import levels from "../data/inboxInspectorLevels.json";

function GamePage() {
  const cases = levels.cases;
  /** Start on case 4 (email) for layout mock; change index to try DM (e.g. 0 = prize DM). */
  const [caseIndex, setCaseIndex] = useState(3);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const currentCase = useMemo(
    () => cases[caseIndex] ?? cases[0],
    [caseIndex, cases]
  );
  const totalCases = cases.length;
  const isEmail = currentCase?.channel === "email";

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
          <div className="min-w-0 lg:col-span-7 lg:mt-40">
            {isEmail ? (
              <EmailWindow caseData={currentCase} />
            ) : (
              <DMWindow caseData={currentCase} />
            )}
          </div>
          <div className="min-w-0 lg:col-span-5">
            <InvestigationToolsBar caseData={currentCase} />
          </div>
        </div>

        <div className="w-full pb-6 sm:pb-8">
          <VerdictWindow
            caseData={currentCase}
            onSubmit={() => {
              setShowFeedbackPopup(true);
            }}
          />
        </div>
      </main>

      {showFeedbackPopup && (
        <FeedbackPopup onClose={() => setShowFeedbackPopup(false)} />
      )}
    </div>
  );
}

export default GamePage;
