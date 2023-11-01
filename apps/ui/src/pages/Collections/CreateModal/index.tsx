import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { CollectionForUser } from "imbibe-index-types";
import useCreation from "./useCreation";

interface CreateModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  currentCollection: CollectionForUser;
  createType?: "collection" | "recipe";
}

interface CreateRecipeOrCollectionInputs {
  name: string;
}

export default function CreateModal({
  isOpen,
  onOpenChange,
  onClose,
  currentCollection,
  createType,
}: CreateModalProps): JSX.Element {
  const { createCollection, createRecipe, form } = useCreation({ onClose });

  const onSubmit = (data: CreateRecipeOrCollectionInputs) => {
    if (createType === "collection") {
      createCollection.mutate({
        ...data,
        parentCollectionId: currentCollection.id,
      });
    }
    if (createType === "recipe") {
      createRecipe.mutate({
        ...data,
        collectionId: currentCollection.id,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        form.reset();
        onOpenChange();
      }}
      placement="top"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              Create {createType === "collection" ? "Collection" : "Recipe"}
            </ModalHeader>{" "}
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  label="Name"
                  isRequired
                  variant="bordered"
                  placeholder="Enter a name"
                  disabled={
                    createCollection.isPending || createRecipe.isPending
                  }
                  {...form.register("name", { required: true })}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  color="success"
                  startContent={<IconPlus size={14} />}
                >
                  Create
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
