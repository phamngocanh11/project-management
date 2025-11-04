export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  createdAt: string;
  type: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  teamSize: number;
  dueDate: string;
  createdAt: string;
  workspace: {
    id: string;
    name: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  type: string;
}
