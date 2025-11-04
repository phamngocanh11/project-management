"use strict";

const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const taskController = require("../controllers/taskController");

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// Task routes
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.get("/:id", taskController.getTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
