import { Form, App } from "antd";
import { useAuthStore } from "../store/authStore";
import {
  useUpdateProfile,
  useChangePassword,
  useUploadAvatar,
} from "../hooks/useAuth";
import { formatError } from "../lib/utils";
import type { UploadProps } from "antd";

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  userName: string;
  email: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useProfileManagement() {
  const { message } = App.useApp();
  const { user, setUser } = useAuthStore();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();
  const uploadAvatarMutation = useUploadAvatar();

  const handleProfileUpdate = async (values: ProfileUpdateData) => {
    try {
      const result = await updateProfileMutation.mutateAsync(values);
      setUser(result.user);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error(formatError(error));
    }
  };

  const handlePasswordChange = async (values: PasswordChangeData) => {
    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success("Password changed successfully!");
      passwordForm.resetFields();
    } catch (error) {
      message.error(formatError(error));
    }
  };

  const handleAvatarChange: UploadProps["onChange"] = async (info) => {
    try {
      const file = info.file.originFileObj || info.file;

      if (!file || info.file.status === "removed") {
        return;
      }

      if (!(file instanceof File)) {
        message.error("Invalid file format");
        return;
      }

      if (!file.size || file.size > 5 * 1024 * 1024) {
        message.error("File size must be less than 5MB");
        return;
      }

      if (!file.type || !file.type.startsWith("image/")) {
        message.error("Please select an image file");
        return;
      }

      message.loading("Uploading avatar...", 0);

      const result = await uploadAvatarMutation.mutateAsync(file);

      message.destroy();
      message.success("Avatar uploaded successfully!");

      if (user) {
        setUser({ ...user, avatarUrl: result.avatarUrl });
      }
    } catch (error) {
      message.destroy();
      message.error(formatError(error));
    }
  };

  return {
    // State
    user,
    form,
    passwordForm,

    // Mutations
    updateProfileMutation,
    changePasswordMutation,
    uploadAvatarMutation,

    // Handlers
    handleProfileUpdate,
    handlePasswordChange,
    handleAvatarChange,
  };
}
