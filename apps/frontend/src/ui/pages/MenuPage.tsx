import { Box, Typography } from "@mui/material";
import React from "react";
import { MenuGrid } from "../components/menu/MenuGrid";
import { colors } from "../../lib/themes";

export const Menu = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mx: 2,
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: colors.secondary,
            textAlign: "left",
            mb: 1,
          }}
        >
          Samosa
        </Typography>
        <MenuGrid />
      </Box>
    </Box>
  );
};
