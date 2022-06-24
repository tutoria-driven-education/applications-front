import { createTheme } from "@mui/material";
import { ptBR } from "@mui/material/locale";

const theme = createTheme(
  {
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
      fontFamily: "Roboto Condensed",
    },
  },
  ptBR
);

export default theme;
