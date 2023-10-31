import { useMutation } from "@tanstack/react-query";
import { CreateCollectionBody } from "imbibe-index-types";
import axiosClient from "../../api/axiosClient";

const createCollection = async (request: CreateCollectionBody) => {
  const response = await axiosClient.post("/collection", {
    ...request,
  });

  return response.data;
};

export default function useCreateCollection() {
  return useMutation({
    mutationFn: createCollection,
  });
}
