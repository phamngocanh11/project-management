import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Dropdown,
  Badge,
  Progress,
  Empty,
} from "antd";
import {
  ProjectOutlined,
  SettingOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { ProjectData } from "../../hooks/useProjectManagement";

const { Title, Text } = Typography;

interface ProjectGridProps {
  projects: ProjectData[];
  searchTerm: string;
  workspaceId?: string;
  onNavigate: (path: string) => void;
  onCreateProject: () => void;
}

export function ProjectGrid({
  projects,
  searchTerm,
  workspaceId,
  onNavigate,
  onCreateProject,
}: ProjectGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "#52c41a";
      case "Planning":
        return "#1890ff";
      case "On Hold":
        return "#faad14";
      case "Completed":
        return "#722ed1";
      default:
        return "#d9d9d9";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ff4d4f";
      case "Medium":
        return "#faad14";
      case "Low":
        return "#52c41a";
      default:
        return "#d9d9d9";
    }
  };

  if (projects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            searchTerm ? (
              <span>
                No projects found matching "<strong>{searchTerm}</strong>"
              </span>
            ) : (
              <span>No projects yet</span>
            )
          }
        >
          {!searchTerm && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onCreateProject}
            >
              Create Your First Project
            </Button>
          )}
        </Empty>
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]}>
      {projects.map((project) => (
        <Col key={project.id} xs={24} sm={12} lg={8}>
          <Card
            hoverable
            style={{ height: "100%" }}
            styles={{
              body: {
                padding: 24,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              },
            }}
            extra={
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "view",
                      label: (
                        <Space>
                          <ProjectOutlined />
                          <span>View Project</span>
                        </Space>
                      ),
                      onClick: () =>
                        onNavigate(
                          `/workspaces/${workspaceId}/projects/${project.id}`
                        ),
                    },
                    {
                      key: "settings",
                      label: (
                        <Space>
                          <SettingOutlined />
                          <span>Settings</span>
                        </Space>
                      ),
                    },
                    {
                      type: "divider",
                    },
                    {
                      key: "delete",
                      label: (
                        <Space style={{ color: "#ff4d4f" }}>
                          <DeleteOutlined />
                          <span>Delete Project</span>
                        </Space>
                      ),
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <Button
                  type="text"
                  icon={<EllipsisOutlined />}
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>
            }
            onClick={() =>
              onNavigate(`/workspaces/${workspaceId}/projects/${project.id}`)
            }
          >
            <div style={{ flexGrow: 1 }}>
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <Badge
                    color={getStatusColor(project.status)}
                    text={project.status}
                  />
                  <Badge
                    color={getPriorityColor(project.priority)}
                    text={`${project.priority} Priority`}
                  />
                </div>
                <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
                  {project.name}
                </Title>
                <Text
                  type="secondary"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.4,
                    minHeight: "2.8em",
                  }}
                >
                  {project.description}
                </Text>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#8c8c8c" }}>
                    Progress
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>
                    {project.progress}%
                  </Text>
                </div>
                <Progress
                  percent={project.progress}
                  strokeColor={getStatusColor(project.status)}
                  size="small"
                  showInfo={false}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 12,
                  borderTop: "1px solid #f0f0f0",
                  marginTop: "auto",
                }}
              >
                <Space size="small">
                  <TeamOutlined style={{ color: "#8c8c8c" }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {project.teamSize} members
                  </Text>
                </Space>
                <Space size="small">
                  <CalendarOutlined style={{ color: "#8c8c8c" }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {new Date(project.dueDate).toLocaleDateString()}
                  </Text>
                </Space>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
