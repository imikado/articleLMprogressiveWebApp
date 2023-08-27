import RecipeList from "../../components/recipes/RecipeList";
import { Fab, Stack, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const RECIPES = gql`
  query recipes {
    recipes {
      id
      title
      ingredients
      method
    }
  }
`;

export default function Recipes() {
  const { loading, error, data } = useQuery(RECIPES);

  if (loading)
    return (
      <>
        <Typography>Loading...</Typography>
      </>
    );
  if (error)
    return (
      <>
        <Typography>`Error! ${error.message}`</Typography>
      </>
    );

  return (
    <>
      <Stack spacing={2}>
        <RecipeList itemList={data.recipes} />
      </Stack>
      <Fab
        component={RouterLink}
        sx={fabStyle}
        href="#add"
        to="/add"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </>
  );
}
