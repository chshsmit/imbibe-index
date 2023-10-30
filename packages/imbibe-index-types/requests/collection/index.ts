//----------------------------------------------------------------------
// POST - /collection
//----------------------------------------------------------------------

export interface CreateCollectionBody {
  name: string;
  parentCollectionId: number;
}

export interface CreateCollectionResponseData {
  id: number;
  collectionName: string;
  parentCollection: number;
}

//----------------------------------------------------------------------
// GET - /collection
//----------------------------------------------------------------------

export interface CollectionForUserRecipe {
  name: string;
  tags: Array<string>;
  id: number;
  imageUrl?: string;
}

export interface SubCollection {
  collectionName: string;
  id: number;
}

export interface CollectionForUser {
  collectionName: string;
  id: number;
  isRootCollection: boolean;
  parentCollection?: number;
  subCollections: Array<SubCollection>;
  recipes: Array<CollectionForUserRecipe>;
}

export interface GetCollectionsForUserResponseData {
  collections: Record<number, CollectionForUser>;
  rootCollectionId: number;
}
