import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Avatar,
  Dropdown,
  Badge,
} from "antd";
import {
  TeamOutlined,
  FolderOutlined,
  SettingOutlined,
  DeleteOutlined,
  UserOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

import type { Workspace } from "../../types/api";

interface WorkspaceGridProps {
  workspaces: Workspace[];
  searchTerm: string;
  activeTab: string;
  onNavigate: (path: string) => void;
  onDeleteWorkspace: (id: string, name: string) => void;
  onCreateWorkspace: () => void;
}

export function WorkspaceGrid({
  workspaces,
  searchTerm,
  activeTab,
  onNavigate,
  onDeleteWorkspace,
  onCreateWorkspace,
}: WorkspaceGridProps) {
  if (workspaces.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0" }}>
        <div
          style={{
            width: 80,
            height: 80,
            margin: "0 auto 16px",
            background: "#f5f5f5",
            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TeamOutlined style={{ fontSize: 36, color: "#bfbfbf" }} />
        </div>
        <Title level={4} style={{ marginBottom: 8 }}>
          {searchTerm || activeTab !== "all"
            ? "No workspaces found"
            : "Welcome to Your Workspace Hub"}
        </Title>
        <Text type="secondary">
          {searchTerm || activeTab !== "all"
            ? "Try changing filters or your search term."
            : "Create your first workspace to start organizing projects and collaborating with your team."}
        </Text>
        {activeTab === "all" && !searchTerm && (
          <div style={{ marginTop: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={onCreateWorkspace}
            >
              Create Workspace
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]} align="stretch">
      {workspaces.map((workspace) => {
        const menuItems = [
          {
            key: "projects",
            label: (
              <Space>
                <FolderOutlined />
                <span>View Projects</span>
              </Space>
            ),
            onClick: () => onNavigate(`/workspaces/${workspace.id}/projects`),
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
        ];

        if (workspace.role === "Owner") {
          menuItems.push({
            key: "delete",
            label: (
              <Space style={{ color: "#ff4d4f" }}>
                <DeleteOutlined />
                <span>Delete Workspace</span>
              </Space>
            ),
            onClick: () => onDeleteWorkspace(workspace.id, workspace.name),
          });
        }

        return (
          <Col key={workspace.id} xs={24} sm={12} lg={8} xl={6}>
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
                  menu={{ items: menuItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button
                    type="text"
                    icon={<EllipsisOutlined />}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Dropdown>
              }
              onClick={() => onNavigate(`/workspaces/${workspace.id}/projects`)}
            >
              <div style={{ textAlign: "center" }}>
                <Avatar
                  size={64}
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    marginBottom: 16,
                  }}
                  icon={<TeamOutlined />}
                />
                <Title level={5} style={{ marginBottom: 8 }} ellipsis>
                  {workspace.name}
                </Title>
                {workspace.description && (
                  <Text
                    type="secondary"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {workspace.description}
                  </Text>
                )}
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 12,
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <UserOutlined style={{ color: "#8c8c8c" }} />
                      <Text type="secondary">
                        {workspace.owner.firstName || workspace.owner.userName}
                      </Text>
                    </div>
                    <Badge
                      count={workspace.role}
                      style={{
                        backgroundColor:
                          workspace.role === "Owner" ? "#1677ff" : "#52c41a",
                        color: "#fff",
                        fontSize: 11,
                        height: 20,
                        lineHeight: "20px",
                        borderRadius: 10,
                        padding: "0 8px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
