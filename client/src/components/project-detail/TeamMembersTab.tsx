import { Row, Col, Card, Avatar, Typography } from "antd";
import type { TeamMember } from "../../types/project";

const { Text } = Typography;

interface TeamMembersTabProps {
  teamMembers: TeamMember[];
}

export function TeamMembersTab({ teamMembers }: TeamMembersTabProps) {
  return (
    <Row gutter={[16, 16]}>
      {teamMembers.map((member) => (
        <Col key={member.id} xs={24} sm={12} md={8} lg={6}>
          <Card size="small">
            <div style={{ textAlign: "center" }}>
              <Avatar
                size={48}
                style={{ backgroundColor: "#1890ff", marginBottom: 8 }}
              >
                {member.avatar}
              </Avatar>
              <div>
                <Text strong>{member.name}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {member.role}
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
