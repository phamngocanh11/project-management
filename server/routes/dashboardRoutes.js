"use strict";

const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// Dashboard routes
router.get("/stats", dashboardController.getDashboardStats);
router.get(
  "/workspace/:workspaceId/stats",
  dashboardController.getWorkspaceStats
);

module.exports = router;
