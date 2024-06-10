import { useContext, useState } from "react";
import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import apiCleint from "../services/api-cleint";
import { AxiosError } from "axios";
import { Text } from "@chakra-ui/react";
import AuthContext from "../contexts/authContext";

const LoginForm = () => {
  
  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };
  
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    apiCleint
      .post("/auth", data)
      .then((res) => {
        storeToken(res.data);
        //setIsLoggedIn(true);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        if (err.response?.data) {
          setError(
            typeof err.response.data === "string"
              ? err.response.data
              : JSON.stringify(err.response.data)
          );
        } else {
          setError("An unknown error occurred");
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <FormControl>
        <Box mb="3">
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input {...register("email")} id="email" type="email" />
        </Box>
        <Box mb="3">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input {...register("password")} id="password" type="password" />
        </Box>
        <Button my={5} type="submit" colorScheme="teal">
          Login
        </Button>
        {error && <Text color="tomato">{error}</Text>}
      </FormControl>
    </form>
  );
};

export default LoginForm;
