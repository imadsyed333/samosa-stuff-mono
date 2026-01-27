import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect, useState } from "react";
import { colors } from "../../lib/themes";

export const IncrementalButton = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (qty: number) => void;
}) => {
  const [quantity, setQuantity] = useState(value);

  useEffect(() => {
    setQuantity(value);
  }, [value]);
  const handleInput = (e: any) => {
    const input = Number(e.target.value);
    if (!isNaN(input)) {
      setQuantity(input);
      onChange(input);
    }
  };

  const incrementCount = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const decrementCount = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        backgroundColor: colors.primary,
        border: 1,
        borderRadius: 1,
        borderColor: "lightgray",
      }}
    >
      <IconButton
        onClick={decrementCount}
        sx={{
          color: colors.secondary,
          ml: 1,
        }}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        value={quantity}
        onChange={(e) => handleInput(e)}
        sx={{
          input: {
            textAlign: "center",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
        }}
        variant="outlined"
      />
      <IconButton
        onClick={incrementCount}
        sx={{
          color: colors.secondary,
          mr: 1,
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};
