import { PrismaClient } from "database";
import expressAsyncHandler from "express-async-handler";
import { CreateRecipeBody, CreateRecipeResponseData } from "imbibe-index-types";
import { CustomRequest, CustomResponse } from "../../types/requests";

//--------------------------------------------------------------------------------

const prisma = new PrismaClient();

//--------------------------------------------------------------------------------

export type CreateRecipeRequest = CustomRequest<CreateRecipeBody>;
export type CreateRecipeResponse = CustomResponse<CreateRecipeResponseData>;

export const createRecipe = expressAsyncHandler(
  async (req: CreateRecipeRequest, res: CreateRecipeResponse) => {
    const userId = req.user!.user_id;

    const newRecipe = await prisma.recipe.create({
      data: {
        name: req.body.name,
        userId,
        isPublished: false,
        collectionId: req.body.collectionId,
        takes: {
          create: [
            {
              takeNumber: 1,
              takeNotes: "",
              userId,
            },
          ],
        },
        likes: {
          create: [
            {
              userId,
            },
          ],
        },
      },
    });

    if (!newRecipe) {
      res.status(500).json({
        error: "Something unexpected happened while creating the recipe",
      });
      return;
    }

    res.status(201).json({ name: newRecipe.name, id: newRecipe.id });
  }
);
