"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    statusId: { type: Schema.Types.ObjectId, ref: "Status" },
    workSpaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    parentId: { type: Schema.Types.ObjectId, ref: "Project", default: null },

    taskGroupStatusId: {
      type: Schema.Types.ObjectId,
      ref: "GroupStatus",
      required: true,
    },
    projectGroupStatusId: {
      type: Schema.Types.ObjectId,
      ref: "GroupStatus",
      required: true,
    },
    groupImportanceId: {
      type: Schema.Types.ObjectId,
      ref: "GroupImportance",
      required: true,
    },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

ProjectSchema.index({ workSpaceId: 1 });
ProjectSchema.index({ parentId: 1 });

module.exports =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
