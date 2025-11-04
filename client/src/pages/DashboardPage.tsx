import { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import DashboardContent from "../components/dashboard/DashboardContent";
import { TaskListGrid } from "../components/tasks/TaskListGrid";

export function DashboardPage() {
  const [activeView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardContent />;
      case "tasks":
        return <TaskListGrid />;
      default:
        return <DashboardContent />;
    }
  };

  return <MainLayout>{renderContent()}</MainLayout>;
}
