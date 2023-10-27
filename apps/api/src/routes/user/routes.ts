import express from "express";
import { registerUser } from "./controller";

const router = express.Router();

// Registering a user
router.post("/register", registerUser);


export default router;