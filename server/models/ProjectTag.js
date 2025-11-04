"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProjectTagSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    tagId: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    index: { type: Number, default: 0 },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

ProjectTagSchema.index({ projectId: 1, tagId: 1 }, { unique: true });

module.exports =
  mongoose.models.ProjectTag || mongoose.model("ProjectTag", ProjectTagSchema);


