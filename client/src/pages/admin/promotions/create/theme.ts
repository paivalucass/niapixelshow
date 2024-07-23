import { createTheme, ThemeProvider } from "@mui/material/styles";
import zIndex from "@mui/material/styles/zIndex";
import { z } from "zod";

export const thema = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
              borderRadius: "0.7rem",
              fontFamily: "Poppins, sans-serif",
              backgroundColor: "#FFFFFF",
              zIndex: 0,
              color: "#121212",
              width: "20rem",
            },
            "&:hover fieldset": {
              borderColor: "#121212",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#121212",
            },
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #fff inset",
            WebkitTextFillColor: "#121212",
            transition: "background-color 5000s ease-in-out 0s",
          },
          "& .MuiInputLabel-root": {
            color: "#121212",
            fontFamily: "Poppins, sans-serif",
            zIndex: 1, // Coloca o texto na frente
            "&.Mui-focused": {
              color: "#121212",
            },
          },
          "& .MuiInputBase-input": {
            color: "#121212",
            fontSize: "1rem", // Tamanho da fonte
            fontFamily: "Poppins, sans-serif",
            zIndex: 1, // Coloca o texto na frente
          },
          "& .MuiInputAdornment-root": {
            position: "relative",
            marginLeft: "3.5rem",
            zIndex: 1, // Coloca os ícones na frente
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "1rem", // Ajuste do tamanho da fonte das opções do select
          color: "#121212",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#121212",
          zIndex: 1, // Garantir que o ícone de setinha para baixo apareça
        },
        select: {
          color: "#121212", // Garantir que o texto selecionado esteja visível
          fontFamily: "Poppins, sans-serif",
          zIndex: 1,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          transform: "translate(14px, -6px) scale(0.75)",
        },
      },
    },
  },
});
