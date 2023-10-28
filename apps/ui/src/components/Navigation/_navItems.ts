import {
  IconGlassFull,
  IconListCheck,
  IconSearch,
  IconStar,
  TablerIconsProps
} from "@tabler/icons-react";

interface NavLinkMetadata {
  icon: (props: TablerIconsProps) => JSX.Element;
  color: string;
  label: string;
  to: string;
  isProtected: boolean;
}

const links: Array<NavLinkMetadata> = [
  {
    icon: IconGlassFull,
    color: "blue",
    label: "Collections",
    to: "/collections",
    isProtected: true,
  },
  {
    icon: IconListCheck,
    color: "teal",
    label: "Ingredients",
    to: "/ingredients",
    isProtected: false,
  },
  {
    icon: IconStar,
    color: "violet",
    label: "Favorites",
    to: "/favorites",
    isProtected: true,
  },
  {
    icon: IconSearch,
    color: "grape",
    label: "Discover",
    to: "/discover",
    isProtected: false,
  },
];

export default links;