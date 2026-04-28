import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import levels from "../data/inboxInspectorLevels.json";

const PAGE_BY_THEME = {
  prize_scam: {
    variant: "phishing",
    fakeUrl: "claim-reward-now.win/secure-claim",
    title: "Prize Claim Center",
    subtitle: "Claim your bonus in 10:00 before it expires",
    flags: [
      "Countdown pressure to act immediately",
      "Asks for account confirmation outside trusted app",
      "Domain is not tied to a real brand",
    ],
  },
  school_security_legit: {
    variant: "legit",
    fakeUrl: "portal.riversidehs.edu/security/devices",
    title: "Riverside High Security",
    subtitle: "Review active devices in the official school portal",
    flags: [
      "Expected school domain and routine security flow",
      "No requests for codes or payments in-message",
      "Action can be done in the official app/site",
    ],
  },
  labor_job_scam: {
    variant: "phishing",
    fakeUrl: "summerwork-hire.net/pay-training",
    title: "Training Seat Reservation",
    subtitle: "Pay fee now to hold your onboarding spot",
    flags: [
      "Upfront fee request before normal hiring steps",
      "Pushes payment + ID upload in one flow",
      "Urgency language to bypass verification",
    ],
  },
  delivery_sketchy: {
    variant: "sketchy",
    fakeUrl: "parcel-track-mail.com/portal/address-confirm",
    title: "Delivery Address Portal",
    subtitle: "Confirm details to avoid return to sender",
    flags: [
      "Looks plausible but sender/domain is generic",
      "Could be real or fake: verify independently first",
      "Do not trust from email link alone",
    ],
  },
  travel_job_deposit: {
    variant: "phishing",
    fakeUrl: "eliteevents-fastpay.co/deposit",
    title: "Event Crew Fast-Track",
    subtitle: "Send deposit + ID to secure your travel slot",
    flags: [
      "Deposit + ID ask is a common fake-job pattern",
      "Uses secrecy and urgency to pressure action",
      "Photo proof does not verify employer legitimacy",
    ],
  },
  contest_verify_first: {
    variant: "sketchy",
    fakeUrl: "ctzn.io/artshow-2026/submit",
    title: "Contest Submission Form",
    subtitle: "Complete your nomination before tonight's deadline",
    flags: [
      "Short-link hides final destination",
      "Deadline pressure can be exploited by scammers",
      "Verify contest from official website navigation",
    ],
  },
};

const BADGE_STYLES = {
  phishing: "bg-rose-100 text-rose-800 border-rose-200",
  sketchy: "bg-amber-100 text-amber-800 border-amber-200",
  legit: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const BADGE_LABEL = {
  phishing: "Training: High-risk scam page",
  sketchy: "Training: Unverified destination",
  legit: "Training: Likely safe destination",
};

function ScamPreviewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId");
  const source = searchParams.get("source") || "link";
  const caseData = levels.cases.find((c) => c.id === caseId);
  const page = caseData ? PAGE_BY_THEME[caseData.theme] : null;

  const handleCloseAndExit = () => {
    // Works when opened by window.open from the game tab.
    window.close();
    // Fallback for browsers that block close on non-script-opened tabs.
    setTimeout(() => navigate("/game"), 120);
  };

  if (!caseData || !page) {
    return (
      <main className="min-h-dvh bg-slate-100 px-4 py-8 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <p className="text-lg font-bold">No simulation page found for this case.</p>
          <p className="mt-2 text-slate-600">
            Return to the game tab and continue investigation.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-slate-100 px-4 py-6 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
          <p className="font-bold">Training simulation</p>
          <p>
            This page opens because a <span className="font-semibold">{source}</span> was clicked in
            case {caseData.caseNumber}. Use clues below to judge safety.
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <p className="truncate text-sm font-semibold text-slate-700">{page.fakeUrl}</p>
          </div>
          <div className="p-5 sm:p-6">
            <span
              className={[
                "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
                BADGE_STYLES[page.variant],
              ].join(" ")}
            >
              {BADGE_LABEL[page.variant]}
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">{page.title}</h1>
            <p className="mt-1 text-slate-700">{page.subtitle}</p>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Simulated destination content
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input
                  readOnly
                  value="Full name"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500"
                />
                <input
                  readOnly
                  value="Email / phone"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500"
                />
              </div>
              <button
                type="button"
                className="mt-3 rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">What to notice here</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 sm:text-base">
            {page.flags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </section>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCloseAndExit}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700"
          >
            Close and return to game
          </button>
        </div>
      </div>
    </main>
  );
}

export default ScamPreviewPage;
