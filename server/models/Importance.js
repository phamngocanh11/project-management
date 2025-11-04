"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ImportanceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, default: "" },
    backgroundColor: { type: String, default: "" },
    description: { type: String, default: "" },
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

ImportanceSchema.index({ groupImportanceId: 1, name: 1 }, { unique: true });

module.exports =
  mongoose.models.Importance || mongoose.model("Importance", ImportanceSchema);


