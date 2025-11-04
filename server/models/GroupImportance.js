"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const GroupImportanceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

GroupImportanceSchema.index({ name: 1 });

module.exports =
  mongoose.models.GroupImportance ||
  mongoose.model("GroupImportance", GroupImportanceSchema);


