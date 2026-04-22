import React from "react";
import pdfImage from "../assets/Image/GamePage/pdfImage.png";
import clickHereButton from "../assets/Image/GamePage/clickHereButton.png";
import checkIcon from "../assets/Image/GamePage/checkIcon.png";

/**
 * Renders the incoming email card from a case object (inboxInspectorLevels.json).
 */
function EmailWindow({ caseData }) {
  if (!caseData) {
    return (
      <div className="rounded-3xl border-2 border-slate-300/80 bg-white p-6 shadow-sm">
        <p className="text-slate-600">No case data.</p>
      </div>
    );
  }

  const { sender, message, graphics } = caseData;
  const pdf = graphics?.pdfAttachment;
  const cta = message?.primaryCta;

  const bodyLines = (message?.body || "")
    .split("\n")
    .filter((line) => line.length > 0);

  return (
    <section className="h-full w-full min-w-0">
      <div className="mb-3 min-h-13 flex items-center gap-2 pl-0.5 sm:min-h-14">
        <img src={checkIcon} alt="" className="h-9 w-9 shrink-0" aria-hidden />
        <h2 className="text-lg font-extrabold text-slate-800 sm:text-2xl">
          Incoming Email
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-300/90 bg-white p-5 shadow-sm sm:p-6 xl:p-7 2xl:p-8">
        <div className="mb-4 flex items-start justify-between gap-2 border-b border-slate-200/90 pb-3">
          <div className="min-w-0 space-y-2 text-left text-sm sm:text-base xl:text-lg">
            <p className="text-slate-800 leading-relaxed xl:leading-loose">
              <span className="font-bold">From: </span>
              <span className="font-medium">{sender?.displayName}</span>
            </p>
            <p className="text-slate-800">
              <span className="font-bold">To: </span>
              <span className="inline-block rounded-full bg-sky-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">
                {sender?.toPlaceholder || "you@email.com"}
              </span>
            </p>
            <p className="text-slate-800">
              <span className="font-bold">Subject: </span>
              <span className="font-semibold text-slate-900">
                {message?.subject || ""}
              </span>
            </p>
          </div>
          <span className="shrink-0 text-sm font-medium text-slate-500">Now</span>
        </div>

        <div className="space-y-3 text-left leading-relaxed text-slate-800">
          {bodyLines.map((line, i) => (
            <p key={i} className="text-sm sm:text-[15px] xl:text-lg">
              {line}
            </p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap items-end gap-3">
            {pdf && (
              <div className="flex flex-col items-center gap-1">
                <img
                  src={pdfImage}
                  alt=""
                  className="h-12 w-12 object-contain xl:h-14 xl:w-14"
                />
                <span className="max-w-40 truncate text-center text-xs font-medium text-slate-600 sm:max-w-xs">
                  {pdf.displayFileName}
                </span>
              </div>
            )}
            {!pdf && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1">
                  No attachment
                </span>
              </div>
            )}
          </div>

          {cta && (
            <div className="ml-auto flex shrink-0 items-center">
              {cta.type === "pay_button" && (
                <button
                  type="button"
                  className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-extrabold tracking-wide text-slate-900 shadow-sm ring-1 ring-amber-500/30 transition hover:bg-amber-300"
                >
                  {cta.label}
                </button>
              )}
              {cta.type === "click_here_button" && (
                <img
                  src={clickHereButton}
                  alt="Click here"
                  className="h-12 w-auto max-w-36 object-contain sm:h-14 xl:h-16 xl:max-w-44"
                />
              )}
              {cta.type === "open_official_app" && (
                <button
                  type="button"
                  className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-sky-600"
                >
                  {cta.label}
                </button>
              )}
              {cta.type === "link_text" && (
                <button
                  type="button"
                  className="text-sm font-semibold text-sky-700 underline decoration-2 hover:text-sky-900"
                >
                  {cta.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EmailWindow;
