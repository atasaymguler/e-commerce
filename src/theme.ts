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
      fontSize: "1.2rem", //
    },
    body1: {
      fontSize: "1rem", // ~16px
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.8rem", // ~14px
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
          fontSize: "0.85rem",
          "@media (max-width:640px)": { fontSize: "0.7rem" }, // sm ve altı
          "@media (min-width:1024px)": { fontSize: "1rem" }, // lg
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
    MuiFormControlLabel: {
    styleOverrides: {
      label: {
        fontSize: "0.7rem",
        "@media (max-width:640px)": { fontSize: "0.6rem" },
        "@media (min-width:1024px)": { fontSize: "0.8rem" },
      },
    },
  },

  MuiFormLabel: {
    styleOverrides: {
      root: {
         fontSize: "0.7rem",
        "@media (max-width:640px)": { fontSize: "0.6rem" },
        "@media (min-width:1024px)": { fontSize: "0.8rem" },
        // fontSize: "1rem",
        // "@media (max-width:640px)": { fontSize: "0.9rem" },
        // "@media (min-width:1024px)": { fontSize: "1.05rem" },
      },
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: {
        transform: "scale(0.8)", // varsayılan boyut
        "@media (max-width:640px)": { transform: "scale(0.7)" }, // mobilde biraz küçülür
        "@media (min-width:1024px)": { transform: "scale(0.9)" }, // büyük ekranda biraz büyür
      },
    },
  },
  },
});

 theme = responsiveFontSizes(theme);
export default theme