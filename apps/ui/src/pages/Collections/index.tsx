import { Card, CardBody, Divider, Spinner } from "@nextui-org/react";
import { IconCaretRight } from "@tabler/icons-react";
import NotFound from "../../components/NotFound";
import CollectionHeader from "./_collectionHeader";
import CollectionsBreadcrumbs from "./_collectionsBreadCrumbs";
import RecipeCard from "./_recipeCard";
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

  console.log(userCollections);

  return (
    <>
      <CollectionsBreadcrumbs
        userCollections={userCollections!}
        currentCollection={currentCollection}
        setCollection={setCurrentCollection}
      />
      <CollectionHeader currentCollection={currentCollection} />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {currentCollection.subCollections.map((item) => (
          <Card
            key={item.id}
            isPressable
            onPress={() => setCurrentCollection(userCollections![item.id])}
          >
            <CardBody>
              <div className="flex justify-between items-center">
                {item.collectionName}
                <IconCaretRight size={14} />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <Divider className="mt-5" />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
        {currentCollection.recipes.map((item) => (
          <RecipeCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Collections;
