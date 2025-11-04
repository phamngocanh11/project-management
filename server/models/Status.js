"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const StatusSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, default: "" },
    backgroundColor: { type: String, default: "" },
    groupStatusId: { type: Schema.Types.ObjectId, ref: "GroupStatus", required: true },
    index: { type: Number, default: 0 },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

StatusSchema.index({ groupStatusId: 1, index: 1 });

module.exports = mongoose.models.Status || mongoose.model("Status", StatusSchema);


