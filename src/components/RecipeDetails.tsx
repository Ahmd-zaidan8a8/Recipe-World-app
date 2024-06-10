import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import Recipe from "../interfaces/Recipe";
import { Link } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("recipes/" + id, {headers: {"x-auth-token" : localStorage.getItem("authToken")}})
      .then((res) => {
        setRecipe(res.data);
        setRating(getReviewAverage(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  function getReviewAverage (recipe: Recipe) {
    return recipe.reviews.length == 0 ? 0 : recipe.reviews.map((a: any) => a.rating).reduce((a: any, b: any) => a + b, 0) / recipe.reviews.length
  }

  function handleDelete() {
    if (!recipe) return;

    apiClient
      .delete(`/recipes/${id}`, {headers: {"x-auth-token" : localStorage.getItem("authToken")}})
      .then((response) => {
        console.log("Recipe Deleted", response.data);
        navigate('/');
      })
      .catch((error) => {
        console.log("Something Went Wrong", error);
      });
  }

  const saveRating = (ratingValue: number) => {
    setRating(ratingValue);
    apiClient
        .put(`recipes/${id}/rating`, { rating: ratingValue }, {headers: {"x-auth-token" : localStorage.getItem("authToken")}})
        .catch(console.error);
  };

  return (
    <div>
      <Card borderRadius="10px" overflow="hidden" width="80%">
        <Image src={recipe?.image} height="50%" width="100%" />
        <CardBody>
          <Heading mb={3} fontSize="2xl">
            {recipe?.title}
          </Heading>
          <Text>Category: {recipe?.category}</Text>
          <Text mb={4}>{recipe?.description}</Text>
          <UnorderedList my={5}>
            <Heading as="h2">Ingredients</Heading>
            {recipe?.ingridients.map((ing, i) => (
              <ListItem key={i}>{ing}</ListItem>
            ))}
          </UnorderedList>
          <OrderedList>
            <Heading as="h2">Instructions</Heading>
            {recipe?.instructions.map((instruction, i) => (
              <ListItem key={i}>{instruction}</ListItem>
            ))}
          </OrderedList>
        </CardBody>
        <CardFooter>
          <Text>Author: {recipe?.author}</Text>
        </CardFooter>
        <StarRating rating={rating} setRating={saveRating}/>
      </Card>
      <Button
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
        mr="2"
      >
        Delete
      </Button>

      <Button
        colorScheme="yellow"
        size="sm"
        mr="2"
      >
        <Link to={"/recipes/" + id + "/edit"}>Edit recipe</Link>
      </Button>
    </div>
  );
};

export default RecipeDetails;
