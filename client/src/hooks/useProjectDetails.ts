import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Project, Task, TeamMember } from "../types/project";

export function useProjectDetails() {
  const { workspaceId, projectId } = useParams<{
    workspaceId: string;
    projectId: string;
  }>();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("tasks");

  // Mock data - sẽ được thay thế bằng API calls thực
  const project: Project = {
    id: projectId || "",
    name: "Project Management System",
    description:
      "A comprehensive project management tool with task tracking, team collaboration, and reporting features.",
    status: "Active",
    priority: "High",
    progress: 75,
    teamSize: 5,
    dueDate: "2025-12-31",
    createdAt: "2025-10-01",
    workspace: {
      id: workspaceId || "",
      name: "Development Team",
    },
  };

  const tasks: Task[] = [
    {
      id: "1",
      title: "Setup project structure",
      description:
        "Initialize the project with proper folder structure and dependencies",
      status: "Completed",
      priority: "High",
      assignee: "John Doe",
      dueDate: "2025-11-15",
      createdAt: "2025-11-01",
      type: "Feature",
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Add login, signup, and JWT token management",
      status: "In Progress",
      priority: "High",
      assignee: "Jane Smith",
      dueDate: "2025-11-20",
      createdAt: "2025-11-02",
      type: "Feature",
    },
    {
      id: "3",
      title: "Design database schema",
      description: "Create ERD and implement database tables",
      status: "Todo",
      priority: "Medium",
      assignee: "Bob Wilson",
      dueDate: "2025-11-25",
      createdAt: "2025-11-03",
      type: "Feature",
    },
    {
      id: "4",
      title: "Fix login validation bug",
      description: "Users can't login with special characters in password",
      status: "In Review",
      priority: "High",
      assignee: "Alice Brown",
      dueDate: "2025-11-18",
      createdAt: "2025-11-04",
      type: "Bug",
    },
  ];

  const teamMembers: TeamMember[] = [
    { id: "1", name: "John Doe", role: "Frontend Developer", avatar: "JD" },
    { id: "2", name: "Jane Smith", role: "Backend Developer", avatar: "JS" },
    { id: "3", name: "Bob Wilson", role: "Database Admin", avatar: "BW" },
    { id: "4", name: "Alice Brown", role: "QA Engineer", avatar: "AB" },
    { id: "5", name: "Charlie Davis", role: "Project Manager", avatar: "CD" },
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    project,
    tasks,
    teamMembers,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    workspaceId,
    projectId,
  };
}
