import express from "express";
import { getUser, registerUser } from "./controller";
import validateToken from "../../middleware/validate-token";

const router = express.Router();

// Registering a user
router.post("/register", registerUser);

// Getting a user
router.get("/", validateToken, getUser);


export default router;