import { Row, Col, Card, Tag, Progress } from "antd";
import type { Task } from "../../types/project";
import { getStatusColor, getPriorityColor } from "../../utils/projectUtils";

interface ProjectOverviewTabProps {
  tasks: Task[];
}

export function ProjectOverviewTab({ tasks }: ProjectOverviewTabProps) {
  const statusDistribution = [
    "Todo",
    "In Progress",
    "In Review",
    "Completed",
  ].map((status) => {
    const count = tasks.filter((t) => t.status === status).length;
    const percentage = tasks.length > 0 ? (count / tasks.length) * 100 : 0;
    return { status, count, percentage };
  });

  const priorityDistribution = ["High", "Medium", "Low"].map((priority) => {
    const count = tasks.filter((t) => t.priority === priority).length;
    const percentage = tasks.length > 0 ? (count / tasks.length) * 100 : 0;
    return { priority, count, percentage };
  });

  return (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Card title="Task Status Distribution" size="small">
          <div style={{ padding: 16 }}>
            {statusDistribution.map(({ status, count, percentage }) => (
              <div key={status} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Tag color={getStatusColor(status)}>{status}</Tag>
                  <span>{count} tasks</span>
                </div>
                <Progress
                  percent={percentage}
                  showInfo={false}
                  strokeColor={getStatusColor(status)}
                />
              </div>
            ))}
          </div>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Priority Distribution" size="small">
          <div style={{ padding: 16 }}>
            {priorityDistribution.map(({ priority, count, percentage }) => (
              <div key={priority} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Tag color={getPriorityColor(priority)}>{priority}</Tag>
                  <span>{count} tasks</span>
                </div>
                <Progress
                  percent={percentage}
                  showInfo={false}
                  strokeColor={getPriorityColor(priority)}
                />
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
}
