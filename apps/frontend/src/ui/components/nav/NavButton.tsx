import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { colors } from "../../../lib/themes";

export const NavButton = ({ name, link }: { name: string; link: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    location.pathname === link ? setSelected(true) : setSelected(false);
  }, [location.pathname]);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        m: 1,
        backgroundColor: !selected
          ? "rgba(255, 255, 255, 0)"
          : "rgba(255, 255, 255, 1)",
        boxShadow: "none",
      }}
    >
      <CardActionArea
        onClick={() => navigate(link)}
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          py: 1,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: selected ? colors.secondary : colors.primary,
          }}
        >
          {name}
        </Typography>
      </CardActionArea>
    </Card>
  );
};
