"use strict";

const { Workspace, WorkspaceMember, User } = require("../models");

// Get user's workspaces
exports.getWorkspaces = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get workspaces where user is a member
    const workspaceMembers = await WorkspaceMember.find({ userId }).populate({
      path: "workspaceId",
      select: "name description createdTime modifiedTime createdBy",
      populate: {
        path: "createdBy",
        select: "userName firstName lastName avatarUrl",
      },
    });

    // Filter out any null workspaceId and map to proper format
    const workspaces = workspaceMembers
      .filter((member) => member.workspaceId)
      .map((member) => ({
        id: member.workspaceId._id,
        name: member.workspaceId.name,
        description: member.workspaceId.description,
        role: member.role,
        owner: member.workspaceId.createdBy,
        createdAt: member.workspaceId.createdTime,
        updatedAt: member.workspaceId.modifiedTime,
      }));

    res.json({ workspaces });
  } catch (error) {
    console.error("Get workspaces error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Create new workspace
exports.createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    // Create workspace
    const workspace = new Workspace({
      name,
      description,
      createdBy: userId,
      modifiedBy: userId,
    });

    await workspace.save();

    // Add creator as workspace owner
    const workspaceMember = new WorkspaceMember({
      workspaceId: workspace._id,
      userId,
      role: "Owner",
    });

    await workspaceMember.save();

    // Populate owner data
    await workspace.populate(
      "createdBy",
      "userName firstName lastName avatarUrl"
    );

    res.status(201).json({
      message: "Workspace created successfully",
      workspace: {
        id: workspace._id,
        name: workspace.name,
        description: workspace.description,
        owner: workspace.createdBy,
        role: "Owner",
        createdAt: workspace.createdTime,
        updatedAt: workspace.modifiedTime,
      },
    });
  } catch (error) {
    console.error("Create workspace error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get workspace by ID
exports.getWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user is member of workspace
    const workspaceMember = await WorkspaceMember.findOne({
      workspaceId: id,
      userId,
    });

    if (!workspaceMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Get workspace with owner and members
    const workspace = await Workspace.findById(id).populate(
      "ownerId",
      "userName firstName lastName avatarUrl"
    );

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // Get all members
    const members = await WorkspaceMember.find({ workspaceId: id }).populate(
      "userId",
      "userName firstName lastName avatarUrl email"
    );

    res.json({
      workspace: {
        id: workspace._id,
        name: workspace.name,
        description: workspace.description,
        owner: workspace.ownerId,
        members: members.map((member) => ({
          id: member._id,
          user: member.userId,
          role: member.role,
          joinedAt: member.createdAt,
        })),
        userRole: workspaceMember.role,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get workspace error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update workspace
exports.updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    // Check if user is owner or admin
    const workspaceMember = await WorkspaceMember.findOne({
      workspaceId: id,
      userId,
      role: { $in: ["Owner", "Admin"] },
    });

    if (!workspaceMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    const workspace = await Workspace.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    ).populate("ownerId", "userName firstName lastName avatarUrl");

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.json({
      message: "Workspace updated successfully",
      workspace: {
        id: workspace._id,
        name: workspace.name,
        description: workspace.description,
        owner: workspace.ownerId,
        userRole: workspaceMember.role,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update workspace error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete workspace
exports.deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user is owner through WorkspaceMember
    const workspaceMember = await WorkspaceMember.findOne({
      workspaceId: id,
      userId,
      role: "Owner",
    });

    if (!workspaceMember) {
      return res
        .status(403)
        .json({ message: "Only workspace owner can delete this workspace" });
    }

    // Check if workspace exists
    const workspace = await Workspace.findById(id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // Delete workspace and all related data
    await WorkspaceMember.deleteMany({ workspaceId: id });
    await Workspace.findByIdAndDelete(id);

    res.json({ message: "Workspace deleted successfully" });
  } catch (error) {
    console.error("Delete workspace error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
