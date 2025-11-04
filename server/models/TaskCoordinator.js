"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskCoordinatorSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    index: { type: Number, default: 0 },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

TaskCoordinatorSchema.index({ taskId: 1, userId: 1 }, { unique: true });

module.exports =
  mongoose.models.TaskCoordinator ||
  mongoose.model("TaskCoordinator", TaskCoordinatorSchema);


