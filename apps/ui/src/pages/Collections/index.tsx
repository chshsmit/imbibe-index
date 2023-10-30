import { Button, Spinner } from "@nextui-org/react";
import NotFound from "../../components/NotFound";
import CollectionHeader from "./_collectionHeader";
import CollectionsBreadcrumbs from "./_collectionsBreadCrumbs";
import useCollectionNavigation from "./useCollectionNavigation";

const Collections = (): JSX.Element => {
  const {
    userCollections,
    collectionsLoading,
    currentCollection,
    setCurrentCollection,
  } = useCollectionNavigation();

  // TODO: Handle this gracefully
  if (collectionsLoading) {
    return <Spinner />;
  }

  // TODO: Handle this gracefully
  if (!currentCollection) {
    return <NotFound />;
  }

  return (
    <>
      <CollectionsBreadcrumbs
        userCollections={userCollections!}
        currentCollection={currentCollection}
        setCollection={setCurrentCollection}
      />
      <CollectionHeader currentCollection={currentCollection} />
      {currentCollection.subCollections.map((item) => (
        <Button
          key={item.id}
          onPress={() => setCurrentCollection(userCollections![item.id])}
        >
          {item.collectionName}
        </Button>
      ))}
    </>
  );
};

export default Collections;
