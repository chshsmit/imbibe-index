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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CollectionForUser } from "imbibe-index-types";
import { useForm } from "react-hook-form";
import createCollection from "../../../api/mutations/createCollection";
import createRecipe from "../../../api/mutations/createRecipe";

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
  const { register, handleSubmit, reset } =
    useForm<CreateRecipeOrCollectionInputs>();

  const queryClient = useQueryClient();

  const createCollectionMutation = useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["userCollections"] });
    },
  });

  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["userCollections"] });
    },
  });

  const onSubmit = (data: CreateRecipeOrCollectionInputs) => {
    console.log("submitting");
    if (createType === "collection") {
      createCollectionMutation.mutate({
        ...data,
        parentCollectionId: currentCollection.id,
      });
    }

    if (createType === "recipe") {
      createRecipeMutation.mutate({
        ...data,
        collectionId: currentCollection.id,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        reset();
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  label="Name"
                  isRequired
                  variant="bordered"
                  placeholder="Enter a name"
                  disabled={createCollectionMutation.isPending}
                  {...register("name", { required: true })}
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
