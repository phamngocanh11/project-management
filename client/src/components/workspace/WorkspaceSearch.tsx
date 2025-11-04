import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface WorkspaceSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function WorkspaceSearch({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange,
}: WorkspaceSearchProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <div style={{ flex: 1, maxWidth: 420 }}>
        <Input
          placeholder="Find Your Workspace"
          prefix={<SearchOutlined style={{ color: "#9CA3AF" }} />}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          size="large"
        />
      </div>
      <Space>
        <Button
          type={activeTab === "all" ? "primary" : "default"}
          onClick={() => onTabChange("all")}
        >
          All
        </Button>
        <Button
          type={activeTab === "owned" ? "primary" : "default"}
          onClick={() => onTabChange("owned")}
        >
          Owned
        </Button>
        <Button
          type={activeTab === "joined" ? "primary" : "default"}
          onClick={() => onTabChange("joined")}
        >
          Member
        </Button>
      </Space>
    </div>
  );
}
