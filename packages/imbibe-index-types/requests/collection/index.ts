export interface CreateCollectionBody {
  name: string;
  parentCollectionId: number;
}

export interface CreateCollectionResponseData {
  id: number;
  collectionName: string;
  parentCollection: number;
}