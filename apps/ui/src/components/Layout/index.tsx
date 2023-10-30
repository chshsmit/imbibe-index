import { PropsWithChildren } from "react";
import Navigation from "../Navigation";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <div className="text-center">
      <Navigation />
      <div className="p-10 text-start max-w-7xl m-auto">{children}</div>
    </div>
  );
};

export default Layout;
