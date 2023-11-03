import { PrismaClient } from "database";
import { NextFunction } from "express";
import { TokenRequest } from "../../types/requests";
import {
  CreateRecipeRequest,
  CreateRecipeResponse,
  GetRecipeResponse,
} from "./controller";

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

//----------------------------------------------------------------------

export async function checkRecipeVisibility(
  req: TokenRequest,
  res: GetRecipeResponse,
  next: NextFunction
) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!recipe) {
    return res
      .status(404)
      .json({ error: "Sorry we could not find that recipe" });
  }

  if (!recipe.isPublished && recipe.userId !== req.user?.user_id) {
    return res
      .status(403)
      .json({ error: "Sorry you do not have access to this recipe" });
  }

  next();
}
