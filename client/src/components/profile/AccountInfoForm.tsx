import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import type { ProfileUpdateData } from "../../hooks/useProfileManagement";

interface User {
  id: string;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface AccountInfoFormProps {
  user: User | null;
  form: FormInstance;
  onSubmit: (values: ProfileUpdateData) => Promise<void>;
  loading: boolean;
}

export function AccountInfoForm({
  user,
  form,
  onSubmit,
  loading,
}: AccountInfoFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        userName: user?.userName,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="firstName" label="First Name">
            <Input
              prefix={<UserOutlined style={{ color: "#9CA3AF" }} />}
              placeholder="Enter first name"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="lastName" label="Last Name">
            <Input
              prefix={<UserOutlined style={{ color: "#9CA3AF" }} />}
              placeholder="Enter last name"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="userName"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please enter username!",
          },
          {
            min: 3,
            message: "Username must be at least 3 characters!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "#9CA3AF" }} />}
          placeholder="Username"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          {
            required: true,
            message: "Please enter email!",
          },
          {
            type: "email",
            message: "Invalid email format!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined style={{ color: "#9CA3AF" }} />}
          placeholder="Email"
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
          Update Information
        </Button>
      </Form.Item>
    </Form>
  );
}
