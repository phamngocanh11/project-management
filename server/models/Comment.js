"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    entityType: { type: String, enum: ["TASK", "PROJECT"], required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

CommentSchema.index({ entityType: 1, entityId: 1, createdTime: -1 });

module.exports = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);


