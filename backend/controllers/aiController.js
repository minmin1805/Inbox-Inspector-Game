import { gradeInboxReply } from "../services/inboxReplyGrader.js";

export const gradeInboxReplyController = async (req, res) => {
  try {
    const { caseId, playerReply, channel, correctVerdict, theme } = req.body || {};

    if (caseId == null) {
      return res.status(400).json({ error: "caseId is required" });
    }

    const result = await gradeInboxReply({
      caseId,
      playerReply,
      channel,
      correctVerdict,
      theme,
    });

    return res.status(200).json(result);
  } catch (error) {
    // Always return a fallback-safe response shape for gameplay continuity.
    return res.status(200).json({
      replySafetyBand: "ok",
      sharesCredentials: false,
      shortRationale: "Fallback grading due to temporary error.",
      coachTip: "Use clear safe actions and avoid sensitive details.",
    });
  }
};

