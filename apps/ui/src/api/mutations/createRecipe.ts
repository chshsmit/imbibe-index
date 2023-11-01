import { CreateRecipeBody } from "imbibe-index-types";
import axiosClient from "../axiosClient";

export default async function createRecipe(request: CreateRecipeBody) {
  const response = await axiosClient.post("/recipe", {
    ...request,
  });

  return response.data;
}
