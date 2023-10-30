import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Authentication from "../Authentication";
import Logo from "../Logo";
import links from "./_navItems";

const Navigation = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isSignedIn, logOut, userData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const basePath = location.pathname.split("/").slice(0, 2).join("/");

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Logo onClick={() => navigate("/")} />
            <p className="font-bold text-inherit">Imbibe Index</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {links.map((link) => (
            <NavbarItem key={link.to} isActive={basePath === link.to}>
              <Link
                className="cursor-pointer"
                color={basePath === link.to ? "primary" : "foreground"}
                onPress={() => navigate(link.to)}
              >
                {link.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarMenu>
          {links.map((link) => (
            <NavbarMenuItem key={`${link.label}`}>
              <Link
                color={basePath === link.to ? "primary" : "foreground"}
                className="w-full cursor-pointer"
                size="lg"
                onPress={() => {
                  navigate(link.to);
                }}
              >
                {link.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        {isSignedIn && userData ? (
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="danger"
                  name={userData.displayName.substring(0, 2).toUpperCase()}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-green-500">
                    {userData.displayName}
                  </p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  onClick={() => logOut()}
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <NavbarContent as="div" justify="end">
            <Button color="success" variant="flat" onPress={onOpen}>
              Sign In
            </Button>
          </NavbarContent>
        )}
      </Navbar>
      <Authentication
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
};

export default Navigation;
