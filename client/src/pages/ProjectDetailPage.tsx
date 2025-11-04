import { useState } from "react";
import { Empty, Button, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MainLayout } from "../components/layout/MainLayout";
import { ProjectDetailHeader } from "../components/project-detail/ProjectDetailHeader";
import { ProjectDetailStats } from "../components/project-detail/ProjectDetailStats";
import { TaskTable } from "../components/project-detail/TaskTable";
import { CreateTaskModal } from "../components/project-detail/CreateTaskModal";
import { TeamMembersTab } from "../components/project-detail/TeamMembersTab";
import { ProjectOverviewTab } from "../components/project-detail/ProjectOverviewTab";
import { useProjectDetails } from "../hooks/useProjectDetails";
import type { CreateTaskData } from "../types/project";

const { TabPane } = Tabs;

export function ProjectDetailPage() {
  const {
    project,
    tasks,
    teamMembers,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
  } = useProjectDetails();

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const handleCreateTask = async (values: CreateTaskData) => {
    try {
      console.log("Creating task:", values);
      // TODO: Implement task creation API call
      setIsCreateTaskModalOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <MainLayout>
      <ProjectDetailHeader
        project={project}
        onCreateTask={() => setIsCreateTaskModalOpen(true)}
      />
      <ProjectDetailStats project={project} tasks={tasks} />

      {/* Content Tabs */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px" }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
          <TabPane tab="Tasks" key="tasks">
            {filteredTasks.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <Empty
                  description={
                    searchTerm ? (
                      <span>
                        No tasks found matching "<strong>{searchTerm}</strong>"
                      </span>
                    ) : (
                      <span>No tasks yet</span>
                    )
                  }
                >
                  {!searchTerm && (
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsCreateTaskModalOpen(true)}
                    >
                      Create Your First Task
                    </Button>
                  )}
                </Empty>
              </div>
            ) : (
              <TaskTable
                tasks={filteredTasks}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            )}
          </TabPane>

          <TabPane tab="Team" key="team">
            <TeamMembersTab teamMembers={teamMembers} />
          </TabPane>

          <TabPane tab="Overview" key="overview">
            <ProjectOverviewTab tasks={tasks} />
          </TabPane>
        </Tabs>
      </div>

      <CreateTaskModal
        open={isCreateTaskModalOpen}
        onCancel={() => setIsCreateTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        teamMembers={teamMembers}
      />
    </MainLayout>
  );
}

export default ProjectDetailPage;
