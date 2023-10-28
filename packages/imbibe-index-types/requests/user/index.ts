import { Prisma } from "database";

export interface RegisterBody {
  id: string;
  name: string;
  email: string;
  displayName: string;
}

export interface RegisterResponseData {
  id: string;
  name: string;
  email: string;
  displayName: string;
}


export type GetUserResponseData = Prisma.UserGetPayload<{}>;