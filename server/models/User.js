"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    hashedPassword: { type: String },
    email: { type: String, required: true, trim: true, lowercase: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    avatarUrl: { type: String, default: null },
    avatar: { type: String, default: null },
    googleId: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false },

    passwordResetToken: { type: String, default: undefined },
    passwordResetExpires: { type: Date, default: undefined },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "createdTime", updatedAt: "modifiedTime" },
  }
);

UserSchema.index({ userName: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ googleId: 1 }, { sparse: true });

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
