import React from "react";
import { useQuery } from "react-query";
import { useTheme, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import axios from "axios";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User Id",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => {
      return params.row.products.length;
    },
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => {
      return `$${Number(params.row.cost).toFixed(2)}`;
    },
  },
];

const Transactions = () => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(20);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");

  const theme = useTheme();
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", page, pageSize, search, sort],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get("/client/transactions", {
        params: {
          page,
          pageSize,
          search,
          sort: JSON.stringify(sort),
        },
      });
      return data;
    },
  });
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle={"Entire list of transactions"} />
      <Box height="80vh" m="40px 0">
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={data?.transactions || []}
          columns={columns}
          rowCount={data?.total || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          rowsPerPageOptions={[10, 20, 50]}
          onPageChange={(params) => setPage(params)}
          onPageSizeChange={(params) => setPageSize(params)}
          onSortModelChange={(params) => {
            console.log(params);
            setSort(...params);
          }}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
