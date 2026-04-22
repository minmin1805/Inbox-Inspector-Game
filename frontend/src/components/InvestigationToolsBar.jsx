import React from "react";
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

function InvestigationToolsBar({ caseData }) {
  const findings = caseData?.toolFindings;

  return (
    <aside className="flex h-full w-full min-w-0 flex-col">
      <div className="mb-3 min-h-13 text-left sm:min-h-14">
        <h2 className="text-lg font-extrabold text-slate-800 sm:text-xl xl:text-2xl">
          Investigation Tools
        </h2>
        <p className="text-xs text-slate-600 sm:text-sm xl:text-base">
          Click each tool to reveal clues.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-300/90 bg-white p-4 shadow-sm sm:p-5 xl:p-6">
        {TOOL_CONFIG.map((tool) => {
          const text = findings?.[tool.key] || "—";
          return (
            <div
              key={tool.key}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-3 sm:p-4 xl:p-5"
            >
              <div className="mb-2 flex items-center gap-2">
                {tool.icon === "qr" ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-800 xl:h-11 xl:w-11">
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
                <span className="text-sm font-bold text-slate-800 sm:text-base xl:text-lg">
                  {tool.label}
                </span>
              </div>
              <p className="rounded-xl border border-slate-200 bg-white p-2.5 text-left text-xs leading-relaxed text-slate-700 sm:text-sm xl:text-base">
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default InvestigationToolsBar;
