import { PrismaClient } from "database";
import { NextFunction } from "express";
import {
  CreateCollectionRequest,
  CreateCollectionResponse,
} from "./controller";

//----------------------------------------------------------------------

const prisma = new PrismaClient();

//----------------------------------------------------------------------

export function validateCreateCollectionParameters(
  req: CreateCollectionRequest,
  res: CreateCollectionResponse,
  next: NextFunction
) {
  const { name, parentCollectionId } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: "You must provide a name for your collection." });
  } else if (!parentCollectionId) {
    return res
      .status(400)
      .json({ error: "You must provide the parent collection." });
  }

  next();
}

//----------------------------------------------------------------------

export async function validateParentCollectionOwnership(
  req: CreateCollectionRequest,
  res: CreateCollectionResponse,
  next: NextFunction
) {
  const parentCollection = await prisma.collection.findUnique({
    where: {
      id: req.body.parentCollectionId,
      userId: req.user!.user_id,
    },
  });

  if (!parentCollection) {
    return res
      .status(403)
      .json({ error: "Access forbidden to the requested resource" });
  }

  next();
}

//----------------------------------------------------------------------
