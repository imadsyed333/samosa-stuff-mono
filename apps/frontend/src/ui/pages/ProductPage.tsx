import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getProductWithId } from "../../api/productClient";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ProductSideCard } from "../components/product/ProductSideCard";
import { apiUrl } from "../../lib/constants";

export const ProductPage = () => {
  const { id } = useParams();
  const { isSuccess, isPending, isError, data, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductWithId(parseInt(id!)),
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        m: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isPending && <CircularProgress />}
        {isError && <Typography>{error.message}</Typography>}
        {isSuccess && (
          <Grid
            container
            columns={{ xs: 1, sm: 2 }}
            columnSpacing={2}
            rowSpacing={2}
          >
            <Grid size={1}>
              <Box
                component={"img"}
                alt={`${data?.product.name} image`}
                src={`${apiUrl}${data?.product.image}`}
                sx={{
                  height: "400px",
                  maxWidth: "100%",
                }}
              />
            </Grid>
            <Grid
              size={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProductSideCard product={data.product} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};
