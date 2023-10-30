import { PrismaClient } from "database";
import expressAsyncHandler from "express-async-handler";
import {
  CollectionForUser,
  CreateCollectionBody,
  CreateCollectionResponseData,
  GetCollectionsForUserResponseData,
} from "imbibe-index-types";
import {
  CustomRequest,
  CustomResponse,
  TokenRequest,
} from "../../types/requests";

const prisma = new PrismaClient();

//----------------------------------------------------------------------

export type GetCollectionsForUserResponse =
  CustomResponse<GetCollectionsForUserResponseData>;
export const getCollectionsForUser = expressAsyncHandler(
  async (req: TokenRequest, res: GetCollectionsForUserResponse) => {
    const allCollectionsForUser = await prisma.collection.findMany({
      where: {
        userId: req.user!.user_id,
      },
      include: {
        recipes: {
          include: {
            tags: {
              include: {
                tag: {
                  select: {
                    id: true,
                    tagName: true,
                  },
                },
              },
            },
          },
        },
        subCollections: {
          select: {
            id: true,
            collectionName: true,
          },
        },
      },
    });

    const collections: Record<number, CollectionForUser> = {};
    let rootCollectionId = 0;

    for (const collection of allCollectionsForUser) {
      if (collection.isRootCollection) {
        rootCollectionId = collection.id;
      }

      const recipes = await Promise.all(
        collection.recipes.map(async (recipe) => {
          // TODO: Handle images
          return {
            name: recipe.name,
            id: recipe.id,
            tags: recipe.tags.map((tag) => tag.tag.tagName),
            imageUrl: "",
          };
        })
      );

      const collectionForUser: CollectionForUser = {
        collectionName: collection.collectionName,
        id: collection.id,
        isRootCollection: collection.isRootCollection,
        subCollections: collection.subCollections,
        parentCollection: collection.parentCollectionId ?? undefined,
        recipes,
      };

      collections[collection.id] = collectionForUser;
    }

    if (rootCollectionId === 0) {
      res.status(404).json({
        error:
          "Sorry, we couldn't find the root collection. If this is unexpected, please reach out.",
      });
      return;
    }

    res.status(200).json({ collections, rootCollectionId });
  }
);

//----------------------------------------------------------------------

export type CreateCollectionRequest = CustomRequest<CreateCollectionBody>;
export type CreateCollectionResponse =
  CustomResponse<CreateCollectionResponseData>;

export const createCollection = expressAsyncHandler(
  async (req: CreateCollectionRequest, res: CreateCollectionResponse) => {
    const { name, parentCollectionId } = req.body;

    const newCollection = await prisma.collection.create({
      data: {
        userId: req.user!.user_id,
        collectionName: name,
        isRootCollection: false,
        parentCollectionId: Number(parentCollectionId),
      },
    });

    if (newCollection) {
      res.status(201).json({
        id: newCollection.id,
        collectionName: newCollection.collectionName,
        parentCollection: newCollection.parentCollectionId!,
      });
      return;
    } else {
      res
        .status(400)
        .json({ error: "Something went wrong creating the new collection" });
      return;
    }
  }
);

//----------------------------------------------------------------------
