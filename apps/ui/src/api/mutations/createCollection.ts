import { CreateCollectionBody } from "imbibe-index-types";
import axiosClient from "../axiosClient";

export default async function createCollection(request: CreateCollectionBody) {
  const response = await axiosClient.post("/collection", {
    ...request,
  });

  return response.data;
}
