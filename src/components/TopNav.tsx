import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Link as RouterLink } from "react-router-dom";

interface topNavProps {
  token: String | null;
}

export default function TopNav(props: topNavProps) {
  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Carnet de cuisine
        </Typography>

        {props.token ? (
          <>
            <Button component={RouterLink} color="inherit" href="#" to="/">
              Mes recettes
            </Button>
          </>
        ) : (
          <>
            <Button
              component={RouterLink}
              color="inherit"
              href="#register"
              to="/register"
            >
              Inscription
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              href="#login"
              to="/login"
            >
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
