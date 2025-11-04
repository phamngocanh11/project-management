"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const AttachmentSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: "" },
    uploaderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    entityType: { type: String, enum: ["TASK", "PROJECT"], required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "uploadTime", updatedAt: "modifiedTime" },
  }
);

AttachmentSchema.index({ entityType: 1, entityId: 1, uploadTime: -1 });

module.exports =
  mongoose.models.Attachment || mongoose.model("Attachment", AttachmentSchema);
