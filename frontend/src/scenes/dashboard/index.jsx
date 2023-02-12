import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";

import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "../../components/BreakdownChart";
import OverviewChart from "../../components/OverviewChart";
import { fontSize } from "@mui/system";
import StatBox from "../../components/StatBox";
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
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");
  const { data } = useQuery({
    queryKey: "dashboard",
    queryFn: async () => {
      const { data } = await axios.get("/general/dashboard");
      return data;
    },
  });
  console.log("🚀 ~ file: index.jsx:35 ~ Dashboard ~ data", data);
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle={"Welcome to your dashboard"} />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ fontSize: "20px", marginRight: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns={`repeat(${isNonMediumScreen ? 12 : 1}, 1fr)`}
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12" },
        }}
      >
        {/* First row */}
        <StatBox
          title="Total Customers"
          value={data?.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Sales"
          value={data?.yearlySalesTotal}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn={"span 8"}
          gridRow="span 2"
          p="1rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data?.thisMonthStats?.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data?.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* row 2 */}
        <Box gridColumn={"span 8"} gridRow="span 3">
          <DataGrid
            getRowId={(row) => row._id}
            rows={data?.recentTransactions || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
