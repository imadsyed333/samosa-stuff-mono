import React from "react";
import {
  AppBar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { NavButton } from "./NavButton";
import { Logo } from "./Logo";
import { AccountLinks } from "./AccountLinks";
import { colors } from "../../../lib/themes";

export const NavBar = () => {
  const { user } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        backgroundColor: colors.secondary,
        flexDirection: "row",
        justifyContent: "center",
        height: "70px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: isMobile ? "100%" : "70%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Logo />
          <Typography
            variant="h4"
            sx={{
              display: { xs: "none", md: "flex" },
              letterSpacing: 4,
              mr: 2,
            }}
          >
            Samosa Stuff
          </Typography>
          {!isMobile && <NavButton name="Home" link="/" />}
          <NavButton name="Menu" link="/menu" />
        </Box>
        {user && <AccountLinks />}
        {!user && <NavButton name="Login" link="/login" />}
      </Box>
    </AppBar>
  );
};
