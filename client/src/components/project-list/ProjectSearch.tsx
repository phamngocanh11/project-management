import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface ProjectSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function ProjectSearch({
  searchTerm,
  onSearchChange,
}: ProjectSearchProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <Input
        placeholder="Search projects..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="large"
        style={{ maxWidth: 400 }}
      />
    </div>
  );
}
