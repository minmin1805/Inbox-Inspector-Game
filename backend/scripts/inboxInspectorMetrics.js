import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../lib/db.js";
import Event from "../models/Event.js";

dotenv.config();

function toDateOrNull(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function run() {
  await connectDB();

  const from = toDateOrNull(process.env.METRICS_FROM);
  const to = toDateOrNull(process.env.METRICS_TO);
  const dateFilter =
    from || to
      ? {
          timestamp: {
            ...(from ? { $gte: from } : {}),
            ...(to ? { $lte: to } : {}),
          },
        }
      : {};

  const scope = { gameId: "inbox-inspector", ...dateFilter };

  const [starts, completes, riskyClicks, caseSubmits] = await Promise.all([
    Event.countDocuments({ ...scope, eventType: "session_start" }),
    Event.countDocuments({ ...scope, eventType: "session_complete" }),
    Event.countDocuments({ ...scope, eventType: "risky_cta_click" }),
    Event.find({ ...scope, eventType: "case_submit" }).select("metadata caseId").lean(),
  ]);

  const avgScore =
    caseSubmits.length > 0
      ? Math.round(
          caseSubmits.reduce((sum, e) => sum + (Number(e.metadata?.caseTotal) || 0), 0) /
            caseSubmits.length
        )
      : 0;

  const verdictCorrectRate =
    caseSubmits.length > 0
      ? Math.round(
          (caseSubmits.filter((e) => Boolean(e.metadata?.verdictCorrect)).length / caseSubmits.length) * 100
        )
      : 0;

  const completionRate = starts > 0 ? Math.round((completes / starts) * 100) : 0;

  const dropoffByCase = caseSubmits.reduce((acc, e) => {
    const key = e.caseId || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const report = {
    generatedAt: new Date().toISOString(),
    window: {
      from: from ? from.toISOString() : null,
      to: to ? to.toISOString() : null,
    },
    starts,
    completes,
    completionRatePercent: completionRate,
    riskyClicks,
    caseSubmitEvents: caseSubmits.length,
    averageCaseTotal: avgScore,
    verdictCorrectRatePercent: verdictCorrectRate,
    dropoffByCase,
  };

  console.log(JSON.stringify(report, null, 2));
  await mongoose.connection.close();
}

run().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
