import { Input } from "@nextui-org/react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { AuthFormInputs } from ".";

interface AuthInputsProps {
  isLoading: boolean;
  formType: "register" | "signin";
  errors: FieldErrors<AuthFormInputs>;
  register: UseFormRegister<AuthFormInputs>;
  getValues: UseFormGetValues<AuthFormInputs>;
}

const AuthInputs = ({
  isLoading,
  formType,
  errors,
  register,
  getValues,
}: AuthInputsProps): JSX.Element => (
  <>
    <Input
      disabled={isLoading}
      isRequired
      label="Email"
      placeholder="Enter your email"
      variant="bordered"
      isInvalid={errors.email !== undefined}
      errorMessage={errors.email && errors.email.message}
      {...register("email", {
        required: { value: true, message: "Required" },
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Please provide a valid email",
        },
      })}
    />
    {formType === "register" && (
      <Input
        disabled={isLoading}
        isRequired
        label="Name"
        placeholder="Your Name"
        variant="bordered"
        isInvalid={errors.name !== undefined}
        errorMessage={errors.name && errors.name.message}
        {...register("name", {
          required: { value: true, message: "Please provide a name" },
        })}
      />
    )}
    {formType === "register" && (
      <Input
        disabled={isLoading}
        isRequired
        label="Display Name"
        placeholder="Enter your display name"
        variant="bordered"
        isInvalid={errors.displayName !== undefined}
        errorMessage={errors.displayName && errors.displayName.message}
        {...register("displayName", {
          required: {
            value: true,
            message: "Please provide your display name.",
          },
        })}
      />
    )}
    <Input
      disabled={isLoading}
      isRequired
      label="Password"
      placeholder="Enter your password"
      type="password"
      variant="bordered"
      isInvalid={errors.password !== undefined}
      errorMessage={errors.password && errors.password.message}
      {...register("password", {
        required: true,
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      })}
    />
    {formType === "register" && (
      <Input
        disabled={isLoading}
        isRequired
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        variant="bordered"
        isInvalid={errors.confirmPassword !== undefined}
        errorMessage={errors.confirmPassword && errors.confirmPassword.message}
        {...register("confirmPassword", {
          required: true,
          validate: {
            isSameAsPassword: (value) =>
              value === getValues().password || "Passwords must match",
          },
        })}
      />
    )}
  </>
);

export default AuthInputs;
