"use strict";

const express = require("express");
const multer = require("multer");
const { requireAuth } = require("../middlewares/auth");
const userController = require("../controllers/userController");

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// All routes require authentication
router.use(requireAuth);

// User profile routes
router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.put("/password", userController.changePassword);
router.put("/avatar", upload.single("avatar"), userController.uploadAvatar);

module.exports = router;
