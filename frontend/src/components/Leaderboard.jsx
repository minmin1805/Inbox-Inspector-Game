import React from "react";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/playerService";

function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getLeaderboard({ limit: 4, mode: "inbox-inspector" })
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data?.players) ? data.players : [];
        setRows(
          list.map((item, index) => ({
            rank: index + 1,
            name: item?.name || "Player",
            subtitle: item?.badge || "Inbox Inspector",
            score: typeof item?.score === "number" ? item.score : 0,
          }))
        );
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message || "Could not load leaderboard.");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full rounded-3xl border border-slate-700/80 bg-[#f7f8fb] p-3 shadow-sm sm:p-4">
      <h2 className="border-b border-slate-600/50 pb-2 text-center text-xl font-extrabold text-[#1d2875] sm:text-3xl">
        LEADERBOARD - ALL TIME
      </h2>

      <div className="grid grid-cols-[1fr_auto] border-b border-slate-600/50 px-2 py-2 text-sm text-slate-800 sm:text-xl">
        <span>Rank</span>
        <span>Score</span>
      </div>

      <div>
        {loading ? (
          <p className="px-2 py-4 text-sm text-slate-600 sm:text-base">
            Loading leaderboard...
          </p>
        ) : error ? (
          <p className="px-2 py-4 text-sm text-rose-700 sm:text-base">{error}</p>
        ) : rows.length === 0 ? (
          <p className="px-2 py-4 text-sm text-slate-600 sm:text-base">
            No completed runs yet.
          </p>
        ) : (
          rows.map((row) => (
            <div
              key={row.rank}
              className="grid grid-cols-[1fr_auto] items-center border-b border-slate-600/50 px-2 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-lg text-slate-900 sm:text-3xl">
                  {row.rank}. {row.name}
                </p>
                <p className="text-sm text-slate-600 sm:text-base">
                  {row.subtitle}
                </p>
              </div>
              <p className="text-lg font-medium text-slate-900 sm:text-3xl">
                {row.score}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
