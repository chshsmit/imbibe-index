import { PrismaClient } from "database";
import expressAsyncHandler from "express-async-handler";
import {
  CreateRecipeBody,
  CreateRecipeResponseData,
  GetRecipeResponseData,
} from "imbibe-index-types";
import {
  CustomRequest,
  CustomResponse,
  TokenRequest,
} from "../../types/requests";

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

//--------------------------------------------------------------------------------

export type GetRecipeResponse = CustomResponse<GetRecipeResponseData>;
export const getRecipe = expressAsyncHandler(
  async (req: TokenRequest, res: GetRecipeResponse) => {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        user: {
          select: {
            displayName: true,
            id: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        takes: {
          include: {
            ingredients: {
              include: {
                ingredient: true,
              },
            },
            steps: true,
          },
        },
        likes: true,
        favorited: true,
      },
    });

    if (!recipe) {
      res.status(404).json({ error: "Sorry we could not find that recipe" });
      return;
    }

    res.status(200).json(recipe);
  }
);
