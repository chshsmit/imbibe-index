import { Link } from "@nextui-org/react";
import { CollectionForUser } from "imbibe-index-types";
import Breadcrumbs from "../../components/Breadcrumbs";

interface CollectionsBreadcrumbsProps {
  userCollections: Record<number, CollectionForUser>;
  currentCollection: CollectionForUser;
  setCollection: (c: CollectionForUser) => void;
}

const CollectionsBreadcrumbs = ({
  userCollections,
  currentCollection,
  setCollection,
}: CollectionsBreadcrumbsProps): JSX.Element => {
  const breadcrumbPath = new Array<{ name: string; id: number }>();
  const determineBreadcrumbsPath = (
    collections: Record<number, CollectionForUser>,
    currentCollection: CollectionForUser,
    path: Array<{ name: string; id: number }>
  ) => {
    if (currentCollection.isRootCollection) {
      path.push({
        name: currentCollection.collectionName,
        id: currentCollection.id,
      });
      return;
    } else {
      determineBreadcrumbsPath(
        collections,
        collections[currentCollection.parentCollection!],
        path
      );
    }
    path.push({
      name: currentCollection.collectionName,
      id: currentCollection.id,
    });
  };

  determineBreadcrumbsPath(userCollections, currentCollection, breadcrumbPath);

  const breadCrumbItems = breadcrumbPath.map((item) => (
    <Link
      color="primary"
      className="cursor-pointer"
      key={`collection-crumb-${item.id}`}
      onPress={() => setCollection(userCollections[item.id])}
    >
      {item.name}
    </Link>
  ));

  return <Breadcrumbs separator="→">{breadCrumbItems}</Breadcrumbs>;
};

export default CollectionsBreadcrumbs;
