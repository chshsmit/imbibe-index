import { PrismaClient } from "database";
import expressAsyncHandler from "express-async-handler";
import { GetUserResponseData, RegisterBody, RegisterResponseData } from "imbibe-index-types";
import { CustomRequest, CustomResponse, TokenRequest } from "../../types/requests";


const prisma = new PrismaClient();

// --------------------------------------------------------


type RegisterRequest = CustomRequest<RegisterBody>;
type RegisterResponse = CustomResponse<RegisterResponseData>;

export const registerUser = expressAsyncHandler(
  async (req: RegisterRequest, res: RegisterResponse) => {
    const { id, name, email, displayName } = req.body;
    console.log(req.body);

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

// --------------------------------------------------------

type GetUserResponse = CustomResponse<GetUserResponseData>;

export const getUser = expressAsyncHandler(
  async (req: TokenRequest, res: GetUserResponse) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user!.user_id
      }
    });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json(user);
  }
);