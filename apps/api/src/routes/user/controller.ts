import { PrismaClient } from "database";
import expressAsyncHandler from "express-async-handler";
import { RegisterBody, RegisterResponseData } from "imbibe-index-types";
import { CustomRequest, CustomResponse } from "../../types/requests";


const prisma = new PrismaClient();

// --------------------------------------------------------


type RegisterRequest = CustomRequest<RegisterBody>;
type RegisterResponse = CustomResponse<RegisterResponseData>;

export const registerUser = expressAsyncHandler(
  async (req: RegisterRequest, res: RegisterResponse) => {
    const { id, name, email, displayName } = req.body;

    if (!id || !email || !displayName || !name) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userExists) {
      res.status(400);
      throw new Error("A user already exists with that email.");
    }

    let user;
    try {
      user = await prisma.user.create({
        data: {
          id,
          name,
          displayName,
          email
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500);
      throw new Error("Something unexpected happened");
    }

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      displayName: user.displayName
    });
  }
);