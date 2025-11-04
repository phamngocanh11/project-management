import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api";
import { useAuthStore } from "../store/authStore";
import type { DashboardStats } from "../types/api";

// Get dashboard statistics
export const useDashboardStats = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await apiClient.get<{ stats: DashboardStats }>(
        "/api/dashboard/stats"
      );
      return response.data.stats;
    },
    enabled: isAuthenticated,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Get recent activities
export const useRecentActivities = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["recent-activities"],
    queryFn: async (): Promise<unknown[]> => {
      const response = await apiClient.get<{ activities: unknown[] }>(
        "/api/dashboard/activities"
      );
      return response.data.activities;
    },
    enabled: isAuthenticated,
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};
