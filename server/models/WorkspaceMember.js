"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const WorkspaceMemberSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    role: {
      type: String,
      enum: ["Owner", "Admin", "Member"],
      default: "Member",
    },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

WorkspaceMemberSchema.index({ workspaceId: 1, userId: 1 }, { unique: true });

module.exports =
  mongoose.models.WorkspaceMember ||
  mongoose.model("WorkspaceMember", WorkspaceMemberSchema);
