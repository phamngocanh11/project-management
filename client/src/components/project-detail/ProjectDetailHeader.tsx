import { useNavigate } from "react-router-dom";
import { Button, Typography, Space, Avatar, Badge, Dropdown } from "antd";
import {
  PlusOutlined,
  ProjectOutlined,
  SettingOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { Project } from "../../types/project";
import { getStatusColor, getPriorityColor } from "../../utils/projectUtils";

const { Title, Text } = Typography;

interface ProjectDetailHeaderProps {
  project: Project;
  onCreateTask: () => void;
}

export function ProjectDetailHeader({
  project,
  onCreateTask,
}: ProjectDetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #f5f5f5" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px" }}>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() =>
              navigate(`/workspaces/${project.workspace.id}/projects`)
            }
            style={{ marginBottom: 16 }}
          >
            Back to Projects
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <Avatar
                size={64}
                style={{ backgroundColor: "#1890ff" }}
                icon={<ProjectOutlined />}
              />
              <div>
                <Title level={2} style={{ margin: 0 }}>
                  {project.name}
                </Title>
                <Space>
                  <Badge
                    color={getStatusColor(project.status)}
                    text={project.status}
                  />
                  <Badge
                    color={getPriorityColor(project.priority)}
                    text={`${project.priority} Priority`}
                  />
                </Space>
              </div>
            </div>
            <Text type="secondary" style={{ fontSize: 16 }}>
              {project.description}
            </Text>
          </div>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onCreateTask}
            >
              Add Task
            </Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "edit",
                    label: (
                      <Space>
                        <EditOutlined />
                        <span>Edit Project</span>
                      </Space>
                    ),
                  },
                  {
                    key: "settings",
                    label: (
                      <Space>
                        <SettingOutlined />
                        <span>Project Settings</span>
                      </Space>
                    ),
                  },
                  { type: "divider" },
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
              <Button icon={<EllipsisOutlined />} />
            </Dropdown>
          </Space>
        </div>
      </div>
    </div>
  );
}
