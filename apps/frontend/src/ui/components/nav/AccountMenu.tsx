import { Box, CardActionArea, Menu, MenuItem, Typography } from "@mui/material";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { AccountCircle } from "@mui/icons-material";

export const AccountMenu = () => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "accountMenu",
  });
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toProfile = () => {
    popupState.close();
    navigate("/profile");
  };

  const toLogout = () => {
    popupState.close();
    logout();
  };

  const toAdminPanel = () => {
    popupState.close();
    navigate("/admin");
  };
  return (
    <>
      <CardActionArea
        sx={{
          display: "flex",
          width: "50%",
        }}
        {...bindTrigger(popupState)}
      >
        <AccountCircle
          sx={{
            fontSize: 30,
          }}
        />
      </CardActionArea>
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem disableTouchRipple>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body2">{user?.email}</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={toProfile}>Profile</MenuItem>
        {user?.role === "ADMIN" && (
          <MenuItem onClick={() => toAdminPanel()}>Admin Panel</MenuItem>
        )}
        <MenuItem onClick={toLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
