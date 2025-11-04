// Backend API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// User Types
export interface User {
  id: string;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Workspace Types
export interface Workspace {
  id: string;
  name: string;
  description?: string;
  owner: User;
  role: "Owner" | "Admin" | "Member";
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  user: User;
  role: "Owner" | "Admin" | "Member";
  joinedAt: string;
}

export interface WorkspaceDetail extends Workspace {
  members: WorkspaceMember[];
  userRole: "Owner" | "Admin" | "Member";
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "Planning" | "In Progress" | "Completed" | "On Hold";
  priority: "Low" | "Medium" | "High" | "Critical";
  startDate?: string;
  endDate?: string;
  owner: User;
  workspace: {
    id: string;
    name: string;
  };
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  id: string;
  user: User;
  role: "Owner" | "Admin" | "Member";
  joinedAt: string;
}

export interface ProjectDetail extends Project {
  members: ProjectMember[];
  userRole: "Owner" | "Admin" | "Member";
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High" | "Critical";
  assignee?: User;
  reporter: User;
  project: {
    id: string;
    name: string;
  };
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Types
export interface DashboardStats {
  totalWorkspaces: number;
  totalProjects: number;
  totalTasks: number;
  myTasks: number;
  pendingTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number;
}

export interface RecentActivity {
  projects: Array<{
    id: string;
    name: string;
    status: string;
    owner: User;
    workspace: {
      id: string;
      name: string;
    };
    updatedAt: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    assignee?: User;
    project: {
      id: string;
      name: string;
    };
    updatedAt: string;
  }>;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivity;
}

// Form Types
export interface CreateWorkspaceData {
  name: string;
  description?: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  workspaceId: string;
  priority?: "Low" | "Medium" | "High" | "Critical";
  startDate?: string;
  endDate?: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  priority?: "Low" | "Medium" | "High" | "Critical";
  dueDate?: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  userName: string;
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}
