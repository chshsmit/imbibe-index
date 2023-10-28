import { Input } from "@nextui-org/react";

const SignInForm = (): JSX.Element => {

  return (
    <>
      <Input
        autoFocus
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
                />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
                />
    </>
  );
};

export default SignInForm;