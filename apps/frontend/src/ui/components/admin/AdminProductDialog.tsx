import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import { ProductForm } from "../product/ProductForm";
import { useSelectedProduct } from "../../../context/SelectProductContext";

const AdminProductDialog = () => {
  const { open, setOpen } = useSelectedProduct();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
        }}
      >
        <ProductForm />
      </DialogContent>
    </Dialog>
  );
};

export default AdminProductDialog;
