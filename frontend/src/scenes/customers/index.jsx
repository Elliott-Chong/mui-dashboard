import React from "react";
import { Box, useTheme } from "@mui/material";
import { useQuery } from "react-query";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params) => {
      return params.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.4,
  },
  {
    field: "occupation",
    headerName: "Occupation",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
];

const Customers = () => {
  const theme = useTheme();
  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axios.get("/client/customers");
      return response.data;
    },
  });
  console.log("🚀 ~ file: index.jsx:16 ~ Customers ~ customers", customers);
  return (
    <Box m="1.5rem 2.5rem">
      <Header subtitle={"List of Customers"} title={"CUSTOMERS"} />
      {!isLoading && (
        <Box mt="40px" height="75vh">
          <DataGrid
            loading={isLoading}
            getRowId={(row) => row._id}
            columns={columns}
            rows={customers || []}
          />
        </Box>
      )}
    </Box>
  );
};

export default Customers;
