import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { useAuthStore } from "../store/authStore";
import { AuthForm } from "../components/auth/AuthForm";

export function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleAuthSuccess = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <App>
      <AuthForm onSuccess={handleAuthSuccess} />
    </App>
  );
}
