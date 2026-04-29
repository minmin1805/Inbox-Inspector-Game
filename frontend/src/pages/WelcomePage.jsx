import React, { useState } from "react";
import logo from "../assets/Image/WelcomePage/logo.png";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaGavel, FaRegCheckCircle } from "react-icons/fa";
import { createPlayer } from "../services/playerService";
import logo2 from "../assets/Image/WelcomePage/logo2.png";
import logo3 from "../assets/Image/WelcomePage/logo3.png";

const NEONBLUE = "#ccffff";

function WelcomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleStartInvestigation = async () => {
    const trimmedName = username.trim();
    if (!trimmedName) {
      setError("Please enter your name or nickname first.");
      return;
    }

    try {
      setIsCreating(true);
      setError("");
      const player = await createPlayer(trimmedName);
      sessionStorage.setItem("inboxInspectorPlayer", JSON.stringify(player));
      navigate("/instruction");
    } catch (err) {
      setError(err?.message || "Could not start your session. Try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: NEONBLUE,
      }}
      className="min-h-dvh px-5 py-6 sm:px-8 sm:py-8 text-[#1f2f63]"
    >
      <header className="mx-auto flex w-full max-w-[98%] items-center justify-between gap-3">
        <img
          src={logo3}
          alt="Inbox Inspector logo"
          className="w-full max-w-[180px] sm:max-w-[280px]"
        />
        <button
          type="button"
          className="shrink-0 text-base font-bold tracking-tight text-[#2f3d6f] hover:underline sm:text-2xl"
        >
          Terms
        </button>
      </header>

      <main className="mx-auto mt-10 flex w-full max-w-5xl flex-col items-center text-center sm:mt-14">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-[46px]">
          Train your instincts.
          <br />
          Inspect before you trust
        </h1>

        <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed text-[#2d456f] sm:text-lg md:text-2xl">
          Read suspicious emails and DMs, collect clues with limited scans,
          choose a safe verdict, and write a safe reply.
        </p>

        <section className="mt-8 w-full max-w-2xl rounded-2xl border border-[#6f7d95] bg-[#f5f7fb]/95 p-4 shadow-sm sm:p-6">
          <p className="mb-3 text-xl font-semibold text-[#4d5a7b] sm:text-2xl">
            Your name (or nickname)
          </p>
          <input
            type="text"
            placeholder="Type your name here...."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-[#7f89a0] bg-white px-4 py-3 text-base text-[#243663] outline-none transition focus:border-[#41bdd9] focus:ring-2 focus:ring-[#7bd8eb]/40"
          />
          {error ? (
            <p className="mt-2 text-sm font-medium text-rose-700">{error}</p>
          ) : null}
          <button
            onClick={handleStartInvestigation}
            disabled={isCreating}
            className="mt-4 w-full rounded-xl border border-[#3ea8c2] bg-[#59cce4] px-7 py-2.5 text-lg font-bold text-white shadow-sm transition hover:bg-[#42bcd7] sm:w-auto sm:text-2xl"
          >
            {isCreating ? "Starting..." : "Start Investigation"}
          </button>
        </section>

        <section className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article className="min-w-0 rounded-xl border border-[#7c8596] bg-[#f8f9fc] p-6 text-left shadow-sm">
            <p className="flex items-center gap-2 text-xl font-semibold sm:text-2xl">
              <FaSearch className="text-[#58c7de]" />
              <span className="whitespace-nowrap">Scan clues</span>
            </p>
            <ul className="mt-2 list-disc pl-5 text-base text-[#324976] sm:text-xl">
              <li>Check sender</li>
              <li>Spot urgency</li>
            </ul>
          </article>

          <article className="min-w-0 rounded-xl border border-[#7c8596] bg-[#f8f9fc] p-6 text-left shadow-sm">
            <p className="flex items-center gap-2 text-xl font-semibold sm:text-2xl">
              <FaGavel className="text-[#9a6126]" />
              <span className="whitespace-nowrap">Choose verdict</span>
            </p>
            <ul className="mt-2 list-disc pl-5 text-base text-[#324976] sm:text-xl">
              <li>Pick Phishing or Legit</li>
              <li>Base on clues</li>
            </ul>
          </article>

          <article className="min-w-0 rounded-xl border border-[#7c8596] bg-[#f8f9fc] p-6 text-left shadow-sm">
            <p className="flex items-center gap-2 text-xl font-semibold sm:text-2xl">
              <FaRegCheckCircle className="text-[#58c7de]" />
              <span className="whitespace-nowrap">Write a safe reply</span>
            </p>
            <ul className="mt-2 list-disc pl-5 text-base text-[#324976] sm:text-xl">
              <li>No password, ID, photos</li>
              <li>Don&apos;t use risky links</li>
            </ul>
          </article>
        </section>

        <p className="mt-8 text-xs font-medium tracking-wide text-[#3e4d78]/80 sm:text-sm">
          Design &amp; development by Minh Doan
        </p>
      </main>
    </div>
  );
}

export default WelcomePage;
