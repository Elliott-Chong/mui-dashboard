import React from "react";

import profileImg from "../assets/profile.jpeg";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Icon,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useGlobalContext } from "../context";
import { Box } from "@mui/system";
const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
  const { setMode } = useGlobalContext();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          {theme.palette.mode === "light" ? (
            <IconButton onClick={() => setMode("dark")}>
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => setMode("light")}>
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
          )}
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
              }}
            >
              <Box
                component={"img"}
                src={profileImg}
                alt="profile"
                height="32px"
                width="32px"
                borderRadius={"50%"}
                sx={{ objectFit: "cover", mr: "1rem" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight={"bold"}
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              // anchorOrigin={{ vertical: "center", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
