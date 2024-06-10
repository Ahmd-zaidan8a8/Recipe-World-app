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
  Box,
  flexbox,
  Flex,
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
      .get("recipes/" + id, {
        headers: { "x-auth-token": localStorage.getItem("authToken") },
      })
      .then((res) => {
        setRecipe(res.data);
        setRating(getReviewAverage(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  function getReviewAverage(recipe: Recipe) {
    return recipe.reviews.length == 0
      ? 0
      : recipe.reviews
          .map((a: any) => a.rating)
          .reduce((a: any, b: any) => a + b, 0) / recipe.reviews.length;
  }

  function handleDelete() {
    if (!recipe) return;

    apiClient
      .delete(`/recipes/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("authToken") },
      })
      .then((response) => {
        console.log("Recipe Deleted", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log("Something Went Wrong", error);
      });
  }

  const saveRating = (ratingValue: number) => {
    setRating(ratingValue);
    apiClient
      .put(
        `recipes/${id}/rating`,
        { rating: ratingValue },
        { headers: { "x-auth-token": localStorage.getItem("authToken") } }
      )
      .catch(console.error);
  };

  return (
    <div>
      <Box>
        <Card borderRadius="10px" overflow="hidden">
          <Flex gap="4">
          <Box>
              <CardBody>
                <Heading mb={3} fontSize="3xl">
                  {recipe?.title}
                </Heading>
                <Text>Category: {recipe?.category}</Text>
                <Text mb={4}>{recipe?.description}</Text>
                <UnorderedList>
                  <Heading as="h2" my={2} >Ingredients</Heading>
                  {recipe?.ingridients.map((ing, i) => (
                    <ListItem key={i}>{ing}</ListItem>
                  ))}
                </UnorderedList>
                <OrderedList>
                  <Heading as="h2" my={2}>Instructions</Heading>
                  {recipe?.instructions.map((instruction, i) => (
                    <ListItem key={i}>{instruction}</ListItem>
                  ))}
                </OrderedList>
              </CardBody>
              <CardFooter>
                <Text>Author: {recipe?.author}</Text>
              </CardFooter>
              <StarRating rating={rating} setRating={saveRating} />
              <Flex mt={4}>
                <Button colorScheme="yellow" size="sm" m="2">
                  <Link to={"/recipes/" + id + "/edit"}>Edit recipe</Link>
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={handleDelete}
                  m="2"
                >
                  Delete
                </Button>
              </Flex>
            </Box>
            <Box w="700px">
              <Image borderRadius={20} src={recipe?.image} />
            </Box>
            
          </Flex>
        </Card>
      </Box>
    </div>
  );
};

export default RecipeDetails;
