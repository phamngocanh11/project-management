import { Spin, Alert } from "antd";
import { MainLayout } from "../components/layout/MainLayout";
import { WorkspaceHeader } from "../components/workspace/WorkspaceHeader";
import { WorkspaceStats } from "../components/workspace/WorkspaceStats";
import { WorkspaceSearch } from "../components/workspace/WorkspaceSearch";
import { WorkspaceGrid } from "../components/workspace/WorkspaceGrid";
import { CreateWorkspaceModal } from "../components/workspace/CreateWorkspaceModal";
import { useWorkspaceManagement } from "../hooks/useWorkspaceManagement";

export function WorkspacePage() {
  const {
    // State
    isCreateModalOpen,
    setIsCreateModalOpen,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    form,

    // Data
    isLoading,
    error,
    totalWorkspaces,
    ownedCount,
    tabFiltered,

    // Mutations
    createWorkspaceMutation,

    // Handlers
    handleCreateWorkspace,
    handleDeleteWorkspace,
    navigate,
  } = useWorkspaceManagement();

  const handleCreateModalOpen = () => setIsCreateModalOpen(true);
  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div
          style={{
            minHeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert
          message="Error loading workspaces"
          description="Unable to load workspaces. Please try again."
          type="error"
          showIcon
          style={{ margin: 24 }}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <WorkspaceHeader onCreateWorkspace={handleCreateModalOpen} />

      <WorkspaceStats
        totalWorkspaces={totalWorkspaces}
        ownedCount={ownedCount}
      />

      {/* Content */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: 24 }}>
        <WorkspaceSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <WorkspaceGrid
          workspaces={tabFiltered}
          searchTerm={searchTerm}
          activeTab={activeTab}
          onNavigate={(path) => navigate(path)}
          onDeleteWorkspace={handleDeleteWorkspace}
          onCreateWorkspace={handleCreateModalOpen}
        />
      </div>

      <CreateWorkspaceModal
        open={isCreateModalOpen}
        onCancel={handleCreateModalClose}
        onSubmit={handleCreateWorkspace}
        form={form}
        loading={createWorkspaceMutation.isPending}
      />
    </MainLayout>
  );
}

export default WorkspacePage;
