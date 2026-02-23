import { Typography } from "@mui/material";
import React from "react";

const PasswordRules = () => {
  return (
    <>
      <Typography
        variant="body2"
        sx={{
          justifyContent: "left",
        }}
      >
        Your password must have:
        <ul>
          <li>At least 8 characters</li>
          <li>A lower-case letter</li>
          <li>An upper-case letter</li>
          <li>A number</li>
        </ul>
      </Typography>
    </>
  );
};

export default PasswordRules;
