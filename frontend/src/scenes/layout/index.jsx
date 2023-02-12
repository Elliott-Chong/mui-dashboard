import { Box } from "@mui/system";
import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useGlobalContext } from "../../context";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(isNonMobile);
  const { userId } = useGlobalContext();

  const { data: user } = useQuery({
    queryKey: ["user"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await axios.get(`/general/user/${userId}`);
      return response.data;
    },
  });
  console.log("🚀 ~ file: index.jsx:24 ~ Layout ~ user", user);

  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <Sidebar
        user={user || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth={isSidebarOpen ? 250 : 0}
        isNonMobile={isNonMobile}
      />
      <Box width="100%">
        <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
