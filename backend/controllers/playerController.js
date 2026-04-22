import crypto from "crypto";
import mongoose from "mongoose";
import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || typeof username !== 'string' || username.trim() === '') {
      return res.status(400).json({ error: 'Username is required' });
    }

    const createdSessionId = crypto.randomUUID();

    const createdPlayer = await Player.create({
      sessionId: createdSessionId,
      name: username.trim(),
    });

    if (!createdPlayer) {
      return res.status(500).json({ error: 'Failed to create player' });
    }

    // IMPORTANT:
    // - API id is the MongoDB _id (used by updatePlayer)
    // - sessionId is returned separately if the frontend wants to store it
    return res.status(201).json({
      id: createdPlayer._id.toString(),
      sessionId: createdPlayer.sessionId,
      name: createdPlayer.name,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      score,
      correctDecisions,
      badge,
      completedAt,
      inboxInspectorTotalScore,
      inboxInspectorCorrectDecisions,
      inboxInspectorBadge,
      inboxInspectorCompletedAt,
    } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid player ID' });
    }

    const updateData = {};

    if (typeof score === 'number') {
      updateData.score = score;
    }

    if (typeof correctDecisions === 'number') {
      updateData.correctDecisions = correctDecisions;
    }

    if (typeof badge === 'string' && badge.trim() !== '') {
      updateData.badge = badge.trim();
    }

    if (completedAt) {
      const completedDate = new Date(completedAt);
      if (!Number.isNaN(completedDate.getTime())) {
        updateData.completedAt = completedDate;
      }
    }

    if (typeof inboxInspectorTotalScore === "number") {
      updateData.inboxInspectorTotalScore = inboxInspectorTotalScore;
    }

    if (typeof inboxInspectorCorrectDecisions === "number") {
      updateData.inboxInspectorCorrectDecisions = inboxInspectorCorrectDecisions;
    }

    if (
      typeof inboxInspectorBadge === "string" &&
      inboxInspectorBadge.trim() !== ""
    ) {
      updateData.inboxInspectorBadge = inboxInspectorBadge.trim();
    }

    if (inboxInspectorCompletedAt) {
      const inboxCompletedDate = new Date(inboxInspectorCompletedAt);
      if (!Number.isNaN(inboxCompletedDate.getTime())) {
        updateData.inboxInspectorCompletedAt = inboxCompletedDate;
      }
    }

    // now we update the player by Mongo _id (matches id returned from createPlayer)
    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      { new: true, runValidators: true },
    );

    if (!updatedPlayer) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json({
      id: updatedPlayer._id.toString(),
      name: updatedPlayer.name,
      score: updatedPlayer.score,
      correctDecisions: updatedPlayer.correctDecisions,
      badge: updatedPlayer.badge,
      completedAt: updatedPlayer.completedAt,
      inboxInspectorTotalScore: updatedPlayer.inboxInspectorTotalScore,
      inboxInspectorCorrectDecisions: updatedPlayer.inboxInspectorCorrectDecisions,
      inboxInspectorBadge: updatedPlayer.inboxInspectorBadge,
      inboxInspectorCompletedAt: updatedPlayer.inboxInspectorCompletedAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 4, 20);
    const mode = String(req.query.mode || "").trim().toLowerCase();

    if (mode === "inbox-inspector") {
      const inboxPlayers = await Player.find({
        inboxInspectorCompletedAt: { $ne: null },
      })
        .sort({ inboxInspectorTotalScore: -1 })
        .limit(limit)
        .select(
          "name inboxInspectorTotalScore inboxInspectorCompletedAt inboxInspectorBadge"
        )
        .lean();

      const players = inboxPlayers.map((p) => ({
        name: p.name,
        score: p.inboxInspectorTotalScore ?? 0,
        completedAt: p.inboxInspectorCompletedAt ?? null,
        badge: p.inboxInspectorBadge ?? "",
      }));

      return res.status(200).json({ players });
    }

    const foundPlayers = await Player.find({
      completedAt: { $ne: null },
    })
      .sort({ score: -1 })
      .limit(limit)
      .select("name score completedAt badge")
      .lean();

    return res.status(200).json({ players: foundPlayers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};