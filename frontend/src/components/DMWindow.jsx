import React from "react";
import clickHereButton from "../assets/Image/GamePage/clickHereButton.png";
import checkIcon from "../assets/Image/GamePage/checkIcon.png";

function DMWindow({ caseData }) {
  if (!caseData) {
    return (
      <div className="rounded-3xl border border-slate-300/80 bg-white p-6 shadow-sm">
        <p className="text-slate-600">No case data.</p>
      </div>
    );
  }

  const { sender, message, graphics } = caseData;
  const cta = message?.primaryCta;
  const showClickStyle = graphics?.clickHereStyleButton;
  const headline = (message?.headline || "").trim();
  const body = message?.body || "";
  const bodyLines = body.split("\n").filter((line) => line.length > 0);
  const showBaitPhoto = Boolean(graphics?.baitPhotoAttachment);
  const showTripPhoto = Boolean(graphics?.tripPhotoAttachment);

  return (
    <section className="h-full w-full min-w-0">
      <div className="mb-3 min-h-13 flex items-center gap-2 pl-0.5 sm:min-h-14">
        <img src={checkIcon} alt="" className="h-9 w-9 shrink-0" aria-hidden />
        <h2 className="text-lg font-extrabold text-slate-800 sm:text-2xl">
          Incoming DM
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-300/90 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-black text-indigo-900">
              {sender?.displayName?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
                {sender?.displayName}
              </p>
              <p className="truncate text-xs text-slate-500 sm:text-sm">
                {sender?.handle || "@unknown"}
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            Online
          </span>
        </div>

        <div className="space-y-4 bg-[#f3f6fb] p-4 sm:p-5 xl:p-6">
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-br-md bg-white px-3 py-2 shadow-sm">
              <p className="text-xs text-slate-500 sm:text-sm">you</p>
              <p className="text-sm text-slate-700 sm:text-base">
                Hey, what&apos;s up?
              </p>
              <p className="mt-1 text-right text-[10px] text-slate-400 sm:text-xs">
                10:58
              </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-[#dff3ff] px-3.5 py-3 shadow-sm">
              {headline ? (
                <p className="mb-2 text-lg font-extrabold leading-tight text-slate-900 sm:text-xl xl:text-2xl">
                  {headline}
                </p>
              ) : null}
              {bodyLines.map((line, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-slate-900 sm:text-base xl:text-lg"
                >
                  {line}
                </p>
              ))}
              <p className="mt-2 text-right text-[10px] text-slate-500 sm:text-xs">
                now
              </p>
            </div>
          </div>

          {(showBaitPhoto || showTripPhoto) && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <div
                  className="h-36 w-full rounded-xl bg-cover bg-center sm:h-40"
                  style={{
                    backgroundImage: showTripPhoto
                      ? "linear-gradient(120deg, #9ad5ff, #6ec4ff, #7ee7d8)"
                      : "linear-gradient(120deg, #fbc2eb, #a6c1ee)",
                  }}
                />
                <p className="mt-2 text-xs font-medium text-slate-600 sm:text-sm">
                  {showTripPhoto
                    ? "Photo preview from friend"
                    : graphics?.baitPhotoCaption || "Team / housing preview"}
                </p>
              </div>
            </div>
          )}

          {message?.linkShown && (
            <div className="flex justify-start">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="max-w-[82%] break-all rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-800 underline decoration-2"
              >
                {message.linkShown}
              </a>
            </div>
          )}

          {cta ? (
            <div className="flex justify-start">
              <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm">
                {showClickStyle && cta.type === "click_here_button" ? (
                  <img
                    src={clickHereButton}
                    alt="Click here"
                    className="h-11 w-auto max-w-40 object-contain sm:h-12 xl:h-14 xl:max-w-48"
                  />
                ) : cta.type === "pay_button" ? (
                  <button
                    type="button"
                    className="rounded-full bg-amber-400 px-4 py-2 text-sm font-extrabold text-slate-900 shadow"
                  >
                    {cta.label}
                  </button>
                ) : cta.label ? (
                  <p className="text-sm text-slate-700">{cta.label}</p>
                ) : null}
                <p className="mt-1 text-right text-[10px] text-slate-400 sm:text-xs">
                  now
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-sm text-slate-400">
                Message {sender?.displayName || "sender"}...
              </span>
              <button
                type="button"
                className="rounded-full bg-sky-500 px-3 py-1 text-xs font-bold text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DMWindow;
