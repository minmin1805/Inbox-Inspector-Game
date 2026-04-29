import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null,
      index: true,
    },
    gameId: {
      type: String,
      required: true,
      default: "inbox-inspector",
      trim: true,
      index: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: [
        "session_start",
        "tool_reveal",
        "risky_cta_click",
        "case_submit",
        "feedback_viewed",
        "session_complete",
      ],
      index: true,
    },
    caseId: {
      type: String,
      default: null,
      trim: true,
    },
    caseNumber: {
      type: Number,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

eventSchema.index({ gameId: 1, eventType: 1, timestamp: -1 });
eventSchema.index({ sessionId: 1, timestamp: 1 });
eventSchema.index({ caseId: 1, timestamp: -1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
