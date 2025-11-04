"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["ASSIGN_TASK", "MENTION_COMMENT", "STATUS_CHANGE", "GENERAL"],
      default: "GENERAL",
    },
    recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    entityType: { type: String, enum: ["TASK", "PROJECT"], required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
    isRead: { type: Boolean, default: false },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

NotificationSchema.index({ recipientId: 1, isRead: 1, createdTime: -1 });

module.exports =
  mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);


