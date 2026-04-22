import React from "react";

const rows = [
  { rank: 1, name: "Alex", subtitle: "Thread Spotter", score: 9600 },
  { rank: 2, name: "Alex", subtitle: "Thread Spotter", score: 9600 },
  { rank: 3, name: "Alex", subtitle: "Thread Spotter", score: 9600 },
  { rank: 4, name: "Alex", subtitle: "Thread Spotter", score: 9600 },
];

function Leaderboard() {
  return (
    <section className="w-full rounded-3xl border border-slate-700/80 bg-[#f7f8fb] p-3 shadow-sm sm:p-4">
      <h2 className="border-b border-slate-600/50 pb-2 text-center text-2xl font-extrabold text-[#1d2875] sm:text-3xl">
        LEADERBOARD - ALL TIME
      </h2>

      <div className="grid grid-cols-[1fr_auto] border-b border-slate-600/50 px-2 py-2 text-lg text-slate-800 sm:text-xl">
        <span>Rank</span>
        <span>Score</span>
      </div>

      <div>
        {rows.map((row) => (
          <div
            key={row.rank}
            className="grid grid-cols-[1fr_auto] items-center border-b border-slate-600/50 px-2 py-2.5"
          >
            <div className="min-w-0">
              <p className="text-2xl text-slate-900 sm:text-3xl">
                {row.rank}. {row.name}
              </p>
              <p className="text-sm text-slate-600 sm:text-base">{row.subtitle}</p>
            </div>
            <p className="text-2xl font-medium text-slate-900 sm:text-3xl">
              {row.score}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
