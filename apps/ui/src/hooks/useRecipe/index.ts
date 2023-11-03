import { useQuery } from "@tanstack/react-query";
import { GetRecipeResponseData } from "imbibe-index-types";
import axiosClient from "../../api/axiosClient";
import { ApiError } from "../../api/types";

export default function useRecipe(recipeId: string | undefined) {
  return useQuery<GetRecipeResponseData, ApiError>({
    queryKey: ["recipe", recipeId],
    queryFn: () => fetchRecipe(recipeId),
    retry: 1,
  });
}

const fetchRecipe = async (recipeId: string | undefined) => {
  const response = await axiosClient.get(`/recipe/${recipeId}`);
  return response.data;
};
