import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    ecoGreen: Palette["primary"];
    skyBlue: Palette["primary"];
  }
  interface PaletteOptions {
    ecoGreen?: PaletteOptions["primary"];
    skyBlue?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00B0FF", // Sky Blue for CTAs
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFD600", // Warm Yellow for attention elements
    },
    success: {
      main: "#66BB6A", // Eco Green for hover/success
    },
    background: {
      default: "#263238", // Blue-Grey base
      paper: "#111111", // Card background
    },
    text: {
      primary: "#ECEFF1", // Light Charcoal
      secondary: "#B0BEC5", // Slate Gray
    },
    divider: "#37474F",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#66BB6A", // Green hover effect
          },
        },
      },
    },
  },
});

export default theme;
