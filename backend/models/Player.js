import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    // Random session identifier you can expose to the frontend if needed
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    inboxInspectorTotalScore: {
      type: Number,
      default: 0,
    },
    inboxInspectorCorrectDecisions: {
      type: Number,
      default: 0,
    },
    inboxInspectorBadge: {
      type: String,
      default: "",
      trim: true,
    },
    inboxInspectorCompletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Player = mongoose.model('Player', playerSchema);

export default Player;