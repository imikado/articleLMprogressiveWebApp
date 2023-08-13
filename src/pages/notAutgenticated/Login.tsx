import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
//import { ADD_USER } from "../apis/UserApi";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface loginProps {
  setToken: Function;
}

export default function Login(props: loginProps) {
  const [sendLogin, { data, loading, error }] = useMutation(LOGIN);

  const processLogin = (e: React.SyntheticEvent) => {
    console.log("submit");
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    sendLogin({
      variables: {
        email: target.email.value,
        password: target.password.value,
      },
    });
  };

  useEffect(() => {
    // Update the document title using the browser API
    console.log("effect");
    if (data) {
      console.log("iii");
      console.log(data.login.token);

      props.setToken(data.login.token);
    }
  }, [data]);

  return (
    <>
      <form onSubmit={processLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">Login</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="password"
              id="outlined-basic"
              label="Mot de passe"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" color="inherit" variant="contained">
              Connexion
            </Button>
          </Grid>

          {error && (
            <Snackbar open={true} autoHideDuration={6000}>
              <Alert severity="error" sx={{ width: "100%" }}>
                <Typography>{error.message}</Typography>
              </Alert>
            </Snackbar>
          )}
        </Grid>
      </form>
    </>
  );
}
