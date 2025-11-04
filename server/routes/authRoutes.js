"use strict";

const { Router } = require("express");
const ctrl = require("../controllers/authController");
const { requireAuth } = require("../middlewares/auth");

const router = Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/google", ctrl.googleAuth);
router.post("/forgot-password", ctrl.forgotPassword);
router.post("/reset-password", ctrl.resetPassword);
router.post("/logout", requireAuth, ctrl.logout);
router.get("/me", requireAuth, ctrl.me);
router.put("/update-profile", requireAuth, ctrl.updateProfile);
router.post("/change-password", requireAuth, ctrl.changePassword);
router.post("/upload-avatar", requireAuth, ctrl.uploadAvatar);

module.exports = router;
