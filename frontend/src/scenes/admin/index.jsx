import React from "react";
import { useTheme, Box } from "@mui/material";
import Header from "../../components/Header";
import { useQuery } from "react-query";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import CustomColumnMenu from "../../components/CustomColumnMenu";
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

const Admin = () => {
  const theme = useTheme();
  const { data: admins, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data } = await axios.get("/management/admins");
      return data;
    },
  });
  console.log("🚀 ~ file: index.jsx:16 ~ Admin ~ admins", admins);
  return (
    <Box m="1.5rem 2.5rem">
      <Header subtitle={"List of Admins"} title={"ADMINS"} />
      {!isLoading && (
        <Box mt="40px" height="75vh">
          <DataGrid
            loading={isLoading}
            getRowId={(row) => row._id}
            columns={columns}
            rows={admins || []}
            components={{
              ColumnMenu: CustomColumnMenu,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Admin;
