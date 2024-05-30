import { useEffect, useState } from "react";
import apiCleint from "../services/api-cleint";
import { CanceledError } from "axios";

export interface Recipe {
    id: string;
    title: string;
    image: string;
  }
  
  interface FetchRecipesResponse {
    count: number;
    results: Recipe[];
  }

const useRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiCleint
      .get<FetchRecipesResponse>("/recipes" , {signal: controller.signal})
      .then((res) => {
        console.log(res.data)
        setRecipes(res.data.results)
      })
      .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message);
      });

      return () => controller.abort();
  }, []);

  return {recipes , error};

}

export default useRecipes;