import { PrismaClient } from "database";
import { NextFunction } from "express";
import { CreateRecipeRequest, CreateRecipeResponse } from "./controller";

//----------------------------------------------------------------------

const prisma = new PrismaClient();

//----------------------------------------------------------------------

export function validateCreateRecipeParameters(
  req: CreateRecipeRequest,
  res: CreateRecipeResponse,
  next: NextFunction
) {
  const { name, collectionId } = req.body;

  if (!name) {
    return res.status(400).json({ error: "No recipe name provided" });
  }

  if (!collectionId) {
    return res.status(400).json({ error: "No collection id provided" });
  }

  next();
}

//----------------------------------------------------------------------

export async function validateCollectionOwnership(
  req: CreateRecipeRequest,
  res: CreateRecipeResponse,
  next: NextFunction
) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: req.body.collectionId,
      userId: req.user!.user_id,
    },
  });

  if (!collection) {
    return res
      .status(403)
      .json({ error: "Access forbidden to the request resource " });
  }

  next();
}
