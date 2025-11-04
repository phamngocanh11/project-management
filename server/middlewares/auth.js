"use strict";

const jwt = require("jsonwebtoken");
const { User, WorkspaceMember, ProjectMember } = require("../models");

exports.requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).lean();
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = {
      id: user._id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
exports.requireWorkspaceRole = (roles) => {
  return async (req, res, next) => {
    try {
      const workspaceId =
        req.params.workspaceId || req.body.workspaceId || req.query.workspaceId;
      if (!workspaceId) {
        return res.status(400).json({ message: "workspaceId is required" });
      }
      const membership = await WorkspaceMember.findOne({
        workspaceId,
        userId: req.user.id,
      }).lean();
      if (!membership || (roles && !roles.includes(membership.role))) {
        return res.status(403).json({ message: "Forbidden" });
      }
      return next();
    } catch (_err) {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};

exports.requireProjectRole = (roles) => {
  return async (req, res, next) => {
    try {
      const projectId =
        req.params.projectId || req.body.projectId || req.query.projectId;
      if (!projectId) {
        return res.status(400).json({ message: "projectId is required" });
      }
      const membership = await ProjectMember.findOne({
        projectId,
        userId: req.user.id,
      }).lean();
      if (!membership || (roles && !roles.includes(membership.role))) {
        return res.status(403).json({ message: "Forbidden" });
      }
      return next();
    } catch (_err) {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};
