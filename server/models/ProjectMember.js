"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProjectMemberSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    role: { type: String, enum: ["Admin", "Member"], default: "Member" },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

ProjectMemberSchema.index({ projectId: 1, userId: 1 }, { unique: true });

module.exports =
  mongoose.models.ProjectMember || mongoose.model("ProjectMember", ProjectMemberSchema);


