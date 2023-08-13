import { gql, useMutation } from "@apollo/client";
import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const ADD_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $ingredients: String!
    $method: String!
  ) {
    createRecipe(title: $title, ingredients: $ingredients, method: $method) {
      id
      title
    }
  }
`;

export default function AddRecipe() {
  const [addRecipe, { data, loading, error }] = useMutation(ADD_RECIPE);

  const [redirect, setRedirect] = useState(false);

  const processAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      ingredients: { value: string };
      method: { value: string };
    };

    addRecipe({
      variables: {
        title: target.title.value,
        ingredients: target.ingredients.value,
        method: target.method.value,
      },
    }).then(() => {
      setRedirect(true);
    });
  };

  return (
    <>
      {" "}
      {redirect && <Navigate to="/" />}
      <form onSubmit={processAdd}>
        <Grid
          sx={{
            "& .MuiTextField-root": { m: 1, width: "500px" },
          }}
          container
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="body1">Recette</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="title"
              id="outlined-basic"
              label="Titre"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="ingredients"
              id="outlined-basic"
              label="Ingredients"
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="method"
              id="outlined-basic"
              label="Etapes"
              variant="outlined"
              multiline
              rows={10}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" color="inherit" variant="contained">
              Enregister
            </Button>
          </Grid>

          {error && (
            <Snackbar open={typeof error !== undefined} autoHideDuration={6000}>
              <Alert severity="error" sx={{ width: "100%" }}>
                <Typography>{error ? error.message : null}</Typography>
              </Alert>
            </Snackbar>
          )}
        </Grid>
      </form>
    </>
  );
}
