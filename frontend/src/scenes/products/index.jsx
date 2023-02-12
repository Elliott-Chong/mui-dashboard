import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await axios.get("/client/products");
      return response.data;
    },
  });
  console.log("🚀 ~ file: index.jsx:14 ~ Products ~ products", products);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle={"See your list of products"} />
      {!isLoading && (
        <Box
          mt="20px"
          display={"grid"}
          gridTemplateColumns={`repeat(${
            isNonMobile ? "4" : "1"
          }, minmax(0,1fr))`}
          justifyContent={"space-between"}
          rowGap="20px"
          gridTemplateRows={"masonry"}
          columnGap="1.33%"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Products;
