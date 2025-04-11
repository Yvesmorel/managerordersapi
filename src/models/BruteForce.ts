const mongoose = require("mongoose");

const BruteForceProtectionSchema = new mongoose.Schema(
  {
    ipAddress: { type: String, required: true, unique: true },
    attempts: { type: Number, default: 1 },
    lastAttempt: { type: Date, default: Date.now },
    isBlocked: { type: Boolean, default: false },
    blockedUntil: { type: Date, default: null },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BruteForceProtection",
  BruteForceProtectionSchema
);
