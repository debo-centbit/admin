import { createTheme } from "@mui/material";
import { green, blue, grey } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      dark: blue[800],
      light: blue[200],
    },
    secondary: {
      main: blue[200],
    },
    success: {
      main: green[500],
      dark: green["800"],
      light: green[200],
    },
    info: {
      main: grey[50],
      dark: grey[800],
      light: grey["800"],
    },
  },
});
theme = createTheme(theme, {
  typography: {
    caption: {
      fontSize: "0.8rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "0.9rem",
      },
      fontWeight: 500,
      color: theme.palette.primary.dark,
      display: "block",
      cursor: "pointer",
    },
    title: {
      fontSize: "1.2rem",
      display: "block",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.1rem",
    },
    h7: {
      fontSize: "0.8rem"
    },
    h8:{
      fontsize: "0.7"
    }
  },
});

export default theme;
