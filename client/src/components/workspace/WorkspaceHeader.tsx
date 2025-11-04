import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface WorkspaceHeaderProps {
  onCreateWorkspace: () => void;
}

export function WorkspaceHeader({ onCreateWorkspace }: WorkspaceHeaderProps) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #f5f5f5" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <Title level={2} style={{ margin: 0 }}>
              Your Workspaces
            </Title>
            <Text type="secondary">
              Organize your projects and collaborate with your team in dedicated
              workspaces. Each workspace is a hub for your team's projects and
              tasks.
            </Text>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={onCreateWorkspace}
          >
            Create Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
