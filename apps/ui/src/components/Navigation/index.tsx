import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure
} from "@nextui-org/react";
import { useState } from "react";
import Authentication from "../Authentication";
import Logo from "../Logo";
import links from "./_navItems";

const navItems = [
  "Features",
  "Customers",
  "Integrations"
];


const Navigation = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
          <NavbarBrand>
            <Logo />
            <p className="font-bold text-inherit">Imbibe Index</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {links.map((link) => (
            <NavbarItem key={link.to}>
              <Link color="foreground" href="#">
                {<link.icon />}
                {link.label}
              </Link>
            </NavbarItem>
        ))}
        </NavbarContent>

        <NavbarMenu>
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                index === 2 ? "primary" : index === navItems.length - 1 ? "danger" : "foreground"
              }
                className="w-full"
                href="#"
                size="lg"
            >
                {item}
              </Link>
            </NavbarMenuItem>
        ))}
        </NavbarMenu>

        <NavbarContent as="div" justify="end">
          <Button color="success" variant="flat" onPress={onOpen}>Sign In</Button>
        </NavbarContent>

        {/* <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent> */}
      </Navbar>
      <Authentication isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default Navigation;