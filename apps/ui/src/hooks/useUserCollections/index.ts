import { useQuery } from "@tanstack/react-query";
import { GetCollectionsForUserResponseData } from "imbibe-index-types";
import axiosClient from "../../api/axiosClient";
import { ApiError } from "../../api/types";

export default function useUserCollections() {
  return useQuery<GetCollectionsForUserResponseData, ApiError>({
    queryKey: ["userCollections"],
    queryFn: () => fetchUserCollections(),
  });
}

const fetchUserCollections = async () => {
  const response = await axiosClient.get("/collection");
  return response.data;
};
