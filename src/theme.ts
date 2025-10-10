import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  // 🔹 Tailwind uyumlu breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  // 🔹 Global font ailesi ve typography ayarları
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "3rem", // ~48px
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.25rem", // ~36px
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.75rem", // ~28px
    },
    body1: {
      fontSize: "1rem", // ~16px
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem", // ~14px
      lineHeight: 1.45,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
    },
  },

  // 🔹 Component-specific responsive overrides
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
         "@media (max-width:640px)": { fontSize: "0.9rem" }, // sm ve altı
      "@media (min-width:1024px)": { fontSize: "1.05rem" }, // lg
      "@media (min-width:1280px)": { fontSize: "1.1rem" }, // xl
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "0.8rem",
        "@media (max-width:640px)": { fontSize: "0.7rem" }, // sm ve altı
      "@media (min-width:1024px)": { fontSize: "0.9rem" }, // lg
     
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.7rem",
         "@media (max-width:640px)": { fontSize: "0.6rem" }, // sm ve altı
      "@media (min-width:1024px)": { fontSize: "0.8rem" }, // lg
     
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
         fontSize: "0.8rem",
        "@media (max-width:640px)": { fontSize: "0.7rem" }, // sm ve altı
      "@media (min-width:1024px)": { fontSize: "0.9rem" }, // lg
          fontWeight: 600,
          textTransform: "none",
        },
      },
    },
  },
});

 theme = responsiveFontSizes(theme);
export default theme