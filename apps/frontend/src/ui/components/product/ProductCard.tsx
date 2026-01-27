import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Product } from "../../../lib/types";
import { useNavigate } from "react-router";
import { FadeWrapper } from "../FadeWrapper";
import { apiUrl } from "../../../lib/constants";

export const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, image } = product;
  const navigate = useNavigate();
  return (
    <FadeWrapper>
      <div>
        <Card variant="outlined">
          <CardActionArea onClick={() => navigate(`/menu/${id}`)}>
            <CardMedia
              component={"img"}
              image={`${apiUrl}${image}`}
              alt="samosas"
              sx={{
                width: "345px",
                height: "200px",
              }}
            />
            <CardContent>
              <Typography variant="h5">{name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </FadeWrapper>
  );
};
