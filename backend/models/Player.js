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
    score: {
      type: Number,
      default: 0,
    },
    correctDecisions: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      default: '',
      trim: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Player = mongoose.model('Player', playerSchema);

export default Player;