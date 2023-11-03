import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { IconShare } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import placeholder from "../../assets/image1.png";

interface RecipeCardProps {
  imageUrl?: string;
  name: string;
  createdBy?: string;
  id: number;
}

export default function RecipeCard({
  imageUrl,
  name,
  createdBy,
  id,
}: RecipeCardProps): JSX.Element {
  console.log({ imageUrl, name, createdBy, id });
  const navigate = useNavigate();

  return (
    <Card
      isFooterBlurred
      className="cursor-pointer"
      isPressable
      onPress={() => navigate(`/recipe/${id}`)}
      as="div"
    >
      <Image
        alt="nextui logo"
        className="z-0 w-full h-full object-cover"
        removeWrapper
        src={placeholder}
      />
      <CardFooter className="absolute flex text-white bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 justify-between">
        {name}
        <Button
          isIconOnly
          color="success"
          variant="flat"
          size="sm"
          radius="full"
        >
          <IconShare size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}
