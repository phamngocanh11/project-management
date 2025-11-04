export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Completed":
      return "#52c41a";
    case "In Progress":
      return "#1890ff";
    case "In Review":
      return "#722ed1";
    case "Todo":
      return "#d9d9d9";
    default:
      return "#d9d9d9";
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "High":
      return "#ff4d4f";
    case "Medium":
      return "#faad14";
    case "Low":
      return "#52c41a";
    default:
      return "#d9d9d9";
  }
};

export const getTaskTypeIcon = (type: string) => {
  const iconMap = {
    Bug: { icon: "BugOutlined", color: "#ff4d4f" },
    Feature: { icon: "BulbOutlined", color: "#1890ff" },
    Documentation: { icon: "FileTextOutlined", color: "#52c41a" },
    default: { icon: "CheckCircleOutlined", color: "#d9d9d9" },
  };

  return iconMap[type as keyof typeof iconMap] || iconMap.default;
};
