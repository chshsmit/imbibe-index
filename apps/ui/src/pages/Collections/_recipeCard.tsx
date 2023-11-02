import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import placeholder from "../../assets/image2.png";

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
  moreOptions,
  tags,
}: RecipeCardProps): JSX.Element {
  console.log({ imageUrl, name, createdBy, id, moreOptions, tags });

  return (
    <Card isPressable isFooterBlurred>
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <Chip>Hello</Chip>
      </CardHeader>
      <Image
        alt="nextui logo"
        className="z-0 w-full h-full object-cover"
        removeWrapper
        src={placeholder}
      />
      <CardFooter className="absolute flex text-white bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 justify-between">
        {name}
        <Button color="primary" size="sm" radius="full">
          Go
        </Button>
      </CardFooter>
    </Card>
  );
}
