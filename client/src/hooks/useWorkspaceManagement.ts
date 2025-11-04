import { useState } from "react";
import { Form, App } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateWorkspaceData, Workspace } from "../types/api";

// Mock API functions - replace with actual API calls
const workspaceApi = {
  getAll: async (): Promise<Workspace[]> => {
    // Mock data for development
    return [
      {
        id: "1",
        name: "Personal Workspace",
        description: "My personal projects",
        owner: {
          id: "1",
          userName: "user",
          email: "user@example.com",
          createdAt: "",
          updatedAt: "",
        },
        role: "Owner",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  },
  create: async (data: CreateWorkspaceData): Promise<Workspace> => {
    return {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      owner: {
        id: "1",
        userName: "user",
        email: "user@example.com",
        createdAt: "",
        updatedAt: "",
      },
      role: "Owner",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
  delete: async (id: string): Promise<void> => {
    // Mock delete
    console.log("Deleting workspace:", id);
  },
};

// Custom hooks
function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: workspaceApi.getAll,
  });
}

function useCreateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: workspaceApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
}

function useDeleteWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: workspaceApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
}

export function useWorkspaceManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [form] = Form.useForm();
  const { message, modal } = App.useApp();
  const navigate = useNavigate();

  const { data: workspaces, isLoading, error } = useWorkspaces();
  const createWorkspaceMutation = useCreateWorkspace();
  const deleteWorkspaceMutation = useDeleteWorkspace();

  const filteredWorkspaces =
    workspaces?.filter(
      (workspace: Workspace) =>
        workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (workspace.description &&
          workspace.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    ) || [];

  const totalWorkspaces = workspaces?.length || 0;
  const ownedCount =
    workspaces?.filter((w: Workspace) => w.role === "Owner").length || 0;
  const tabFiltered =
    activeTab === "all"
      ? filteredWorkspaces
      : activeTab === "owned"
      ? filteredWorkspaces.filter((w: Workspace) => w.role === "Owner")
      : filteredWorkspaces.filter((w: Workspace) => w.role !== "Owner");

  const handleCreateWorkspace = async (values: CreateWorkspaceData) => {
    try {
      await createWorkspaceMutation.mutateAsync(values);
      message.success("Workspace created successfully!");
      setIsCreateModalOpen(false);
      form.resetFields();
    } catch {
      message.error("Failed to create workspace. Please try again.");
    }
  };

  const handleDeleteWorkspace = (
    workspaceId: string,
    workspaceName: string
  ) => {
    modal.confirm({
      title: "Delete Workspace",
      content: `Are you sure you want to delete "${workspaceName}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteWorkspaceMutation.mutateAsync(workspaceId);
          message.success("Workspace deleted successfully!");
        } catch (error) {
          console.error("Delete workspace error:", error);
          message.error(
            "Only workspace owners can delete workspaces. Please contact the workspace owner."
          );
        }
      },
    });
  };

  return {
    // State
    isCreateModalOpen,
    setIsCreateModalOpen,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    form,

    // Data
    workspaces,
    isLoading,
    error,
    filteredWorkspaces,
    totalWorkspaces,
    ownedCount,
    tabFiltered,

    // Mutations
    createWorkspaceMutation,
    deleteWorkspaceMutation,

    // Handlers
    handleCreateWorkspace,
    handleDeleteWorkspace,
    navigate,
  };
}
