import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  User,
} from "../types/auth";

const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/forgot-password", data);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    userName: string;
    email: string;
  }): Promise<{ message: string; user: User }> => {
    const response = await apiClient.put("/auth/update-profile", data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/change-password", data);
    return response.data;
  },

  uploadAvatar: async (
    file: File
  ): Promise<{ message: string; avatarUrl: string; user: User }> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await apiClient.post("/auth/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("auth-token", data.token);
      localStorage.setItem("auth-user", JSON.stringify(data.user));
      queryClient.setQueryData(["auth-user"], data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem("auth-token", data.token);
      localStorage.setItem("auth-user", JSON.stringify(data.user));
      queryClient.setQueryData(["auth-user"], data.user);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-user");
      queryClient.setQueryData(["auth-user"], null);
      queryClient.clear();
    },
  });
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: authApi.getMe,
    enabled: !!localStorage.getItem("auth-token"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      localStorage.setItem("auth-user", JSON.stringify(data.user));
      queryClient.setQueryData(["auth-user"], data.user);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.uploadAvatar,
    onSuccess: (data) => {
      localStorage.setItem("auth-user", JSON.stringify(data.user));
      queryClient.setQueryData(["auth-user"], data.user);
    },
  });
};
