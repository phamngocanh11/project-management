import { useState } from "react";
import { Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Planning" | "On Hold" | "Completed";
  priority: "High" | "Medium" | "Low";
  progress: number;
  teamSize: number;
  dueDate: string;
  createdAt: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
}

export function useProjectManagement() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Mock data - will be replaced with real API calls
  const workspace = {
    id: workspaceId,
    name: "Development Team",
    description: "Main development workspace for our projects",
  };

  const projects: ProjectData[] = [
    {
      id: "1",
      name: "Project Management System",
      description:
        "A comprehensive project management tool with task tracking, team collaboration, and reporting features.",
      status: "Active",
      priority: "High",
      progress: 75,
      teamSize: 5,
      dueDate: "2025-12-31",
      createdAt: "2025-10-01",
    },
    {
      id: "2",
      name: "E-commerce Platform",
      description:
        "Modern e-commerce platform with advanced features and mobile-first design.",
      status: "Planning",
      priority: "Medium",
      progress: 25,
      teamSize: 3,
      dueDate: "2026-06-30",
      createdAt: "2025-11-01",
    },
  ];

  const handleCreateProject = async (values: CreateProjectData) => {
    try {
      console.log("Creating project:", values);
      // TODO: Implement project creation API call
      setIsCreateModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    // State
    searchTerm,
    setSearchTerm,
    isCreateModalOpen,
    setIsCreateModalOpen,
    form,

    // Data
    workspace,
    projects,
    filteredProjects,
    workspaceId,

    // Handlers
    handleCreateProject,
    navigate,
  };
}
