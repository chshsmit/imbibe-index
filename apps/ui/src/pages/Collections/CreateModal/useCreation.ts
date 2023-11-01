import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import createCollection from "../../../api/mutations/createCollection";
import createRecipe from "../../../api/mutations/createRecipe";

interface UseCreationParams {
  onClose: () => void;
}

interface CreateRecipeOrCollectionInputs {
  name: string;
}

export default function useCreation({ onClose }: UseCreationParams) {
  const queryClient = useQueryClient();
  const form = useForm<CreateRecipeOrCollectionInputs>();

  const createCollectionMutation = useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      toast.success("Collection Created");
      onClose();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["userCollections"] });
    },
  });

  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      toast.success("Recipe Created!");
      onClose();
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["userCollections"] });
    },
  });

  return {
    createRecipe: createRecipeMutation,
    createCollection: createCollectionMutation,
    form,
  };
}
