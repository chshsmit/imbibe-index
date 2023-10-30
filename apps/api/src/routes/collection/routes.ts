import express from "express";
import validateToken from "../../middleware/validate-token";
import { createCollection, getCollectionsForUser } from "./controller";
import {
  validateCreateCollectionParameters,
  validateParentCollectionOwnership,
} from "./middleware";

const router = express.Router();

// Create a new collection
router.post(
  "/",
  validateToken,
  validateCreateCollectionParameters,
  validateParentCollectionOwnership,
  createCollection
);

// Get collections for a user
router.get("/", validateToken, getCollectionsForUser);

export default router;
