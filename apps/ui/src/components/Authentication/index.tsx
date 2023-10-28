import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosClient from "../../api/axiosClient";
import { auth } from "../../firebase";
import AuthInputs from "./_authInputs";

interface AuthenticationProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export type AuthFormInputs = {
  name: string;
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
};

const Authentication = ({
  isOpen,
  onOpenChange,
  onClose,
}: AuthenticationProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<AuthFormInputs>({ mode: "onBlur" });
  const [error, setError] = useState<string>("");
  const [formType, setFormType] = useState<"signin" | "register">("signin");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormType = () => {
    reset();
    setError("");
    setFormType((current) => (current === "register" ? "signin" : "register"));
  };

  const onSubmit: SubmitHandler<AuthFormInputs> = (data) => {
    if (formType === "register") {
      registerUser(data);
    } else {
      signIn(data);
    }
  };

  const registerUser = async (data: AuthFormInputs) => {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        axiosClient
          .post("/user/register", {
            id: userId,
            name: data.name,
            email: data.email,
            displayName: data.displayName,
          })
          .then(() => onClose())
          .catch((err) => {
            console.error("Something happened", err);
          });
      })
      .catch((error) => {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          setError("User with that email already exists");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const signIn = (data: AuthFormInputs) => {
    console.log("Signing in");
    console.log(data);

    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => onClose())
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-login-credentials") {
          setError("We could not find an account with that email and password");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        reset();
        setFormType("signin");
      }}
      placement="top"
      backdrop="blur"
    >
      <ModalContent>
        {() => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              {formType === "register" ? "Register" : "Login"}
            </ModalHeader>
            <ModalBody>
              <AuthInputs
                isLoading={isLoading}
                formType={formType}
                errors={errors}
                register={register}
                getValues={getValues}
              />

              {error && (
                <div>
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <div className="flex py-2 px-1 justify-between">
                <Link
                  className="cursor-pointer"
                  color="primary"
                  size="sm"
                  onPress={toggleFormType}
                >
                  {formType === "signin"
                    ? "Don't have an account? Register!"
                    : "Already have an account? Sign in!"}
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" isLoading={isLoading}>
                {formType === "signin" ? "Sign in" : "Register"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Authentication;
