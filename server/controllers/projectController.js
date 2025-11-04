"use strict";

const {
  Project,
  ProjectMember,
  Workspace,
  WorkspaceMember,
  User,
} = require("../models");

// Get projects in workspace
exports.getProjects = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    const userId = req.user.id;

    if (!workspaceId) {
      return res.status(400).json({ message: "Workspace ID is required" });
    }

    // Check if user is member of workspace
    const workspaceMember = await WorkspaceMember.findOne({
      workspaceId,
      userId,
    });

    if (!workspaceMember) {
      return res.status(403).json({ message: "Access denied to workspace" });
    }

    // Get projects in workspace
    const projects = await Project.find({ workspaceId })
      .populate("ownerId", "userName firstName lastName avatarUrl")
      .populate("workspaceId", "name")
      .sort({ createdAt: -1 });

    // Get member count for each project
    const projectsWithMembers = await Promise.all(
      projects.map(async (project) => {
        const memberCount = await ProjectMember.countDocuments({
          projectId: project._id,
        });

        return {
          id: project._id,
          name: project.name,
          description: project.description,
          status: project.status,
          priority: project.priority,
          startDate: project.startDate,
          endDate: project.endDate,
          owner: project.ownerId,
          workspace: project.workspaceId,
          memberCount,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        };
      })
    );

    res.json({ projects: projectsWithMembers });
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      workspaceId,
      priority = "Medium",
      startDate,
      endDate,
    } = req.body;
    const userId = req.user.id;

    // Check if user is member of workspace
    const workspaceMember = await WorkspaceMember.findOne({
      workspaceId,
      userId,
      role: { $in: ["Owner", "Admin", "Member"] },
    });

    if (!workspaceMember) {
      return res.status(403).json({ message: "Access denied to workspace" });
    }

    // Create project
    const project = new Project({
      name,
      description,
      workspaceId,
      ownerId: userId,
      status: "Planning",
      priority,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    });

    await project.save();

    // Add creator as project owner
    const projectMember = new ProjectMember({
      projectId: project._id,
      userId,
      role: "Owner",
    });

    await projectMember.save();

    // Populate owner and workspace data
    await project.populate([
      { path: "ownerId", select: "userName firstName lastName avatarUrl" },
      { path: "workspaceId", select: "name" },
    ]);

    res.status(201).json({
      message: "Project created successfully",
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        priority: project.priority,
        startDate: project.startDate,
        endDate: project.endDate,
        owner: project.ownerId,
        workspace: project.workspaceId,
        memberCount: 1,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    });
  } catch (error) {
    console.error("Create project error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get project by ID
exports.getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user is member of project
    const projectMember = await ProjectMember.findOne({
      projectId: id,
      userId,
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied to project" });
    }

    // Get project with owner and workspace
    const project = await Project.findById(id)
      .populate("ownerId", "userName firstName lastName avatarUrl")
      .populate("workspaceId", "name");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Get all members
    const members = await ProjectMember.find({ projectId: id }).populate(
      "userId",
      "userName firstName lastName avatarUrl email"
    );

    res.json({
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        priority: project.priority,
        startDate: project.startDate,
        endDate: project.endDate,
        owner: project.ownerId,
        workspace: project.workspaceId,
        members: members.map((member) => ({
          id: member._id,
          user: member.userId,
          role: member.role,
          joinedAt: member.createdAt,
        })),
        userRole: projectMember.role,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, priority, startDate, endDate } =
      req.body;
    const userId = req.user.id;

    // Check if user is owner or admin
    const projectMember = await ProjectMember.findOne({
      projectId: id,
      userId,
      role: { $in: ["Owner", "Admin"] },
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updateData = { name, description, status, priority };
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("ownerId", "userName firstName lastName avatarUrl")
      .populate("workspaceId", "name");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const memberCount = await ProjectMember.countDocuments({ projectId: id });

    res.json({
      message: "Project updated successfully",
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        priority: project.priority,
        startDate: project.startDate,
        endDate: project.endDate,
        owner: project.ownerId,
        workspace: project.workspaceId,
        memberCount,
        userRole: projectMember.role,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update project error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user is owner
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.ownerId.toString() !== userId) {
      return res.status(403).json({ message: "Only project owner can delete" });
    }

    // Delete project and all related data
    await ProjectMember.deleteMany({ projectId: id });
    await Project.findByIdAndDelete(id);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add member to project
exports.addProjectMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userEmail, role = "Member" } = req.body;
    const userId = req.user.id;

    // Check if user is owner or admin
    const projectMember = await ProjectMember.findOne({
      projectId: id,
      userId,
      role: { $in: ["Owner", "Admin"] },
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find user by email
    const userToAdd = await User.findOne({ email: userEmail });
    if (!userToAdd) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already a member
    const existingMember = await ProjectMember.findOne({
      projectId: id,
      userId: userToAdd._id,
    });

    if (existingMember) {
      return res.status(400).json({ message: "User is already a member" });
    }

    // Add member
    const newMember = new ProjectMember({
      projectId: id,
      userId: userToAdd._id,
      role,
    });

    await newMember.save();
    await newMember.populate(
      "userId",
      "userName firstName lastName avatarUrl email"
    );

    res.status(201).json({
      message: "Member added successfully",
      member: {
        id: newMember._id,
        user: newMember.userId,
        role: newMember.role,
        joinedAt: newMember.createdAt,
      },
    });
  } catch (error) {
    console.error("Add project member error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove member from project
exports.removeProjectMember = async (req, res) => {
  try {
    const { id, memberId } = req.params;
    const userId = req.user.id;

    // Check if user is owner or admin
    const projectMember = await ProjectMember.findOne({
      projectId: id,
      userId,
      role: { $in: ["Owner", "Admin"] },
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Cannot remove project owner
    const memberToRemove = await ProjectMember.findById(memberId);
    if (!memberToRemove) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (memberToRemove.role === "Owner") {
      return res.status(400).json({ message: "Cannot remove project owner" });
    }

    await ProjectMember.findByIdAndDelete(memberId);

    res.json({ message: "Member removed successfully" });
  } catch (error) {
    console.error("Remove project member error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
