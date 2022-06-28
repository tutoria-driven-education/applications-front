import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
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
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": { fontSize: "5rem" },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { "&.Mui-checked.Mui-disabled": { color: green[200] } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            ".Mui-checked": { color: green[200] },
          },
        },
      },
    },
  },
  ptBR
);

export default theme;
