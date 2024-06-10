import { Box, Container, Heading, Text } from "@chakra-ui/react";
import RegisterForm from "../components/ResgisterForm";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'


const Signup = () => {
  return (
    <>
      <Container>
        <Heading size="3xl" mb="15px" textAlign="center">
          Signup
        </Heading>
        <Text textAlign="center" mb="10px">
          Welcome to Recipe World . please signup or login in order to share
          your meals.{" "}
        </Text>
        <RegisterForm />
      <Box mt={3}>
        <ChakraLink color="teal.500" as={ReactRouterLink} to="/login">
          Already have an account?
        </ChakraLink>
      </Box>
      </Container>
    </>
  );
};

export default Signup;
