import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { CollectionForUser } from "imbibe-index-types";
import CreateModal from "./CreateModal";

interface CollectionHeaderProps {
  currentCollection: CollectionForUser;
}

export default function CollectionHeader({
  currentCollection,
}: CollectionHeaderProps): JSX.Element {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex mt-2 mb-4 justify-between">
        <div className="flex">
          <p className="text-3xl">{currentCollection.collectionName}</p>
          <Dropdown>
            <DropdownTrigger className="ml-5">
              <Button
                color="primary"
                endContent={<IconPlus size={14} />}
                variant="ghost"
              >
                Add
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Collection Actions" variant="flat">
              <DropdownItem key="collection" onPress={onOpen}>
                Add collection
              </DropdownItem>
              <DropdownItem key="recipe">Add recipe</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* TODO: Add search for recipes here */}
      </div>
      <CreateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        currentCollection={currentCollection}
      />
    </>
  );
}
