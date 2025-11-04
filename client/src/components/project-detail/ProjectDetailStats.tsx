import { Row, Col, Card, Space, Progress, Typography } from "antd";
import {
  CheckCircleOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { Project, Task } from "../../types/project";

const { Text } = Typography;

interface ProjectDetailStatsProps {
  project: Project;
  tasks: Task[];
}

export function ProjectDetailStats({
  project,
  tasks,
}: ProjectDetailStatsProps) {
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px" }}>
      <Row gutter={16}>
        <Col xs={24} sm={6}>
          <Card variant="outlined" size="small">
            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={project.progress}
                size={60}
                strokeColor="#1890ff"
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">Progress</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card variant="outlined" size="small">
            <Space
              align="center"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <div>
                <Text type="secondary">Total Tasks</Text>
                <div style={{ fontSize: 20, fontWeight: 600 }}>
                  {tasks.length}
                </div>
              </div>
              <CheckCircleOutlined style={{ fontSize: 24, color: "#1890ff" }} />
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card variant="outlined" size="small">
            <Space
              align="center"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <div>
                <Text type="secondary">Team Members</Text>
                <div style={{ fontSize: 20, fontWeight: 600 }}>
                  {project.teamSize}
                </div>
              </div>
              <TeamOutlined style={{ fontSize: 24, color: "#52c41a" }} />
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card variant="outlined" size="small">
            <Space
              align="center"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <div>
                <Text type="secondary">Due Date</Text>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {new Date(project.dueDate).toLocaleDateString()}
                </div>
              </div>
              <CalendarOutlined style={{ fontSize: 24, color: "#faad14" }} />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
