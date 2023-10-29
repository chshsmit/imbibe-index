import express from "express";
import validateToken from "../../middleware/validate-token";
import { createCollection } from "./controller";

const router = express.Router();

// Create a new collection
router.post("/", validateToken, createCollection);

export default router;