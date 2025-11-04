import { Card, Space, Badge, Flex } from "antd";
import { SafetyOutlined } from "@ant-design/icons";

export function SecurityStatusCard() {
  return (
    <Card
      title={
        <Space>
          <SafetyOutlined className="text-green-500" />
          <span>Security Status</span>
        </Space>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Flex justify="space-between" align="center">
          <span>Password</span>
          <Badge status="success" text="Strong" />
        </Flex>
        <Flex justify="space-between" align="center">
          <span>Two-Factor Auth</span>
          <Badge status="default" text="Disabled" />
        </Flex>
        <Flex justify="space-between" align="center">
          <span>Account</span>
          <Badge status="success" text="Verified" />
        </Flex>
      </Space>
    </Card>
  );
}
