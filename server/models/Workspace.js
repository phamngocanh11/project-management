"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const WorkspaceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

WorkspaceSchema.index({ name: 1 });

module.exports =
  mongoose.models.Workspace || mongoose.model("Workspace", WorkspaceSchema);
