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
      inboxInspectorTotalScore,
      inboxInspectorCorrectDecisions,
      inboxInspectorBadge,
      inboxInspectorCompletedAt,
    } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid player ID' });
    }

    const updateData = {};

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
    const foundPlayers = await Player.find({
      inboxInspectorCompletedAt: { $ne: null },
    })
      .sort({ inboxInspectorTotalScore: -1 })
      .limit(limit)
      .select("name inboxInspectorTotalScore inboxInspectorCompletedAt inboxInspectorBadge")
      .lean();

    const players = foundPlayers.map((p) => ({
      name: p.name,
      score: p.inboxInspectorTotalScore ?? 0,
      completedAt: p.inboxInspectorCompletedAt ?? null,
      badge: p.inboxInspectorBadge ?? "",
    }));

    return res.status(200).json({ players });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};