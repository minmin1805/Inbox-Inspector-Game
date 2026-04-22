import React from "react";
import logo from "../assets/Image/WelcomePage/logo.png";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaGavel, FaRegCheckCircle } from "react-icons/fa";
const NEONBLUE = "#ccffff";

function WelcomePage() {
  const navigate = useNavigate();

  const handleStartInvestigation = () => {
    navigate("/instruction");
  };

  return (
    <div
      style={{
        backgroundColor: NEONBLUE,
      }}
      className="min-h-dvh px-5 py-6 sm:px-8 sm:py-8 text-[#1f2f63]"
    >
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <img
          src={logo}
          alt="Inbox Inspector logo"
          className="h-auto w-52 rounded-xl border border-[#4b5d7f] bg-white p-2 shadow-sm sm:w-72"
        />
        <button
          type="button"
          className="text-base font-semibold tracking-tight text-[#2f3d6f] hover:underline"
        >
          Terms
        </button>
      </header>

      <main className="mx-auto mt-10 flex w-full max-w-4xl flex-col items-center text-center sm:mt-14">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-[46px]">
          Train your instincts.
          <br />
          Inspect before you trust
        </h1>

        <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[#2d456f] sm:text-[35px]">
          Read suspicious emails and DMs, collect clues with limited scans,
          choose a safe verdict, and write a safe reply.
        </p>

        <section className="mt-8 w-full max-w-2xl rounded-2xl border border-[#6f7d95] bg-[#f5f7fb]/95 p-4 shadow-sm sm:p-6">
          <p className="mb-3 text-lg font-semibold text-[#4d5a7b]">
            Your name (or nickname)
          </p>
          <input
            type="text"
            placeholder="Type your name here...."
            className="w-full rounded-xl border border-[#7f89a0] bg-white px-4 py-3 text-base text-[#243663] outline-none transition focus:border-[#41bdd9] focus:ring-2 focus:ring-[#7bd8eb]/40"
          />
          <button
            onClick={handleStartInvestigation}
            className="mt-4 rounded-xl border border-[#3ea8c2] bg-[#59cce4] px-7 py-2.5 text-2xl font-bold text-white shadow-sm transition hover:bg-[#42bcd7]"
          >
            Start Investigation
          </button>
        </section>

        <section className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-[#7c8596] bg-[#f8f9fc] p-4 text-left shadow-sm">
            <p className="flex items-center gap-2 text-2xl font-semibold">
              <FaSearch className="text-[#58c7de]" />
              <span>Scan clues</span>
            </p>
            <ul className="mt-2 list-disc pl-5 text-xl text-[#324976]">
              <li>Check sender</li>
              <li>Spot urgency</li>
            </ul>
          </article>

          <article className="rounded-xl border border-[#7c8596] bg-[#f8f9fc] p-4 text-left shadow-sm">
            <p className="flex items-center gap-2 text-2xl font-semibold">
              <FaGavel className="text-[#9a6126]" />
              <span>Choose verdict</span>
            </p>
            <ul className="mt-2 list-disc pl-5 text-xl text-[#324976]">
              <li>Pick Phishing or Legit</li>
              <li>Base on clues</li>
            </ul>
          </article>

          <article className="rounded-xl border border-[#7c8596] bg-[#f8f9fc] p-4 text-left shadow-sm">
            <p className="flex items-center gap-2 text-2xl font-semibold">
              <FaRegCheckCircle className="text-[#58c7de]" />
              <span>Write a safe reply</span>
            </p>
            <ul className="mt-2 list-disc pl-5 text-xl text-[#324976]">
              <li>No password, ID, photos</li>
              <li>Don&apos;t use risky links</li>
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}

export default WelcomePage;
