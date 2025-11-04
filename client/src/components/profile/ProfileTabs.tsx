import { Tabs, Space } from "antd";
import { EditOutlined, LockOutlined } from "@ant-design/icons";
import { AccountInfoForm } from "./AccountInfoForm";
import { SecurityForm } from "./SecurityForm";
import type { FormInstance } from "antd/es/form";
import type {
  ProfileUpdateData,
  PasswordChangeData,
} from "../../hooks/useProfileManagement";

interface User {
  id: string;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface ProfileTabsProps {
  user: User | null;
  form: FormInstance;
  passwordForm: FormInstance;
  onProfileUpdate: (values: ProfileUpdateData) => Promise<void>;
  onPasswordChange: (values: PasswordChangeData) => Promise<void>;
  profileUpdateLoading: boolean;
  passwordChangeLoading: boolean;
}

export function ProfileTabs({
  user,
  form,
  passwordForm,
  onProfileUpdate,
  onPasswordChange,
  profileUpdateLoading,
  passwordChangeLoading,
}: ProfileTabsProps) {
  return (
    <Tabs
      defaultActiveKey="account"
      size="large"
      items={[
        {
          key: "account",
          label: (
            <Space>
              <EditOutlined />
              Account Information
            </Space>
          ),
          children: (
            <div style={{ padding: 16 }}>
              <AccountInfoForm
                user={user}
                form={form}
                onSubmit={onProfileUpdate}
                loading={profileUpdateLoading}
              />
            </div>
          ),
        },
        {
          key: "security",
          label: (
            <Space>
              <LockOutlined />
              Security
            </Space>
          ),
          children: (
            <div style={{ padding: 16 }}>
              <SecurityForm
                form={passwordForm}
                onSubmit={onPasswordChange}
                loading={passwordChangeLoading}
              />
            </div>
          ),
        },
      ]}
    />
  );
}
