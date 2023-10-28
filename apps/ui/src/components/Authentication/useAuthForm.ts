import { useForm } from "react-hook-form";

type AuthFormInputs = {
  name: string;
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

export default function useAuthForm() {
  return useForm<AuthFormInputs>();
}