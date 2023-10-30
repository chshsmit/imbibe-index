import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { CollectionForUser } from "imbibe-index-types";

interface CollectionHeaderProps {
  currentCollection: CollectionForUser;
}

export default function CollectionHeader({
  currentCollection,
}: CollectionHeaderProps): JSX.Element {
  return (
    <div className="flex mt-2 mb-4 justify-between">
      <p className="text-2xl">{currentCollection.collectionName}</p>
      <Dropdown>
        <DropdownTrigger>
          <Button
            color="primary"
            endContent={<IconPlus size={14} />}
            variant="ghost"
          >
            Add
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Collection Actions" variant="flat">
          <DropdownItem key="collection">Add collection</DropdownItem>
          <DropdownItem key="recipe">Add recipe</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
