import { Card, Row, Col, Space, Avatar, Typography } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface WorkspaceStatsProps {
  totalWorkspaces: number;
  ownedCount: number;
}

export function WorkspaceStats({
  totalWorkspaces,
  ownedCount,
}: WorkspaceStatsProps) {
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
                    <Text type="secondary">Total Workspaces</Text>
                    <div
                      style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}
                    >
                      {totalWorkspaces}
                    </div>
                  </div>
                  <Avatar
                    style={{ backgroundColor: "#e6f4ff", color: "#1677ff" }}
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
                    <Text type="secondary">Owned</Text>
                    <div
                      style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}
                    >
                      {ownedCount}
                    </div>
                  </div>
                  <Avatar
                    style={{ backgroundColor: "#f6ffed", color: "#52c41a" }}
                    icon={<UserOutlined />}
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
                    <Text type="secondary">Members</Text>
                    <div
                      style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}
                    >
                      {Math.max(totalWorkspaces - ownedCount, 0)}
                    </div>
                  </div>
                  <Avatar
                    style={{ backgroundColor: "#fff7e6", color: "#fa8c16" }}
                    icon={<UserOutlined />}
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
