import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import RecipeGrid from "../components/RecipeGrid";
// import SimpleSidebar from "../components/SimpleSidebar";

const HomePage = () => {
  return (
    <>
      {/* <SimpleSidebar> */}
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <Navbar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside"></GridItem>
        </Show>
        <GridItem area="main">
          <RecipeGrid />
        </GridItem>
      </Grid>
      {/* </SimpleSidebar> */}
    </>
  );
};

export default HomePage;
