import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(80, 80, 80)",
    },
    secondary: {
      main: "rgb(168, 168, 168)",
    },
    background: {
      default: "rgb(224, 224, 224)",
      paper: "rgb(215, 215, 215)",
    },
    text: {
      primary: "rgb(18, 18, 18)",
      secondary: "rgb(115, 115, 115)",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-input": {
            color: "rgb(18, 18, 18)",
          },
          "& .MuiInputLabel-root": {
            color: "rgb(80, 80, 80)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(115, 115, 115)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(80, 80, 80)",
          },
        },
      },
    },
  },
});

export default theme;
