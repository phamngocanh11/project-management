"use strict";

const { Workspace, Project, Task, WorkspaceMember } = require("../models");

// Get dashboard analytics
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's workspaces
    const userWorkspaces = await WorkspaceMember.find({ userId }).select(
      "workspaceId"
    );
    const workspaceIds = userWorkspaces.map((w) => w.workspaceId);

    // Get projects in user's workspaces
    const userProjects = await Project.find({
      workspaceId: { $in: workspaceIds },
    }).select("_id");
    const projectIds = userProjects.map((p) => p._id);

    // Calculate stats
    const [
      totalWorkspaces,
      totalProjects,
      totalTasks,
      myTasks,
      pendingTasks,
      completedTasks,
      overdueTasks,
      recentProjects,
      recentTasks,
    ] = await Promise.all([
      // Total workspaces user is member of
      WorkspaceMember.countDocuments({ userId }),

      // Total projects in user's workspaces
      Project.countDocuments({ workspaceId: { $in: workspaceIds } }),

      // Total tasks in user's projects
      Task.countDocuments({ projectId: { $in: projectIds } }),

      // Tasks assigned to user
      Task.countDocuments({
        projectId: { $in: projectIds },
        assigneeId: userId,
      }),

      // Pending tasks (To Do, In Progress)
      Task.countDocuments({
        projectId: { $in: projectIds },
        status: { $in: ["To Do", "In Progress"] },
      }),

      // Completed tasks
      Task.countDocuments({
        projectId: { $in: projectIds },
        status: "Done",
      }),

      // Overdue tasks
      Task.countDocuments({
        projectId: { $in: projectIds },
        dueDate: { $lt: new Date() },
        status: { $ne: "Done" },
      }),

      // Recent projects (last 5)
      Project.find({ workspaceId: { $in: workspaceIds } })
        .populate("ownerId", "userName firstName lastName avatarUrl")
        .populate("workspaceId", "name")
        .sort({ updatedAt: -1 })
        .limit(5),

      // Recent tasks (last 10)
      Task.find({ projectId: { $in: projectIds } })
        .populate("assigneeId", "userName firstName lastName avatarUrl")
        .populate("projectId", "name")
        .sort({ updatedAt: -1 })
        .limit(10),
    ]);

    // Calculate completion rate
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      stats: {
        totalWorkspaces,
        totalProjects,
        totalTasks,
        myTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
        completionRate,
      },
      recentActivity: {
        projects: recentProjects.map((project) => ({
          id: project._id,
          name: project.name,
          status: project.status,
          owner: project.ownerId,
          workspace: project.workspaceId,
          updatedAt: project.updatedAt,
        })),
        tasks: recentTasks.map((task) => ({
          id: task._id,
          title: task.title,
          status: task.status,
          priority: task.priority,
          assignee: task.assigneeId,
          project: task.projectId,
          updatedAt: task.updatedAt,
        })),
      },
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get workspace statistics
exports.getWorkspaceStats = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const userId = req.user.id;

    // Check if user is member of workspace
    const workspaceMember = await WorkspaceMember.findOne({
      workspaceId,
      userId,
    });

    if (!workspaceMember) {
      return res.status(403).json({ message: "Access denied to workspace" });
    }

    // Get projects in workspace
    const workspaceProjects = await Project.find({ workspaceId }).select("_id");
    const projectIds = workspaceProjects.map((p) => p._id);

    const [
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      pendingTasks,
      completedTasks,
      totalMembers,
    ] = await Promise.all([
      Project.countDocuments({ workspaceId }),
      Project.countDocuments({
        workspaceId,
        status: { $in: ["Planning", "In Progress"] },
      }),
      Project.countDocuments({
        workspaceId,
        status: "Completed",
      }),
      Task.countDocuments({ projectId: { $in: projectIds } }),
      Task.countDocuments({
        projectId: { $in: projectIds },
        status: { $in: ["To Do", "In Progress"] },
      }),
      Task.countDocuments({
        projectId: { $in: projectIds },
        status: "Done",
      }),
      WorkspaceMember.countDocuments({ workspaceId }),
    ]);

    res.json({
      workspaceStats: {
        totalProjects,
        activeProjects,
        completedProjects,
        totalTasks,
        pendingTasks,
        completedTasks,
        totalMembers,
        completionRate:
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      },
    });
  } catch (error) {
    console.error("Get workspace stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
