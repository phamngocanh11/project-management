import { Space, Avatar, Tag, Button, Dropdown, Table, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  SearchOutlined,
  BugOutlined,
  BulbOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { Task } from "../../types/project";
import { getStatusColor, getPriorityColor } from "../../utils/projectUtils";

interface TaskTableProps {
  tasks: Task[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function TaskTable({
  tasks,
  searchTerm,
  onSearchChange,
}: TaskTableProps) {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case "Bug":
        return <BugOutlined style={{ color: "#ff4d4f" }} />;
      case "Feature":
        return <BulbOutlined style={{ color: "#1890ff" }} />;
      case "Documentation":
        return <FileTextOutlined style={{ color: "#52c41a" }} />;
      default:
        return <CheckCircleOutlined style={{ color: "#d9d9d9" }} />;
    }
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Task) => (
        <Space>
          {getTaskIcon(record.type)}
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              {record.description}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>{priority}</Tag>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee: string) => (
        <Space>
          <Avatar size="small">
            {assignee
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <span>{assignee}</span>
        </Space>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: (
                  <Space>
                    <EditOutlined />
                    <span>Edit Task</span>
                  </Space>
                ),
              },
              {
                key: "delete",
                label: (
                  <Space style={{ color: "#ff4d4f" }}>
                    <DeleteOutlined />
                    <span>Delete Task</span>
                  </Space>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search tasks..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
