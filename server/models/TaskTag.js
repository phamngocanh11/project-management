"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskTagSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    tagId: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    index: { type: Number, default: 0 },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

TaskTagSchema.index({ taskId: 1, tagId: 1 }, { unique: true });

module.exports = mongoose.models.TaskTag || mongoose.model("TaskTag", TaskTagSchema);


