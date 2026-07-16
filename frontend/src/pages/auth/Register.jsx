import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Join the AI Unified Dispatch Platform."
    >
      <RegisterForm />
    </AuthLayout>
  );
}