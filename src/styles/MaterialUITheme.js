import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff7bbd",
    },
    secondary: {
      main: "#7D7D8E",
    },
  },
  typography: {
    fontSize: 30,
  },
});

export default theme;
