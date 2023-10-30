import { CollectionForUser } from "imbibe-index-types";
import { useEffect, useState } from "react";
import useUserCollections from "../../hooks/useUserCollections";

interface CollectionNavigationReturnType {
  userCollections: Record<number, CollectionForUser> | undefined;
  collectionsLoading: boolean;
  currentCollection: CollectionForUser | undefined;
  setCurrentCollection: React.Dispatch<
    React.SetStateAction<CollectionForUser | undefined>
  >;
}

export default function useCollectionNavigation(): CollectionNavigationReturnType {
  const { data: userCollectionData, isLoading, status } = useUserCollections();
  const [currentCollection, setCurrentCollection] =
    useState<CollectionForUser>();

  useEffect(() => {
    if (status === "success") {
      if (currentCollection === undefined) {
        setCurrentCollection(
          userCollectionData.collections[userCollectionData.rootCollectionId]
        );
      } else {
        setCurrentCollection(
          userCollectionData.collections[currentCollection.id]
        );
      }
    }
  }, [
    status,
    currentCollection,
    userCollectionData?.collections,
    userCollectionData?.rootCollectionId,
  ]);

  return {
    userCollections: userCollectionData?.collections,
    collectionsLoading: isLoading,
    currentCollection,
    setCurrentCollection,
  };
}
