import express from "express";
import validateToken from "../../middleware/validate-token";
import { createRecipe } from "./controller";
import {
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

export default router;
