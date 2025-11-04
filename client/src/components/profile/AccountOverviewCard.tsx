import { Card, Space, Typography, Flex, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface User {
  id: string;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface AccountOverviewCardProps {
  user: User | null;
}

export function AccountOverviewCard({ user }: AccountOverviewCardProps) {
  return (
    <Card
      title={
        <Space>
          <UserOutlined className="text-blue-500" />
          <span>Account Overview</span>
        </Space>
      }
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
      styles={{
        header: {
          color: "white",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        },
        body: { color: "white" },
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Flex justify="space-between">
          <span>Username:</span>
          <Typography.Text className="text-white font-medium">
            {user?.userName}
          </Typography.Text>
        </Flex>
        <Flex justify="space-between">
          <span>Email:</span>
          <Typography.Text className="text-white font-medium">
            {user?.email}
          </Typography.Text>
        </Flex>
        <Flex justify="space-between">
          <span>Status:</span>
          <Badge status="success" text="Active" style={{ color: "white" }} />
        </Flex>
      </Space>
    </Card>
  );
}
