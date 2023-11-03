import express from "express";
import includeToken from "../../middleware/include-token";
import validateToken from "../../middleware/validate-token";
import { createRecipe, getRecipe } from "./controller";
import {
  checkRecipeVisibility,
  validateCollectionOwnership,
  validateCreateRecipeParameters,
} from "./middleware";

const router = express.Router();

// Creating a recipe
router.post(
  "/",
  validateToken,
  validateCreateRecipeParameters,
  validateCollectionOwnership,
  createRecipe
);

// Getting recipe by id
router.get("/:id", includeToken, checkRecipeVisibility, getRecipe);

export default router;
