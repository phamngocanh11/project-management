import { Card, Row, Col, Space, Avatar, Typography } from "antd";
import {
  ProjectOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { ProjectData } from "../../hooks/useProjectManagement";

const { Text } = Typography;

interface ProjectListStatsProps {
  projects: ProjectData[];
}

export function ProjectListStats({ projects }: ProjectListStatsProps) {
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #f5f5f5" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", paddingBottom: "24px" }}>
        <div style={{ marginTop: 24 }}>
          <Row gutter={16} align="stretch">
            <Col xs={24} sm={8}>
              <Card variant="outlined" style={{ height: "100%" }}>
                <Space
                  align="center"
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <div>
                    <Text type="secondary">Total Projects</Text>
                    <div
                      style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}
                    >
                      {totalProjects}
                    </div>
                  </div>
                  <Avatar
                    style={{ backgroundColor: "#e6f4ff", color: "#1677ff" }}
                    icon={<ProjectOutlined />}
                  />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card variant="outlined" style={{ height: "100%" }}>
                <Space
                  align="center"
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <div>
                    <Text type="secondary">Active</Text>
                    <div
                      style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}
                    >
                      {activeProjects}
                    </div>
                  </div>
                  <Avatar
                    style={{ backgroundColor: "#f6ffed", color: "#52c41a" }}
                    icon={<TeamOutlined />}
                  />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card variant="outlined" style={{ height: "100%" }}>
                <Space
                  align="center"
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <div>
                    <Text type="secondary">Completed</Text>
                    <div
                      style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}
                    >
                      {completedProjects}
                    </div>
                  </div>
                  <Avatar
                    style={{ backgroundColor: "#fff7e6", color: "#fa8c16" }}
                    icon={<CalendarOutlined />}
                  />
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
