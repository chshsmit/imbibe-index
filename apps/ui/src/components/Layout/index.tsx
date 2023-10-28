import { PropsWithChildren } from "react";
import Navigation from "../Navigation";

interface LayoutProps {}

const Layout = ({children}: PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;