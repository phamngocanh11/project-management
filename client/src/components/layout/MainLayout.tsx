import { Layout, Menu, Avatar, Dropdown, Button, Input, Space } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FolderOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useLogout } from "../../hooks/useAuth";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-user");
      clearAuth();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined className="text-lg" />,
      label: <span className="font-medium">Dashboard</span>,
    },
    {
      key: "projects",
      icon: <FolderOutlined className="text-lg" />,
      label: <span className="font-medium">Projects</span>,
    },
    {
      key: "my-tasks",
      icon: <CheckCircleOutlined className="text-lg" />,
      label: <span className="font-medium">My Tasks</span>,
    },
    {
      key: "calendar",
      icon: <CalendarOutlined className="text-lg" />,
      label: <span className="font-medium">Calendar</span>,
    },
    {
      type: "divider",
    },
    {
      key: "workspaces",
      icon: <TeamOutlined className="text-lg" />,
      label: <span className="font-medium">Workspaces</span>,
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        className="border-r border-gray-200 overflow-hidden"
        style={{
          background: "white",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer select-none"
          style={{
            padding: 16,
            borderBottom: "1px solid #f0f0f0",
            textAlign: "center",
          }}
        >
          <Avatar
            shape="square"
            size={40}
            src="http://cdn-icons-png.flaticon.com/512/9402/9402518.png"
            alt="Logo"
            style={{ borderRadius: 8 }}
          />
        </div>

        <div className="border-t border-gray-200 pt-0">
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            items={sidebarItems}
            className="border-none bg-transparent"
            style={{
              border: "none",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
            onClick={({ key }) => {
              if (key === "dashboard") {
                navigate("/dashboard");
              } else if (key === "workspaces") {
                navigate("/workspaces");
              }
            }}
          />
        </div>
      </Sider>

      <Layout className="flex-1">
        <Header
          className="bg-white border-b border-gray-200 shadow-sm"
          style={{
            height: "72px",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          <Space align="center" size={16} className="shrink-0">
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: 18 }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: 18 }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              shape="circle"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Space>

          <div className="flex-1 max-w-md mx-8 hidden md:block min-w-0">
            <Input
              allowClear
              size="middle"
              placeholder="Search projects, tasks, or members..."
              prefix={<SearchOutlined style={{ color: "#9CA3AF" }} />}
            />
          </div>

          <Space align="center" size={8} className="shrink-0">
            <Button
              type="primary"
              icon={<PlusOutlined style={{ fontSize: 18 }} />}
              style={{ height: 40, display: "flex", alignItems: "center" }}
            >
              <span className="hidden sm:inline ml-1">New Project</span>
            </Button>
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: 18 }} />}
              shape="circle"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button
                type="text"
                shape="circle"
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                <Avatar
                  size={28}
                  icon={<UserOutlined />}
                  src={user?.avatarUrl}
                />
              </Button>
            </Dropdown>
          </Space>
        </Header>

        <Content className="p-4 md:p-6 xl:p-8 overflow-y-auto bg-gray-50 min-h-[calc(100vh-72px)]">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
