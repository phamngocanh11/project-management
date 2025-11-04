import { MainLayout } from "../components/layout/MainLayout";
import { ProjectListHeader } from "../components/project-list/ProjectListHeader";
import { ProjectListStats } from "../components/project-list/ProjectListStats";
import { ProjectSearch } from "../components/project-list/ProjectSearch";
import { ProjectGrid } from "../components/project-list/ProjectGrid";
import { CreateProjectModal } from "../components/project-list/CreateProjectModal";
import { useProjectManagement } from "../hooks/useProjectManagement";

export function ProjectPage() {
  const {
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
  } = useProjectManagement();

  const handleCreateModalOpen = () => setIsCreateModalOpen(true);
  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  return (
    <MainLayout>
      <ProjectListHeader
        workspace={workspace}
        onBack={() => navigate("/workspaces")}
        onCreateProject={handleCreateModalOpen}
      />

      <ProjectListStats projects={projects} />

      {/* Content */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px" }}>
        <ProjectSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <ProjectGrid
          projects={filteredProjects}
          searchTerm={searchTerm}
          workspaceId={workspaceId}
          onNavigate={(path) => navigate(path)}
          onCreateProject={handleCreateModalOpen}
        />
      </div>

      <CreateProjectModal
        open={isCreateModalOpen}
        onCancel={handleCreateModalClose}
        onSubmit={handleCreateProject}
        form={form}
        loading={false}
      />
    </MainLayout>
  );
}

export default ProjectPage;
