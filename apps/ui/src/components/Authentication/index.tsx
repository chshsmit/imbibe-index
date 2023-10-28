import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import { useState } from "react";
import SignInForm from "./_signInForm";

interface AuthenticationProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const Authentication = ({ isOpen, onOpenChange }: AuthenticationProps): JSX.Element => {

  const [formType, setFormType] = useState<"signin" | "register">("signin");

  const toggleFormType = () => {
    setFormType((current) => current === "register" ? "signin" : "register");
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top"
      backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              {formType === "signin" ? (<SignInForm />) : (<div>Hello</div>)}

              <div className="flex py-2 px-1 justify-between">
                <Link className="cursor-pointer" color="primary" size="sm"
                  onPress={toggleFormType}>
                  {formType === "signin" ?
                  ("Don't have an account? Register!")
                  : ("Already have an account? Sign in!")}
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                {formType === "signin" ?
                  ("Sign in")
                  : ("Register")}
              </Button>
            </ModalFooter>
          </>
          )}
      </ModalContent>
    </Modal>
  );
};

export default Authentication;