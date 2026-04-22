import React from "react";
import clickHereButton from "../assets/Image/GamePage/clickHereButton.png";
import checkIcon from "../assets/Image/GamePage/checkIcon.png";

/**
 * Renders a DM / notification style card (prize-style mock uses gift + CTA from JSON).
 */
function DMWindow({ caseData }) {
  if (!caseData) {
    return (
      <div className="rounded-3xl border-2 border-slate-300/80 bg-white p-6 shadow-sm">
        <p className="text-slate-600">No case data.</p>
      </div>
    );
  }

  const { sender, message, graphics } = caseData;
  const cta = message?.primaryCta;
  const showGift = graphics?.giftIconBottomRight;
  const showClickStyle = graphics?.clickHereStyleButton;
  const headline = (message?.headline || "").trim();
  const body = message?.body || "";
  const bodyLines = body.split("\n").filter((line) => line.length > 0);

  return (
    <section className="h-full w-full min-w-0">
      <div className="mb-3 min-h-13 flex items-center gap-2 pl-0.5 sm:min-h-14">
        <img src={checkIcon} alt="" className="h-9 w-9 shrink-0" aria-hidden />
        <h2 className="text-lg font-extrabold text-slate-800 sm:text-2xl">
          Incoming message
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-300/90 bg-white p-5 shadow-sm sm:p-6 xl:p-7 2xl:p-8">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-black text-slate-900 shadow-inner"
              style={{ background: "linear-gradient(145deg, #c9d2ff, #a8b5ff)" }}
              aria-hidden
            >
              ?
            </div>
            <div className="min-w-0 text-left">
              <p className="font-extrabold text-slate-900">
                {sender?.handle || "@unknown"}
              </p>
              <p className="mt-0.5 inline-block rounded-md bg-slate-200/90 px-2 py-0.5 text-xs font-medium text-slate-800">
                {sender?.displayName}
              </p>
            </div>
          </div>
          <span className="shrink-0 text-sm text-slate-500">Now</span>
        </div>

        {headline && (
          <h3 className="mb-2 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl xl:text-4xl">
            {headline}
          </h3>
        )}

        <div className="space-y-2 text-left text-base font-medium text-slate-900 sm:text-lg xl:text-2xl">
          {bodyLines.map((line, i) => (
            <p key={i} className="leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        {message?.linkShown && (
          <p className="mt-2 text-left text-sm text-sky-800 underline break-all">
            {message.linkShown}
          </p>
        )}

        <div className="mt-6 flex items-end justify-between gap-3">
          <div className="min-w-0">
            {cta && showClickStyle && cta.type === "click_here_button" && (
              <div className="relative">
                <img
                  src={clickHereButton}
                  alt="Click here"
                  className="h-12 w-auto max-w-40 object-contain sm:h-14 xl:h-16 xl:max-w-48"
                />
                <span
                  className="pointer-events-none absolute -right-1 bottom-0 text-2xl"
                  aria-hidden
                >
                  👆
                </span>
              </div>
            )}
            {cta && !showClickStyle && cta.type === "pay_button" && (
              <button
                type="button"
                className="rounded-full bg-amber-400 px-4 py-2 text-sm font-extrabold text-slate-900 shadow"
              >
                {cta.label}
              </button>
            )}
          </div>

          {showGift && (
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full sm:h-24 sm:w-24 xl:h-28 xl:w-28"
              style={{
                background: "radial-gradient(circle at 30% 30%, #e0fcff, #7ee8f9)",
                boxShadow: "0 0 0 2px rgba(15, 23, 42, 0.12)",
              }}
            >
              <span className="text-3xl sm:text-4xl xl:text-5xl" role="img" aria-label="Gift">
                🎁
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DMWindow;
