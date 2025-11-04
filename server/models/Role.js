"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

RoleSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.models.Role || mongoose.model("Role", RoleSchema);


