"use strict";

const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const projectController = require("../controllers/projectController");

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// Project routes
router.get("/", projectController.getProjects);
router.post("/", projectController.createProject);
router.get("/:id", projectController.getProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

// Project member routes
router.post("/:id/members", projectController.addProjectMember);
router.delete("/:id/members/:memberId", projectController.removeProjectMember);

module.exports = router;
