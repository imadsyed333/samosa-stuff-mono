import { createTheme } from "@mui/material";

export const colors = {
  primary: "#FFFFFF",
  secondary: "#00072D",
  tertiary: "#001C55",
  button: {
    primary: "#001C55",
    delete: "#E71D36",
  },
  status: {
    PLACED: "#d8cc34",
    READY: "#23C768",
    RECEIVED: "#1b9aaa",
  },
  error: "#E71D36",
};

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "inherit",
      fontWeight: 200,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "inherit",
          fontSize: 20,
          fontWeight: 300,
        },
        containedPrimary: {
          backgroundColor: colors.button.primary,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: colors.button.primary,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: colors.tertiary,
          "&.Mui-selected": {
            color: colors.tertiary,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: colors.tertiary,
        },
      },
    },
  },
});
