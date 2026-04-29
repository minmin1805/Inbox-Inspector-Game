import mongoose from "mongoose";
import Event from "../models/Event.js";

export const createTelemetryEvent = async (req, res) => {
  try {
    const {
      sessionId,
      playerId,
      gameId = "inbox-inspector",
      eventType,
      caseId = null,
      caseNumber = null,
      metadata = {},
      timestamp,
    } = req.body || {};

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ error: "sessionId is required" });
    }
    if (!eventType || typeof eventType !== "string") {
      return res.status(400).json({ error: "eventType is required" });
    }

    const doc = {
      sessionId: sessionId.trim(),
      gameId: String(gameId || "inbox-inspector").trim(),
      eventType,
      caseId: caseId ? String(caseId).trim() : null,
      caseNumber: typeof caseNumber === "number" ? caseNumber : null,
      metadata: metadata && typeof metadata === "object" ? metadata : {},
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    };

    if (playerId && mongoose.Types.ObjectId.isValid(playerId)) {
      doc.playerId = playerId;
    }

    const created = await Event.create(doc);
    return res.status(201).json({ id: created._id.toString() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
