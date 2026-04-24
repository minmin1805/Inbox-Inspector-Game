/**
 * Single source of truth for endgame rank (image + title + blurb) from total score.
 * Max possible total: 10 cases × 1000 = 10,000.
 */
const TOP_MIN = 8500;
const MID_MIN = 6500;

export function getInboxInspectorRankByScore(totalScore) {
  const n = Number(totalScore) || 0;
  if (n >= TOP_MIN) {
    return {
      id: "master",
      title: "Inbox Master",
      blurb: "Sentinel rank — strong verification habits and safe replies.",
    };
  }
  if (n >= MID_MIN) {
    return {
      id: "analyst",
      title: "Lead Case Analyst",
      blurb: "Solid instincts and careful reading—tighten efficiency to reach the top.",
    };
  }
  return {
    id: "rookie",
    title: "Inbox Rookie",
    blurb: "Great start — keep practicing checks, tools, and safe replies.",
  };
}

export function getBadgeTitleAndBlurbFromScore(totalScore) {
  const { title, blurb } = getInboxInspectorRankByScore(totalScore);
  return { title, blurb };
}
