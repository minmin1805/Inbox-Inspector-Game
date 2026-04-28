import React, { useEffect, useState } from "react";
import { FaQrcode } from "react-icons/fa";
import senderCheckIcon from "../assets/Image/GamePage/senderCheck.png";
import linkPreviewIcon from "../assets/Image/GamePage/linkPreview.png";
import urgencyDetectorIcon from "../assets/Image/GamePage/urgencyDetector.png";
import askDetectorIcon from "../assets/Image/GamePage/askDetector.png";

const TOOL_CONFIG = [
  { key: "senderCheck", label: "Sender Check", icon: senderCheckIcon },
  { key: "linkPreview", label: "Link Preview", icon: linkPreviewIcon },
  { key: "urgencyDetector", label: "Urgency Detector", icon: urgencyDetectorIcon },
  { key: "askDetector", label: "Ask Detector", icon: askDetectorIcon },
  { key: "attachmentQrCheck", label: "Attachment / QR", icon: "qr" },
];

const MAX_REVEALS_PER_CASE = 3;

function InvestigationToolsBar({ caseData, onRevealedToolsChange }) {
  const findings = caseData?.toolFindings;
  const [revealedTools, setRevealedTools] = useState([]);

  useEffect(() => {
    setRevealedTools([]);
  }, [caseData?.id]);

  useEffect(() => {
    onRevealedToolsChange?.(revealedTools);
  }, [revealedTools, onRevealedToolsChange]);

  const handleReveal = (toolKey) => {
    setRevealedTools((prev) => {
      if (prev.includes(toolKey)) return prev;
      if (prev.length >= MAX_REVEALS_PER_CASE) return prev;
      return [...prev, toolKey];
    });
  };

  return (
    <aside className="flex h-full w-full min-w-0 flex-col">
      <div className="rounded-2xl border border-slate-300/90 bg-white p-3 text-left shadow-sm sm:p-4">
        <div className="mb-3 border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-800 sm:text-2xl xl:text-3xl">
            Investigation Tools
          </h2>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700 sm:text-base">
              Click tools to reveal clues
            </p>
            <span className="shrink-0 rounded-full border border-cyan-300 bg-white px-3 py-1 text-sm font-extrabold text-cyan-800 sm:text-base">
              {revealedTools.length}/{MAX_REVEALS_PER_CASE} used
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            You can reveal up to {MAX_REVEALS_PER_CASE} per case.
          </p>
        </div>

        <div className="space-y-2.5">
          {TOOL_CONFIG.map((tool) => {
          const text = findings?.[tool.key] || "—";
          const isRevealed = revealedTools.includes(tool.key);
          const revealLimitReached =
            revealedTools.length >= MAX_REVEALS_PER_CASE && !isRevealed;
          return (
            <div
              key={tool.key}
              className={`rounded-2xl border p-2.5 transition-all duration-200 sm:p-3 ${
                isRevealed
                  ? "border-cyan-300 bg-cyan-50/70 shadow-sm shadow-cyan-100"
                  : "border-slate-200/90 bg-slate-50/80"
              }`}
            >
              <button
                type="button"
                onClick={() => handleReveal(tool.key)}
                disabled={revealLimitReached}
                className={`mb-1.5 flex w-full items-center gap-2 rounded-xl px-1 py-1 text-left transition ${
                  revealLimitReached
                    ? "cursor-not-allowed opacity-55"
                    : isRevealed
                    ? "bg-cyan-100/70 ring-1 ring-cyan-200"
                    : "hover:bg-indigo-100 hover:ring-1 hover:ring-indigo-300 hover:shadow-md hover:shadow-indigo-200/60 active:scale-[0.99]"
                }`}
              >
                {tool.icon === "qr" ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-200 text-purple-800 xl:h-11 xl:w-11">
                    <FaQrcode className="h-6 w-6 xl:h-7 xl:w-7" />
                  </span>
                ) : (
                  <img
                    src={tool.icon}
                    alt=""
                    className="h-10 w-10 rounded-lg object-contain xl:h-11 xl:w-11"
                    aria-hidden
                  />
                )}
                <span className="text-sm font-bold text-slate-800 sm:text-[15px]">
                  {tool.label}
                </span>
                {isRevealed && (
                  <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                    Revealed
                  </span>
                )}
              </button>

              {isRevealed ? (
                <p className="rounded-xl border border-slate-200 bg-white p-2 text-left text-xs leading-relaxed text-slate-700 sm:text-sm">
                  {text}
                </p>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-200 bg-white/70 p-2 text-left text-xs leading-relaxed text-slate-400 sm:text-sm">
                  Click to reveal this clue.
                </p>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </aside>
  );
}

export default InvestigationToolsBar;
