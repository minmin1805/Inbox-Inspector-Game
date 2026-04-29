import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaLink,
  FaSearch,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { FaGavel, FaPencil, FaRegEnvelope } from "react-icons/fa6";
import bigIcon from "../assets/Image/InstructionPage/bigIcon.png";

// Cool paper + sky: matches hero art (navy type, teal / sky / cream illustration)
const PAGE_BG =
  "min-h-dvh bg-linear-to-b from-[#dbeaf3] via-[#f0f8ff] to-[#d8e8f2] text-[#1a2b48]";

function InstructionPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const playerRaw = sessionStorage.getItem("inboxInspectorPlayer");
    if (!playerRaw) {
      navigate("/welcome", { replace: true });
    }
  }, [navigate]);

  const handleStartInvestigation = () => {
    navigate("/game");
  };

  const steps = [
    {
      n: 1,
      title: "Read the message",
      blurb: "Read the full email or DM. Notice the sender, tone, and anything that feels off.",
      tone: "blue",
    },
    {
      n: 2,
      title: "Investigate (limited tools)",
      blurb: "Open investigation tools to collect clues. You can reveal up to 3 tool results in each case—use them carefully.",
      tone: "amber",
    },
    {
      n: 3,
      title: "Choose a verdict",
      blurb: "Decide if it looks like phishing, sketchy, or legit based on the evidence.",
      tone: "blue",
    },
    {
      n: 4,
      title: "Write a safe reply",
      blurb:
        "Use 1-2 sentences: (1) what risky step you refuse, (2) how you will verify safely. Example: I won't share codes. I'll verify in the official app.",
      tone: "teal",
    },
  ];

  const tips = [
    {
      icon: <FaUser className="h-5 w-5" />,
      text: "Look at who it is really from, not just the display name.",
    },
    {
      icon: <FaExclamationCircle className="h-5 w-5" />,
      text: "Watch for pressure, fear, or “act in the next 10 minutes” energy.",
    },
    {
      icon: <FaLink className="h-5 w-5" />,
      text: "Be careful with links and unexpected attachments. When unsure, do not click.",
    },
    {
      icon: <FaCheckCircle className="h-5 w-5" />,
      text: "Check using an official app or website, or ask a trusted adult you know in real life.",
    },
  ];

  return (
    <div className={PAGE_BG}>

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-6 sm:px-6">
        {/* Hero — navy type on cool paper; art panel picks up teal/sky from illustration */}
        <section className="overflow-hidden rounded-3xl border border-sky-200/60 bg-linear-to-r from-[#f5fbff] via-[#f0f7fc] to-[#e9f2f8] p-6 shadow-[0_24px_48px_rgba(26,43,72,0.08)] sm:p-8 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="inline-flex items-center rounded-full border border-[#6eb8c8] bg-[#e2f1f5] px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#1a2b48] sm:text-sm">
                HOW TO PLAY
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#1a2b48] sm:text-4xl md:text-[2.5rem]">
                Inbox Inspector
              </h1>
              <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-[#2d3f58] sm:text-lg">
                A short game about reading messages carefully, spotting weird
                stuff, and replying the safe way. You will play through 10
                different cases.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={bigIcon}
                alt="Friendly inbox and safety illustration"
                className="h-auto w-full max-w-[280px] object-contain"
              />
            </div>
          </div>
        </section>

        {/* What is this game? */}
        <section className="mt-8 rounded-3xl border border-sky-200/50 bg-[#f9fcff]/95 p-6 shadow-lg sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#c5e8f0] to-[#e8f5f9] text-[#1a7a8a] ring-1 ring-[#7ec4d0]/60">
              <FaRegEnvelope className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#1a2b48] sm:text-3xl">
                What is this game?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#2d3f58] sm:text-lg">
                You will work through a mix of{" "}
                <span className="font-semibold text-[#117a8a]">emails</span> and{" "}
                <span className="font-semibold text-[#117a8a]">direct messages (DMs)</span>
                . Some messages are{" "}
                <span className="font-semibold text-[#1a2b48]">phishing</span>, some are{" "}
                <span className="font-semibold text-[#1a2b48]">sketchy</span>, and some are{" "}
                <span className="font-semibold text-[#1a2b48]">legitimate</span>—on purpose, so
                you can practice. The goal is to build a habit:{" "}
                <span className="font-semibold text-[#117a8a]">
                  slow down, look for clues, and verify before you trust
                </span>{" "}
                links, downloads, or requests.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Your goal + steps */}
          <section className="rounded-3xl border border-sky-200/50 bg-[#f9fcff]/95 p-6 shadow-lg sm:p-8">
            <h2 className="text-2xl font-extrabold text-[#1a2b48] sm:text-3xl">
              Your goal
            </h2>
            <p className="mt-2 text-[#2d3f58]">
              Each case, aim for a strong{" "}
              <span className="font-semibold">verdict</span>, smart use of your{" "}
              <span className="font-semibold">tools</span>, and a{" "}
              <span className="font-semibold">safe reply</span>.
            </p>
            <ul className="mt-6 space-y-4">
              {steps.map((s) => {
                const ring =
                  s.tone === "amber"
                    ? "bg-amber-50 text-amber-900 ring-amber-200/80"
                    : s.tone === "teal"
                      ? "bg-teal-50 text-teal-900 ring-teal-200/80"
                      : "bg-sky-50 text-sky-900 ring-sky-200/80";
                return (
                  <li
                    key={s.n}
                    className={`flex gap-4 rounded-2xl p-4 ring-1 ${ring}`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-base font-extrabold text-[#1a2b48] shadow-sm ring-1 ring-sky-200/80">
                      {s.n}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#1a2b48]">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#3d4f66] sm:text-base">
                        {s.blurb}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Reply box guide + scoring summary */}
          <div className="space-y-8">
            <section className="rounded-3xl border border-teal-200/70 bg-linear-to-r from-teal-50 to-cyan-50 p-6 shadow-lg sm:p-8">
              <div className="flex items-start gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#1a2b48] sm:text-3xl">
                    What to type in the reply box
                  </h2>
                  <p className="mt-1 text-sm text-[#2d3f58] sm:text-base">
                    This box is where you write your response to the message.
                    Tell what you refuse to do and what safe step you will take
                    next.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-teal-200 bg-white/90 p-4 ring-1 ring-teal-100/70">
                <p className="text-sm font-semibold text-slate-800 sm:text-base">
                  Formula
                </p>
                <p className="mt-1 rounded-lg bg-teal-50 px-3 py-2 text-sm font-medium text-teal-900 sm:text-base">
                  I won&apos;t [risky action]. I&apos;ll [safe verification step].
                </p>

                <p className="mt-3 text-sm font-semibold text-slate-800 sm:text-base">
                  Example
                </p>
                <p className="mt-1 rounded-lg bg-cyan-50 px-3 py-2 text-sm text-slate-700 sm:text-base">
                  I won&apos;t click this link. I&apos;ll check through the official app.
                </p>

              </div>
            </section>

            <section className="rounded-3xl border border-[#7cc4d4]/55 bg-linear-to-br from-[#e4f3f8] to-[#f5fbff] p-6 shadow-md sm:p-8">
              <h2 className="text-xl font-extrabold text-[#1a2b48] sm:text-2xl">
                How scoring works
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#2d3f58] sm:text-base">
                Each case can add up to <span className="font-bold">1,000</span>{" "}
                points. It is made of three parts:
              </p>
              <ul className="mt-4 space-y-2 text-sm sm:text-base">
                <li className="flex justify-between gap-2 rounded-xl bg-white/85 px-3 py-2 font-medium text-[#1a2b48] ring-1 ring-sky-200/50">
                  <span>Verdict</span>
                  <span className="text-[#117a8a]">up to 520</span>
                </li>
                <li className="flex justify-between gap-2 rounded-xl bg-white/85 px-3 py-2 font-medium text-[#1a2b48] ring-1 ring-sky-200/50">
                  <span>Investigation efficiency</span>
                  <span className="text-[#117a8a]">up to 180</span>
                </li>
                <li className="flex justify-between gap-2 rounded-xl bg-white/85 px-3 py-2 font-medium text-[#1a2b48] ring-1 ring-sky-200/50">
                  <span>Reply quality</span>
                  <span className="text-[#117a8a]">up to 300</span>
                </li>
              </ul>
              <p className="mt-3 text-sm text-[#3d4f66]">
                Revealing fewer tool results leaves more of your “efficiency”
                points on the table in that category—so plan your three reveals
                wisely.
              </p>
            </section>
          </div>
        </div>

        {/* Quick tips */}
        <section className="mt-8 rounded-3xl border border-amber-200/70 bg-linear-to-r from-[#fff8e6] to-[#fffcf5] p-6 shadow-lg sm:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-extrabold text-[#1a2b48] sm:text-3xl">
            <FaStar className="h-6 w-6 text-amber-500" />
            Quick tips to remember
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {tips.map((t) => (
              <li
                key={t.text}
                className="flex gap-3 rounded-2xl border border-amber-100/90 bg-white/90 p-4 shadow-sm"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#1a2b48]">
                  {t.icon}
                </span>
                <span className="text-sm font-medium leading-relaxed text-[#2d3f58] sm:text-base">
                  {t.text}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center text-center">
          <button
            type="button"
            onClick={handleStartInvestigation}
            className="w-full max-w-md rounded-2xl border-2 border-[#c9970a] bg-linear-to-b from-[#ffe566] to-[#f5c430] px-8 py-4 text-xl font-extrabold text-[#1a2b48] shadow-[0_10px_0_rgba(150,100,0,0.2)] transition hover:translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/50 active:translate-y-1"
          >
            Start the investigation
          </button>
          <p className="mt-3 text-sm font-medium text-[#2d3f58]">
            About 10–20 minutes
          </p>
        </div>
      </main>
    </div>
  );
}

export default InstructionPage;
