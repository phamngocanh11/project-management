"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const GroupStatusSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, default: "" },
    backgroundColor: { type: String, default: "" },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

GroupStatusSchema.index({ name: 1 });

module.exports =
  mongoose.models.GroupStatus || mongoose.model("GroupStatus", GroupStatusSchema);


