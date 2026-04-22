import React, { useEffect, useState } from "react";
import phishingIcon from "../assets/Image/GamePage/phishingIcon.png";
import sketchyIcon from "../assets/Image/GamePage/sketchyIcon.png";
import legitIcon from "../assets/Image/GamePage/legitIcon.png";

const VERDICTS = [
  { id: "phishing", label: "Phishing", icon: phishingIcon, accent: "phishing" },
  {
    id: "sketchy_verify",
    label: "Sketchy / verify first",
    icon: sketchyIcon,
    accent: "sketchy",
  },
  { id: "legit", label: "Legit", icon: legitIcon, accent: "legit" },
];

function VerdictWindow({ caseData, onSubmit }) {
  const [selected, setSelected] = useState("phishing");
  const [reply, setReply] = useState(() => caseData?.starterReply || "");

  useEffect(() => {
    setSelected("phishing");
    setReply(caseData?.starterReply || "");
  }, [caseData?.id, caseData?.starterReply]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onSubmit?.({ verdict: selected, reply });
  };

  return (
    <div className="w-full rounded-2xl border border-amber-200/90 bg-[#fef9ef] p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 text-center text-2xl font-extrabold text-slate-800 sm:text-3xl">
        Your verdict
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {VERDICTS.map((v) => {
          const isSelected = selected === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelected(v.id)}
              className={[
                "relative flex min-h-34 flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 text-center transition",
                isSelected
                  ? "border-slate-700 bg-slate-800 text-white shadow-lg ring-2 ring-slate-600/30"
                  : "border-slate-300/90 bg-white text-slate-800 hover:border-slate-400",
              ].join(" ")}
            >
              {isSelected && (
                <span className="absolute right-2 top-2 rounded-md bg-white/95 px-2 py-0.5 text-xs font-bold text-slate-800">
                  Selected
                </span>
              )}
              <img
                src={v.icon}
                alt=""
                className={[
                  "h-12 w-12 object-contain",
                  isSelected ? "drop-shadow" : "opacity-90",
                ].join(" ")}
              />
              <span className="text-sm font-bold leading-tight sm:text-base">
                {v.label}
              </span>
            </button>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 border-t border-amber-200/80 pt-5"
      >
        <p className="mb-2 text-center text-sm italic text-slate-600 sm:text-base">
          Please put what action you would actually take in this situation.
        </p>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
          <label className="sr-only" htmlFor="inbox-reply">
            Your response
          </label>
          <input
            id="inbox-reply"
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type a safe response…"
            className="min-h-11 w-full flex-1 rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-slate-800 shadow-inner outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-sky-600 px-5 py-2.5 text-base font-extrabold text-white shadow-md transition hover:bg-sky-700 sm:px-8"
          >
            Submit investigation
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerdictWindow;
