import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import type { PasswordChangeData } from "../../hooks/useProfileManagement";

interface SecurityFormProps {
  form: FormInstance;
  onSubmit: (values: PasswordChangeData) => Promise<void>;
  loading: boolean;
}

export function SecurityForm({ form, onSubmit, loading }: SecurityFormProps) {
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[
          {
            required: true,
            message: "Please enter current password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "#9CA3AF" }} />}
          placeholder="Current password"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please enter new password!",
          },
          {
            min: 6,
            message: "Password must be at least 6 characters!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "#9CA3AF" }} />}
          placeholder="New password"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm New Password"
        dependencies={["newPassword"]}
        rules={[
          {
            required: true,
            message: "Please confirm password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "#9CA3AF" }} />}
          placeholder="Confirm new password"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          size="large"
          style={{
            width: "100%",
            height: 48,
            fontWeight: 500,
          }}
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
}
