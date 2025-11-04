import {
  Avatar,
  Upload,
  Typography,
  Space,
  Badge,
  Flex,
  Button,
  Tooltip,
} from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

interface User {
  id: string;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface ProfileHeaderProps {
  user: User | null;
  onAvatarChange: UploadProps["onChange"];
  avatarUploading: boolean;
}

export function ProfileHeader({
  user,
  onAvatarChange,
  avatarUploading,
}: ProfileHeaderProps) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 24,
        background: "linear-gradient(135deg, #f8fbff 0%, #eef2ff 100%)",
      }}
    >
      <Flex align="center" gap={16} style={{ minWidth: 0 }}>
        <div className="relative">
          <Upload
            showUploadList={false}
            onChange={onAvatarChange}
            accept="image/*"
            customRequest={() => {}}
            beforeUpload={() => false}
          >
            <div style={{ position: "relative", display: "inline-block" }}>
              <Avatar
                size={80}
                src={user?.avatarUrl}
                icon={<UserOutlined />}
                style={{
                  border: "4px solid #fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              />
              <Tooltip title="Change avatar">
                <Button
                  aria-label="Change avatar"
                  type="default"
                  shape="circle"
                  icon={
                    <CameraOutlined
                      style={{ fontSize: 14, color: "#374151" }}
                    />
                  }
                  size="small"
                  loading={avatarUploading}
                  style={{
                    position: "absolute",
                    right: -6,
                    bottom: -6,
                    width: 28,
                    height: 28,
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Tooltip>
            </div>
          </Upload>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Typography.Title level={3} style={{ marginBottom: 4 }} ellipsis>
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.userName}
          </Typography.Title>
          <Typography.Text type="secondary" ellipsis>
            {user?.email}
          </Typography.Text>
          <div style={{ marginTop: 8 }}>
            <Space>
              <Badge status="success" text="Active" />
            </Space>
          </div>
        </div>
      </Flex>
    </div>
  );
}
