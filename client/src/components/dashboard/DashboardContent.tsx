import {
  Card,
  Button,
  Avatar,
  List,
  Progress,
  Typography,
  Space,
  Empty,
  Row,
  Col,
  Spin,
  Alert,
} from "antd";
import {
  FolderOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  BarChartOutlined,
  CalendarOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { useDashboardStats } from "../../hooks/useDashboard";

const { Title, Text } = Typography;

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  subtitle: string;
  bgColor: string;
  textColor: string;
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  bgColor,
  textColor,
}: StatCardProps) {
  return (
    <Card
      className="h-full rounded-lg border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
      styles={{ body: { padding: "24px" } }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 ${bgColor} ${textColor} rounded-lg flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="text-2xl font-bold text-gray-900 mb-1 truncate">
            {value}
          </div>
          <div className="text-sm font-medium text-gray-700 mb-1 truncate">
            {title}
          </div>
          <div className="text-xs text-gray-500 line-clamp-2 wrap-break-word">
            {subtitle}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function DashboardContent() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error loading dashboard"
        description="Unable to load dashboard statistics. Please try again."
        type="error"
        showIcon
        className="mx-6 mt-6"
      />
    );
  }

  const colorClassMap: Record<
    string,
    { hoverText: string; hoverBg: string; hoverBorder: string }
  > = {
    blue: {
      hoverText: "hover:text-blue-600",
      hoverBg: "hover:bg-blue-50",
      hoverBorder: "hover:border-blue-300",
    },
    green: {
      hoverText: "hover:text-green-600",
      hoverBg: "hover:bg-green-50",
      hoverBorder: "hover:border-green-300",
    },
    purple: {
      hoverText: "hover:text-purple-600",
      hoverBg: "hover:bg-purple-50",
      hoverBorder: "hover:border-purple-300",
    },
    orange: {
      hoverText: "hover:text-orange-600",
      hoverBg: "hover:bg-orange-50",
      hoverBorder: "hover:border-orange-300",
    },
  };

  const statsData = [
    {
      icon: <FolderOutlined className="text-lg" />,
      title: "Total Projects",
      value: stats?.totalProjects || 0,
      subtitle: "projects in workspace",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: <CheckCircleOutlined className="text-lg" />,
      title: "Completed Tasks",
      value: stats?.completedTasks || 0,
      subtitle: "this month",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: <TeamOutlined className="text-lg" />,
      title: "My Tasks",
      value: stats?.myTasks || 0,
      subtitle: "assigned to you",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: <ClockCircleOutlined className="text-lg" />,
      title: "Pending Tasks",
      value: stats?.pendingTasks || 0,
      subtitle: "need attention",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  const recentActivities = [
    {
      title: "Welcome!",
      description: "Your project management journey starts here.",
      time: "Just now",
      avatar: <CheckCircleOutlined className="text-green-500" />,
    },
    {
      title: "Setup Complete",
      description: "Your workspace is ready for new projects.",
      time: "2 minutes ago",
      avatar: <FolderOutlined className="text-blue-500" />,
    },
  ];

  const quickActions = [
    {
      title: "New Project",
      icon: <PlusOutlined className="text-xl" />,
      color: "blue",
    },
    {
      title: "Add Task",
      icon: <CheckCircleOutlined className="text-xl" />,
      color: "green",
    },
    {
      title: "Invite Team",
      icon: <TeamOutlined className="text-xl" />,
      color: "purple",
    },
    {
      title: "Analytics",
      icon: <BarChartOutlined className="text-xl" />,
      color: "orange",
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <Row gutter={[24, 24]}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <FolderOutlined className="text-blue-500" />
                <span className="text-lg font-semibold text-gray-800">
                  Project Overview
                </span>
              </Space>
            }
            extra={
              <Button type="link" className="text-blue-600 font-medium">
                View All
              </Button>
            }
            className="h-full rounded-lg shadow-sm border-0 hover:shadow-md transition-shadow duration-300"
            styles={{
              body: {
                padding: "32px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
            }}
          >
            <Empty
              image={
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                  <FolderOutlined className="text-3xl text-blue-400" />
                </div>
              }
              styles={{ image: { height: "auto", marginBottom: "24px" } }}
              description={
                <div className="text-center">
                  <Title level={4} className="text-gray-700 mb-2 font-medium">
                    No Projects Yet
                  </Title>
                  <Text className="text-gray-500 text-base">
                    Create your first project to get started with project
                    management
                  </Text>
                </div>
              }
            >
              <Button type="primary" icon={<PlusOutlined />} size="large">
                Create Project
              </Button>
            </Empty>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <BarChartOutlined className="text-green-500" />
                <span className="text-lg font-semibold text-gray-800">
                  Tasks Summary
                </span>
              </Space>
            }
            className="h-full rounded-lg shadow-sm border-0 hover:shadow-md transition-shadow duration-300"
            styles={{
              body: {
                padding: "32px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
            }}
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Space>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <Text className="text-gray-700 font-medium">To Do</Text>
                  </Space>
                  <Text className="font-bold text-gray-900 text-lg">0</Text>
                </div>
                <Progress
                  percent={0}
                  strokeColor="#3b82f6"
                  showInfo={false}
                  size={8}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Space>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <Text className="text-gray-700 font-medium">
                      In Progress
                    </Text>
                  </Space>
                  <Text className="font-bold text-gray-900 text-lg">0</Text>
                </div>
                <Progress
                  percent={0}
                  strokeColor="#f59e0b"
                  showInfo={false}
                  size={8}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Space>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <Text className="text-gray-700 font-medium">Completed</Text>
                  </Space>
                  <Text className="font-bold text-gray-900 text-lg">0</Text>
                </div>
                <Progress
                  percent={0}
                  strokeColor="#10b981"
                  showInfo={false}
                  size={8}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CalendarOutlined className="text-purple-500" />
                <span className="text-lg font-semibold text-gray-800">
                  Recent Activity
                </span>
              </Space>
            }
            className="h-full rounded-lg shadow-sm border-0 hover:shadow-md transition-shadow duration-300"
            styles={{ body: { padding: "24px" } }}
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item className="px-0 border-b-0 py-3">
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={item.avatar}
                        className="bg-green-50 border-2 border-green-200"
                        size="large"
                      />
                    }
                    title={
                      <span className="font-medium text-gray-800">
                        {item.title}
                      </span>
                    }
                    description={
                      <div>
                        <div className="text-gray-600 text-sm mb-1">
                          {item.description}
                        </div>
                        <div className="text-gray-400 text-xs">{item.time}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <RiseOutlined className="text-orange-500" />
                <span className="text-lg font-semibold text-gray-800">
                  Quick Actions
                </span>
              </Space>
            }
            className="h-full rounded-lg shadow-sm border-0 hover:shadow-md transition-shadow duration-300"
            styles={{ body: { padding: "24px" } }}
          >
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  size="large"
                  className={`h-20 flex flex-col items-center justify-center text-gray-700 ${
                    colorClassMap[action.color]?.hoverText || ""
                  } ${colorClassMap[action.color]?.hoverBg || ""} ${
                    colorClassMap[action.color]?.hoverBorder || ""
                  } transition-all duration-300 rounded-lg border-2 border-gray-200 bg-white shadow-sm hover:shadow-md`}
                  icon={action.icon}
                >
                  <div className="text-xs font-medium mt-1">{action.title}</div>
                </Button>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardContent;
