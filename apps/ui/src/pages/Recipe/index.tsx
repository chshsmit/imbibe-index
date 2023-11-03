import { useParams } from "react-router-dom";

export default function Recipe(): JSX.Element {
  const { recipeId } = useParams<{ recipeId: string }>();

  console.log({ recipeId });

  return <div>Recipe</div>;
}
