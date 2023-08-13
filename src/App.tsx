import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Routing from "./config/Routing";
import TopNav from "./components/TopNav";
import useToken from "./apis/UseToken";

const defaultTheme = createTheme();

function App() {
  const { token, setToken } = useToken();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <TopNav token={token} />
        <CssBaseline></CssBaseline>
        <main>
          <Box>
            <Container maxWidth="sm">
              <Routing token={token} setToken={setToken} />
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
