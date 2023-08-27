import React, { useState } from "react";
import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";

const ADD_USER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      id
      email
    }
  }
`;

export default function Register() {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [redirect, setRedirect] = useState(false);

  const processRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      password_confirmation: { value: string };
    };

    addUser({
      variables: {
        input: {
          email: target.email.value,
          password: target.password.value,
          password_confirmation: target.password_confirmation.value,
        },
      },
    }).then(() => {
      setRedirect(true);
    });
  };

  return (
    <>
      {redirect && <Navigate to="/login" />}

      <form onSubmit={processRegister}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">Inscription</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="password"
              id="outlined-basic"
              label="Mot de passe"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="password_confirmation"
              id="outlined-basic"
              label="Confirmer mot de passe"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" color="inherit" variant="contained">
              Enregister
            </Button>
          </Grid>

          <Snackbar open={typeof error !== undefined} autoHideDuration={6000}>
            <Alert severity="error" sx={{ width: "100%" }}>
              <Typography>{error ? error.message : null}</Typography>
            </Alert>
          </Snackbar>
        </Grid>
      </form>
    </>
  );
}
