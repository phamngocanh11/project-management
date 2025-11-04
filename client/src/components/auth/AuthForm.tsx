import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  Card,
  Tabs,
  App,
  Divider,
} from "antd";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  type CredentialResponse,
} from "@react-oauth/google";
import { useLogin, useRegister } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";
import { formatError } from "../../lib/utils";
import type { LoginRequest, RegisterRequest } from "../../types/auth";
import "./AuthForm.css";

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const { message } = App.useApp();

  const { setUser } = useAuthStore();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const onLoginFinish = async (values: LoginRequest) => {
    try {
      const result = await loginMutation.mutateAsync(values);
      setUser(result.user);
      message.success("Login successful!");
      onSuccess?.();
    } catch (error) {
      message.error(formatError(error));
    }
  };

  const onRegisterFinish = async (values: RegisterRequest) => {
    try {
      const result = await registerMutation.mutateAsync(values);
      setUser(result.user);
      message.success("Registration successful!");
      onSuccess?.();
    } catch (error) {
      message.error(formatError(error));
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      console.log("Google success response:", credentialResponse);
      console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

      if (!credentialResponse.credential) {
        message.error("No information received from Google");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        }
      );

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response body:", result);

      if (!response.ok) {
        throw new Error(result.message || "Google login failed");
      }

      localStorage.setItem("auth-token", result.token);
      localStorage.setItem("auth-user", JSON.stringify(result.user));

      setUser(result.user);
      message.success("Google login successful!");
      onSuccess?.();
    } catch (error) {
      console.error("Google login error:", error);
      message.error(
        "Google login failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  const handleGoogleError = () => {
    message.error("Google login failed!");
  };

  const LoginForm = () => (
    <Form
      form={loginForm}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onLoginFinish}
      size="large"
      layout="vertical"
    >
      <Form.Item
        name="userName"
        rules={[{ required: true, message: "Please enter username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username or Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="#" className="forgot-link">
            Forgot password?
          </a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={loginMutation.isPending}
          size="large"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </Form.Item>

      <Divider>or</Divider>

      <Form.Item>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          size="large"
          text="signin_with"
          shape="rectangular"
          width={320}
        />
      </Form.Item>
    </Form>
  );

  const RegisterForm = () => (
    <Form
      form={registerForm}
      name="register"
      onFinish={onRegisterFinish}
      size="large"
      layout="vertical"
    >
      <Form.Item
        name="userName"
        rules={[
          { required: true, message: "Please enter username!" },
          { min: 3, message: "Username must be at least 3 characters!" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please enter email!" },
          { type: "email", message: "Invalid email format!" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please enter password!" },
          { min: 6, message: "Password must be at least 6 characters!" },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm password"
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Please agree to the terms!")),
          },
        ]}
      >
        <Checkbox>
          I agree to the <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={registerMutation.isPending}
          size="large"
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </Button>
      </Form.Item>

      <Divider>or</Divider>

      <Form.Item>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          size="large"
          text="signup_with"
          shape="rectangular"
          width={320}
        />
      </Form.Item>
    </Form>
  );

  const tabItems = [
    {
      key: "login",
      label: "Login",
      children: <LoginForm />,
    },
    {
      key: "register",
      label: "Register",
      children: <RegisterForm />,
    },
  ];

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
      <div className="auth-container">
        <div className="auth-wrapper">
          <Card className="auth-card" variant="outlined">
            <div className="auth-header">
              <h1>Welcome</h1>
              <p>Login or create a new account to continue</p>
            </div>

            <Tabs
              defaultActiveKey="login"
              items={tabItems}
              centered
              size="large"
              className="auth-tabs"
            />
          </Card>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
