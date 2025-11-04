import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { App as AntApp } from "antd";
import { Toaster } from "react-hot-toast";
import { AntdProvider } from "./providers/AntdProvider";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { useAuthStore } from "./store/authStore";
import "./styles/globals.css";
import "antd/dist/reset.css";

function App() {
  const { isAuthenticated, isLoading, initAuth } = useAuthStore();

  React.useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AntdProvider>
      <AntApp>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/auth"
                element={
                  !isAuthenticated ? (
                    <AuthPage />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <DashboardPage />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/workspaces"
                element={
                  isAuthenticated ? (
                    <WorkspacePage />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/workspaces/:workspaceId/projects"
                element={
                  isAuthenticated ? (
                    <ProjectPage />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/workspaces/:workspaceId/projects/:projectId"
                element={
                  isAuthenticated ? (
                    <ProjectDetailPage />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  isAuthenticated ? (
                    <ProfilePage />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/"
                element={
                  <Navigate
                    to={isAuthenticated ? "/dashboard" : "/auth"}
                    replace
                  />
                }
              />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#fff",
                  color: "#363636",
                },
              }}
            />
          </div>
        </Router>
      </AntApp>
    </AntdProvider>
  );
}

export default App;
