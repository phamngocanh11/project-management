import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Card, Tag, Progress, Avatar, Button, Dropdown } from "antd";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface TaskData {
  id: number;
  name: string;
  project: string;
  status: string;
  priority: string;
  assignee: string;
  progress: number;
  startDate: string;
  endDate: string;
  tags: string[];
}

const mockTasks: TaskData[] = [
  {
    id: 1,
    name: "Design new landing page",
    project: "Website Redesign",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
    progress: 75,
    startDate: "2024-10-15",
    endDate: "2024-11-30",
    tags: ["design", "ui"],
  },
  {
    id: 2,
    name: "Implement user authentication",
    project: "Mobile App",
    status: "Todo",
    priority: "Medium",
    assignee: "Jane Smith",
    progress: 0,
    startDate: "2024-11-01",
    endDate: "2024-11-15",
    tags: ["development", "security"],
  },
  {
    id: 3,
    name: "Write API documentation",
    project: "Backend Service",
    status: "In Progress",
    priority: "Low",
    assignee: "Mike Johnson",
    progress: 30,
    startDate: "2024-10-20",
    endDate: "2024-11-10",
    tags: ["documentation", "api"],
  },
  {
    id: 4,
    name: "Setup CI/CD pipeline",
    project: "DevOps",
    status: "Done",
    priority: "High",
    assignee: "Sarah Wilson",
    progress: 100,
    startDate: "2024-10-01",
    endDate: "2024-10-25",
    tags: ["devops", "automation"],
  },
  {
    id: 5,
    name: "Database optimization",
    project: "Backend Service",
    status: "In Progress",
    priority: "Medium",
    assignee: "Tom Brown",
    progress: 45,
    startDate: "2024-10-18",
    endDate: "2024-11-20",
    tags: ["database", "performance"],
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "red";
    case "Medium":
      return "orange";
    case "Low":
      return "green";
    default:
      return "blue";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "green";
    case "In Progress":
      return "blue";
    case "Todo":
      return "orange";
    default:
      return "default";
  }
};

const StatusRenderer = (params: ICellRendererParams) => {
  return <Tag color={getStatusColor(params.value)}>{params.value}</Tag>;
};

const PriorityRenderer = (params: ICellRendererParams) => {
  return <Tag color={getPriorityColor(params.value)}>{params.value}</Tag>;
};

const AssigneeRenderer = (params: ICellRendererParams) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar size="small" icon={<UserOutlined />} />
      <span>{params.value}</span>
    </div>
  );
};

const ProgressRenderer = (params: ICellRendererParams) => {
  return (
    <div style={{ width: "100%", paddingTop: "8px" }}>
      <Progress
        percent={params.value}
        size="small"
        strokeColor={params.value === 100 ? "#52c41a" : "#1890ff"}
      />
    </div>
  );
};

const TagsRenderer = (params: ICellRendererParams) => {
  const tags = params.value || [];
  return (
    <div className="flex flex-wrap gap-1">
      {tags.slice(0, 2).map((tag: string) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      {tags.length > 2 && <Tag>+{tags.length - 2}</Tag>}
    </div>
  );
};

const ActionsRenderer = () => {
  const menuItems = [
    {
      key: "edit",
      label: "Edit Task",
    },
    {
      key: "duplicate",
      label: "Duplicate",
    },
    {
      type: "divider" as const,
    },
    {
      key: "delete",
      label: "Delete",
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <Button type="text" icon={<MoreOutlined />} size="small" />
    </Dropdown>
  );
};

export function TaskListGrid() {
  const columnDefs: ColDef[] = [
    {
      field: "name",
      headerName: "Task Name",
      flex: 2,
      minWidth: 200,
      cellStyle: { fontWeight: 500 },
    },
    {
      field: "project",
      headerName: "Project",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      cellRenderer: StatusRenderer,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 100,
      cellRenderer: PriorityRenderer,
    },
    {
      field: "assignee",
      headerName: "Assignee",
      flex: 1,
      minWidth: 150,
      cellRenderer: AssigneeRenderer,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 150,
      cellRenderer: ProgressRenderer,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 120,
      cellRenderer: TagsRenderer,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
    },
    {
      headerName: "Actions",
      width: 80,
      cellRenderer: ActionsRenderer,
      sortable: false,
      filter: false,
    },
  ];

  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <Card title="Task List" className="h-full">
      <div
        className="ag-theme-alpine"
        style={{ height: "600px", width: "100%" }}
      >
        <AgGridReact
          rowData={mockTasks}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          animateRows={true}
        />
      </div>
    </Card>
  );
}
