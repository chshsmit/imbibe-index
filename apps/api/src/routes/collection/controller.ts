import { PrismaClient } from "database";
import expressAsyncHandler from "express-async-handler";
import { CreateCollectionBody, CreateCollectionResponseData } from "imbibe-index-types";
import { CustomRequest, CustomResponse } from "../../types/requests";


const prisma = new PrismaClient();

//----------------------------------------------------------------------

type CreateCollectionRequest = CustomRequest<CreateCollectionBody>;
type CreateCollectionResponse = CustomResponse<CreateCollectionResponseData>;

export const createCollection = expressAsyncHandler(
  async (req: CreateCollectionRequest, res: CreateCollectionResponse) => {

    const { name, parentCollectionId} = req.body;

    if (!name) {
      res.status(400).json({error: "You must provide a name for your collection"});
      return;
    } else if (!parentCollectionId) {
      res.status(400).json({error: "You must provide the parent collection"});
      return;
    }

    const parentCollection = await prisma.collection.findUnique({
      where: {
        id: Number(parentCollectionId),
      },
    });

    if (!parentCollection) {
      res.status(404).json({error: `There is no collection with the id [${parentCollectionId}]`});
      return;
    }

    if (parentCollection.userId !== req.user!.user_id) {
      res.status(403).json({error: "Access forbidden"});
      return;
    }

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
      res.status(400).json({error: "Something went wrong creating the new collection"});
      return;
    }

  }
);