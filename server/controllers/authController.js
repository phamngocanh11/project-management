"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const multer = require("multer");
const { cloudinary } = require("../configs/cloudinary");
const { User } = require("../models");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signToken(userId) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign({ sub: userId }, secret, { expiresIn });
}

exports.register = async (req, res) => {
  try {
    const { userName, email, password, firstName, lastName } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await User.findOne({ $or: [{ userName }, { email }] });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      hashedPassword: hash,
      firstName: firstName || "",
      lastName: lastName || "",
    });

    const token = signToken(user._id.toString());
    return res.status(201).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }
    const user = await User.findOne({
      $or: [{ userName: userName }, { email: userName }],
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const ok = await bcrypt.compare(password, user.hashedPassword);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(user._id.toString());
    return res.json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
      },
      token,
    });
  } catch (_err) {
    return res.status(500).json({ message: "Login failed" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "If the email exists, a reset link was sent",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 1000 * 60 * 30;
    user.passwordResetToken = token;
    user.passwordResetExpires = new Date(expires);
    await user.save();
    return res.json({ message: "Reset token generated", token });
  } catch (_err) {
    return res.status(500).json({ message: "Failed to process request" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Missing token or password" });
    }
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return res.json({ message: "Password updated" });
  } catch (_err) {
    return res.status(500).json({ message: "Failed to reset password" });
  }
};

exports.logout = async (_req, res) => {
  return res.json({ message: "Logged out" });
};

exports.googleAuth = async (req, res) => {
  try {
    console.log("Google auth request body:", req.body);
    const { credential } = req.body;

    if (!credential) {
      console.log("No credential provided");
      return res.status(400).json({ message: "Google credential is required" });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.log("No Google Client ID in environment");
      return res
        .status(500)
        .json({ message: "Google Client ID not configured" });
    }

    console.log("Verifying Google token...");
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google payload:", {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
    });

    const googleId = payload.sub;
    const email = payload.email;
    const firstName = payload.given_name;
    const lastName = payload.family_name;
    const picture = payload.picture;

    let user = await User.findOne({
      $or: [{ email }, { googleId }],
    });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture;
        await user.save();
      }
    } else {
      user = new User({
        userName: email.split("@")[0] + "_" + Date.now(),
        email,
        firstName,
        lastName,
        googleId,
        avatar: picture,
        isEmailVerified: true,
      });
      await user.save();
    }

    const token = signToken(user._id);

    return res.json({
      message: "Google authentication successful",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    console.error("Error details:", error.message);
    return res.status(500).json({
      message: "Google authentication failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.me = async (req, res) => {
  return res.json({ user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, userName, email } = req.body;
    const userId = req.user.id;

    if (!userName || !email) {
      return res
        .status(400)
        .json({ message: "Username and email are required" });
    }

    const existingUser = await User.findOne({
      $and: [{ _id: { $ne: userId } }, { $or: [{ userName }, { email }] }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.userName === userName
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, userName, email },
      {
        new: true,
        select: "-hashedPassword -passwordResetToken -passwordResetExpires",
      }
    );

    return res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        userName: updatedUser.userName,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        avatarUrl: updatedUser.avatarUrl,
        isEmailVerified: updatedUser.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(userId);
    if (!user || !user.hashedPassword) {
      return res
        .status(400)
        .json({ message: "Cannot change password for this account" });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.hashedPassword
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { hashedPassword: hashedNewPassword });

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Failed to change password" });
  }
};

// Setup multer for avatar upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

exports.uploadAvatar = [
  upload.single("avatar"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Debug cloudinary
      console.log("Cloudinary object:", cloudinary);
      console.log("Cloudinary uploader:", cloudinary.uploader);

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "avatars",
              public_id: `avatar_${userId}`,
              transformation: [{ width: 400, height: 400, crop: "fill" }],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(file.buffer);
      });

      // Update user with new avatar URL
      const user = await User.findByIdAndUpdate(
        userId,
        { avatarUrl: result.secure_url },
        { new: true }
      );

      return res.json({
        message: "Avatar uploaded successfully",
        avatarUrl: result.secure_url,
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
        },
      });
    } catch (error) {
      console.error("Avatar upload error:", error);
      return res.status(500).json({ message: "Failed to upload avatar" });
    }
  },
];
