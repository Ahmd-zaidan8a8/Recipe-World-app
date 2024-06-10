import { Link } from "react-router-dom";
import { Recipe } from "../hooks/useRecipes";
import { Button, Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface Props {
  recipe: Recipe;
}
const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card borderRadius="10px" overflow="hidden">
      <Image src={recipe.image} width="100%"/>
      <CardBody>
        <Heading mb={3} fontSize="2xl">
          {recipe.title}
        </Heading>
        <Button>
          <Link to={`/recipes/${recipe._id}`}>Show Details</Link>
        </Button>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
