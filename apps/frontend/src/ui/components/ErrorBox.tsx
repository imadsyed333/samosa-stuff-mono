import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../lib/themes";

export const ErrorBox = ({ errors }: { errors: String[] }) => {
  return (
    <>
      {errors.length !== 0 ? (
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          disablePadding
        >
          {errors.map((error, key) => (
            <ListItem key={key} disablePadding disableGutters>
              <Typography
                variant="caption"
                sx={{
                  color: colors.error,
                }}
              >
                - {error}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}
    </>
  );
};
