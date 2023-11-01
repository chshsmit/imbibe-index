//----------------------------------------------------------------------
// POST - /recipe
//----------------------------------------------------------------------

export interface CreateRecipeBody {
  name: string;
  collectionId: number;
}

export interface CreateRecipeResponseData {
  id: number;
  name: string;
}
