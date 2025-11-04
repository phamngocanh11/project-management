"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    statusId: { type: Schema.Types.ObjectId, ref: "Status" },
    assigneeId: { type: Schema.Types.ObjectId, ref: "User", default: null },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Highest"],
      default: "Medium",
    },

    importanceId: { type: Schema.Types.ObjectId, ref: "Importance" },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    parentId: { type: Schema.Types.ObjectId, ref: "Task", default: null },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

TaskSchema.index({ projectId: 1 });
TaskSchema.index({ assigneeId: 1 });
TaskSchema.index({ parentId: 1 });

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);


