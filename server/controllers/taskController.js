"use strict";

const {
  Task,
  TaskCoordinator,
  Project,
  ProjectMember,
  User,
} = require("../models");

// Get tasks in project
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // Check if user is member of project
    const projectMember = await ProjectMember.findOne({
      projectId,
      userId,
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied to project" });
    }

    // Get tasks in project
    const tasks = await Task.find({ projectId })
      .populate("assigneeId", "userName firstName lastName avatarUrl")
      .populate("reporterId", "userName firstName lastName avatarUrl")
      .populate("projectId", "name")
      .sort({ createdAt: -1 });

    res.json({
      tasks: tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assigneeId,
        reporter: task.reporterId,
        project: task.projectId,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      assigneeId,
      priority = "Medium",
      dueDate,
    } = req.body;
    const userId = req.user.id;

    // Check if user is member of project
    const projectMember = await ProjectMember.findOne({
      projectId,
      userId,
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied to project" });
    }

    // If assignee is specified, check if they are project member
    if (assigneeId) {
      const assigneeMember = await ProjectMember.findOne({
        projectId,
        userId: assigneeId,
      });

      if (!assigneeMember) {
        return res
          .status(400)
          .json({ message: "Assignee is not a project member" });
      }
    }

    // Create task
    const task = new Task({
      title,
      description,
      projectId,
      reporterId: userId,
      assigneeId: assigneeId || null,
      status: "To Do",
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    await task.save();

    // Populate task data
    await task.populate([
      { path: "assigneeId", select: "userName firstName lastName avatarUrl" },
      { path: "reporterId", select: "userName firstName lastName avatarUrl" },
      { path: "projectId", select: "name" },
    ]);

    res.status(201).json({
      message: "Task created successfully",
      task: {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assigneeId,
        reporter: task.reporterId,
        project: task.projectId,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  } catch (error) {
    console.error("Create task error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get task by ID
exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Get task
    const task = await Task.findById(id)
      .populate("assigneeId", "userName firstName lastName avatarUrl")
      .populate("reporterId", "userName firstName lastName avatarUrl")
      .populate("projectId", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user is member of project
    const projectMember = await ProjectMember.findOne({
      projectId: task.projectId._id,
      userId,
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      task: {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assigneeId,
        reporter: task.reporterId,
        project: task.projectId,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assigneeId, dueDate } =
      req.body;
    const userId = req.user.id;

    // Get task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user is member of project
    const projectMember = await ProjectMember.findOne({
      projectId: task.projectId,
      userId,
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    // If assignee is being changed, check if they are project member
    if (assigneeId && assigneeId !== task.assigneeId?.toString()) {
      const assigneeMember = await ProjectMember.findOne({
        projectId: task.projectId,
        userId: assigneeId,
      });

      if (!assigneeMember) {
        return res
          .status(400)
          .json({ message: "Assignee is not a project member" });
      }
    }

    const updateData = { title, description, status, priority };
    if (assigneeId !== undefined) updateData.assigneeId = assigneeId || null;
    if (dueDate) updateData.dueDate = new Date(dueDate);

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("assigneeId", "userName firstName lastName avatarUrl")
      .populate("reporterId", "userName firstName lastName avatarUrl")
      .populate("projectId", "name");

    res.json({
      message: "Task updated successfully",
      task: {
        id: updatedTask._id,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        priority: updatedTask.priority,
        assignee: updatedTask.assigneeId,
        reporter: updatedTask.reporterId,
        project: updatedTask.projectId,
        dueDate: updatedTask.dueDate,
        createdAt: updatedTask.createdAt,
        updatedAt: updatedTask.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update task error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Get task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user is task reporter or project owner/admin
    const projectMember = await ProjectMember.findOne({
      projectId: task.projectId,
      userId,
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    const canDelete =
      task.reporterId.toString() === userId ||
      projectMember.role === "Owner" ||
      projectMember.role === "Admin";

    if (!canDelete) {
      return res
        .status(403)
        .json({ message: "Only task reporter or project admin can delete" });
    }

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
