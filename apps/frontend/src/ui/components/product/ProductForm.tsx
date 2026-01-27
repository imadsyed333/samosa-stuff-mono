import { FileUpload } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProductActions } from "../../../hooks/useProductActions";
import { useSelectedProduct } from "../../../context/SelectProductContext";
import { useProductQuery } from "../../../hooks/useProductQuery";
import z from "zod";
import { apiUrl } from "../../../lib/constants";

type ProductFormType = {
  name: string;
  description: string;
  price: number;
  image: File | null;
  imagePreview: string;
};

type ProductFormErrors = {
  name?: String[] | undefined;
  description?: String[] | undefined;
  price?: String[] | undefined;
};

const ProductFormSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  description: z.string().min(1, { error: "Description is required" }),
  price: z.number(),
});

export const ProductForm = () => {
  const [formProduct, setFormProduct] = useState<ProductFormType>({
    name: "",
    description: "",
    price: 0,
    image: null,
    imagePreview: "",
  });

  const [formErrors, setFormErrors] = useState<ProductFormErrors>({});

  const { addProduct, editProduct } = useProductActions();

  const { selectedProduct, setOpen } = useSelectedProduct();

  const { products } = useProductQuery();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      const { id, image: imagePreview, ...rest } = selectedProduct;
      setFormProduct({
        imagePreview,
        image: null,
        ...rest,
      });
    }
    setFormErrors({});
  }, [selectedProduct?.id, products]);

  const setFormValue = (key: string, value: any) => {
    setFormProduct({
      ...formProduct,
      [key]: value,
    });
    setFormErrors({
      ...formErrors,
      [key]: undefined,
    });
  };

  const handleUpload = (e: any) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFormProduct({
      ...formProduct,
      imagePreview: URL.createObjectURL(selectedFile),
      image: selectedFile,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    const { imagePreview, image, ...rest } = formProduct;
    const parse = ProductFormSchema.safeParse(rest);

    if (parse.success) {
      if (selectedProduct) {
        editProduct(selectedProduct.id, { image, ...parse.data });
      } else {
        addProduct({ image, ...parse.data });
      }
      setOpen(false);
    } else {
      const errors = z.flattenError(parse.error);
      setFormErrors(errors.fieldErrors);
    }
    setLoading(false);
  };

  const formatImageUrl = (imageUrl: string) => {
    return imageUrl.startsWith("/uploads") ? `${apiUrl}${imageUrl}` : imageUrl;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
      }}
    >
      <TextField
        error={!!formErrors.name}
        label="Name"
        name="name"
        value={formProduct.name}
        onChange={(e) => setFormValue("name", e.target.value)}
        sx={{
          mb: 1,
          width: "300px",
        }}
        helperText={!!formErrors.name && <>{formErrors.name[0]}</>}
      />
      <TextField
        error={!!formErrors.description}
        label="Description"
        name="description"
        value={formProduct.description}
        onChange={(e) => setFormValue("description", e.target.value)}
        sx={{
          width: "100%",
          mb: 1,
        }}
        helperText={
          !!formErrors.description && <>{formErrors.description[0]}</>
        }
        multiline
        rows={4}
      />
      <TextField
        error={!!formErrors.price}
        label="Price"
        name="price"
        value={formProduct.price}
        onChange={(e) => setFormValue("price", Number(e.target.value))}
        sx={{
          mb: 1,
          width: "100%",
        }}
        helperText={!!formErrors.price && <>{formErrors.price[0]}</>}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          mb: 1,
        }}
      >
        <TextField
          name="imagePreview"
          value={formProduct.imagePreview}
          disabled
          sx={{
            width: "100%",
            mr: 1,
          }}
        />
        <Button component="label" variant="contained" sx={{}}>
          <FileUpload />
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </Button>
      </Box>
      {formProduct.imagePreview && (
        <Box
          component={"img"}
          src={formatImageUrl(formProduct.imagePreview)}
          sx={{
            height: 200,
            mb: 1,
          }}
        />
      )}
      <Button
        variant="contained"
        onClick={() => handleSubmit()}
        loading={loading}
        sx={{
          width: "100%",
        }}
      >
        {selectedProduct ? "Update Product" : "Add Product"}
      </Button>
    </Box>
  );
};
