import { useForm } from "@mantine/form";

type AuthFormInputs = {
  name: string;
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

export default function useAuthForm() {
  return useForm<AuthFormInputs>({
    initialValues: {
      name: "",
      email: "",
      displayName: "",
      password: "",
      confirmPassword: ""
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
    }
  });
}