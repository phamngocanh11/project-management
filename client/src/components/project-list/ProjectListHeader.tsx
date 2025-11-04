import { Button, Typography } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface ProjectListHeaderProps {
  workspace: {
    id?: string;
    name: string;
    description: string;
  };
  onBack: () => void;
  onCreateProject: () => void;
}

export function ProjectListHeader({
  workspace,
  onBack,
  onCreateProject,
}: ProjectListHeaderProps) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #f5f5f5" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px" }}>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            style={{ marginBottom: 16 }}
          >
            Back to Workspaces
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
            <Title level={2} style={{ margin: 0 }}>
              {workspace.name}
            </Title>
            <Text type="secondary">{workspace.description}</Text>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={onCreateProject}
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
}
