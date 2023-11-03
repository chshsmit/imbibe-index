import { Spinner } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import useRecipe from "../../hooks/useRecipe";

export default function Recipe(): JSX.Element {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data, isLoading, isError, isFetched } = useRecipe(recipeId);

  console.log({ data, isLoading, isError, isFetched });

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div>Error</div>;
  }

  return <div>{data.name}</div>;
}
