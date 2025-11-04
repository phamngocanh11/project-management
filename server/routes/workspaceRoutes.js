"use strict";

const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const workspaceController = require("../controllers/workspaceController");

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// Workspace routes
router.get("/", workspaceController.getWorkspaces);
router.post("/", workspaceController.createWorkspace);
router.get("/:id", workspaceController.getWorkspace);
router.put("/:id", workspaceController.updateWorkspace);
router.delete("/:id", workspaceController.deleteWorkspace);

module.exports = router;
