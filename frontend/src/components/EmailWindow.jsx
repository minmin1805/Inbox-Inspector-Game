import React from "react";
import pdfImage from "../assets/Image/GamePage/pdfImage.png";
import clickHereButton from "../assets/Image/GamePage/clickHereButton.png";
import checkIcon from "../assets/Image/GamePage/checkIcon.png";

function formatCaseTimestamp() {
  return new Date().toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function EmailWindow({ caseData }) {
  if (!caseData) {
    return (
      <div className="rounded-3xl border border-slate-300/80 bg-white p-6 shadow-sm">
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

      <div className="overflow-hidden rounded-2xl border border-slate-300/90 bg-white shadow-sm lg:min-h-[580px]">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 sm:text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            inbox@messages.local
          </p>
        </div>

        <div className="p-5 sm:p-6 xl:p-7">
          <div className="mb-5 flex items-start justify-between gap-3 border-b border-slate-200/90 pb-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800 sm:text-base">
                {message?.subject || "(no subject)"}
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                <span className="font-medium text-slate-700">From:</span>{" "}
                {sender?.displayName}{" "}
                {sender?.fromAddress ? `<${sender.fromAddress}>` : ""}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                <span className="font-medium text-slate-700">To:</span>{" "}
                {sender?.toPlaceholder || "you@email.com"}
              </p>
            </div>
            <span className="shrink-0 text-xs font-medium text-slate-500 sm:text-sm">
              {formatCaseTimestamp()}
            </span>
          </div>

          <div className="space-y-4 text-left leading-relaxed text-slate-800 xl:space-y-5">
            {bodyLines.map((line, i) => (
              <p key={i} className="text-sm sm:text-[15px] xl:text-lg">
                {line}
              </p>
            ))}
          </div>

          {message?.linkShown ? (
            <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/70 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                Link shown
              </p>
              <p className="mt-0.5 break-all text-sm text-sky-800">
                {message.linkShown}
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-5">
            <div className="flex flex-wrap items-end gap-3">
              {pdf ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <div className="flex items-center gap-2">
                    <img
                      src={pdfImage}
                      alt=""
                      className="h-11 w-11 object-contain xl:h-12 xl:w-12"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Attachment
                      </p>
                      <span className="block max-w-44 truncate text-xs font-medium text-slate-700 sm:max-w-xs">
                        {pdf.displayFileName}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1">
                    No attachment
                  </span>
                </div>
              )}
            </div>

            {cta ? (
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
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailWindow;
