"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const TagSchema = new Schema(
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

TagSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.models.Tag || mongoose.model("Tag", TagSchema);


