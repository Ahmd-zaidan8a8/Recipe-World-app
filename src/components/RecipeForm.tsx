import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { Textarea } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { FieldValues, useForm } from "react-hook-form";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { linesArray } from "../services/lines-array";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";

import Recipe from "../interfaces/Recipe";

interface RecipeFormProps {
  recipe?: Recipe;
}

const RecipeForm : React.FC<RecipeFormProps> = ({recipe}) => {

  const isEditing = !!recipe;
  const defaultValues = getDefaultValues(recipe);
  const navigate = useNavigate();
  
  console.log(defaultValues);

  const [category, setCategory] = useState(defaultValues.category);
  // const [selectedImage , setSelectedImage] = useState(defaultValues.image);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  function getDefaultValues (recipe?: Recipe) {

    let defaultValues = {
      title: '',
      description: '',
      instructions: '',
      ingridients: '',
      category: "Breakfast",
      image: '',
    };

    if (recipe) {
      defaultValues = {
        ...defaultValues,
        category: recipe.category,
        description: recipe.description,
        instructions: recipe.instructions.join('\n'),
        ingridients: recipe.ingridients.join('\n'),
        image: recipe.image,
        title: recipe.title,
      };
    }

    console.log("defaults");

    return defaultValues;
  }

  // reset default values when props change
  useEffect(() => {
    reset();
  }, [recipe]);

  const onSubmit = (data: FieldValues) => {
    const newRecipe = {
      ...data,
      ingridients: linesArray(data.ingridients),
      instructions: linesArray(data.instructions),
      // image: selectedImage,
      category: category
    };

    const createOrUpdate = isEditing ? apiClient.put : apiClient.post;
    const endpoint = isEditing ? `/recipes/${recipe._id}` : "/recipes";
  
    createOrUpdate(endpoint, newRecipe, {headers: {"x-auth-token" : localStorage.getItem("authToken")}})
      .then((res) => {
        console.log(res);
        navigate(`/recipes/${res.data._id}`);
      })
      .catch(onError);      
  };


  const onError = (err: AxiosError) => {
    console.error(err);

    if (err.response?.data) {
      setError(
        typeof err.response.data === "string"
          ? err.response.data
          : JSON.stringify(err.response.data)
      );
    } else {
      setError("An unknown error occurred");
    }
  };

  return (
    <>
      {/* {!isEditing && <UploadImage setSelectedImage={setSelectedImage} />} */}

      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <FormControl>
        <Box my="3">
            <FormLabel htmlFor="Image">Image</FormLabel>
            <Input {...register("image", {value: defaultValues.image})} id="image" type="url" size="sm" />
            {/* {errors.name && <Text color="tomato">{errors.name.message}</Text>} */}
          </Box>
          <Box my="3">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input {...register("title", {value: defaultValues.title})} id="title" type="text" size="sm" />
            {/* {errors.name && <Text color="tomato">{errors.name.message}</Text>} */}
          </Box>
          <Box mb="3">
            <HStack>
              <Heading as="h2" size="md">
                category:
              </Heading>
              <RadioGroup onChange={setCategory} value={category}>
                <Stack direction="row">
                  <Radio value="Breakfast">Breakfast</Radio>
                  <Radio value="Lunch">Lunch</Radio>
                  <Radio value="Dinner">Dinner</Radio>
                  <Radio value="Snack">Snack</Radio>
                </Stack>
              </RadioGroup>
            </HStack>
          </Box>
          <Box mb="3">
            <FormLabel htmlFor="description">description</FormLabel>
            <Input {...register("description", {value: defaultValues.description})} id="description" type="text" />
            {/* {errors.email && <Text color="tomato">{errors.email.message}</Text>} */}
          </Box>
          <Box mb="3">
            <FormLabel htmlFor="ingridients">ingredients</FormLabel>
            <Textarea
              {...register("ingridients", {value: defaultValues.ingridients})}
              id="ingridients"
              placeholder="please Enter each ingridient in seperate line."
            />
            {/* {errors.password && (
                    <Text color="tomato">{errors.password.message}</Text>
                  )} */}
          </Box>
          <Box mb="3">
            <FormLabel htmlFor="instructions">instructions</FormLabel>
            <Textarea
              {...register("instructions", {value: defaultValues.instructions})}
              id="instructions"
              placeholder="please Enter each instruction in seperate line."
            />
            {/* {errors.password && (
                    <Text color="tomato">{errors.password.message}</Text>
                  )} */}
          </Box>
          <Button mt={4} type="submit" colorScheme="teal">
            {isEditing ? "Edit" : "Create"}
          </Button>
          {error && <Text color="tomato">{error}</Text>}
        </FormControl>
      </form>
    </>
  );
};

export default RecipeForm;
 