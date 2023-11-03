//----------------------------------------------------------------------
// POST - /recipe
//----------------------------------------------------------------------

import { Prisma } from "database";

export interface CreateRecipeBody {
  name: string;
  collectionId: number;
}

export interface CreateRecipeResponseData {
  id: number;
  name: string;
}


//----------------------------------------------------------------------
// GET - /recipe/:id
//----------------------------------------------------------------------

export type GetRecipeResponseData = Prisma.RecipeGetPayload<{
  include: {
    user: {
      select: {
        displayName: true,
        id: true
      }
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
  }
}>;