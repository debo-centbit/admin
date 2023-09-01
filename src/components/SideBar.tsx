import React from "react";
import { Box, Typography, useTheme, Avatar } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  DashboardOutlined,
  LogoutOutlined,
  AnalyticsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import slack from "../assets/slack.png";
import { useProSidebar } from "react-pro-sidebar";

const SideBar = () => {
  const { collapsed } = useProSidebar();
  // const [collapsed, setCollapsed] = useState<boolean>(false);

  const theme = useTheme();
  const location = useLocation();
  return (
    <Sidebar
      style={{
        height: "100%",
        top: "auto",
      }}
      breakPoint="md"
      backgroundColor={theme.palette.info.main}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active ? theme.palette.info.main : undefined,
            };
          },
        }}
      >
        <Box sx={styles.avatarContainer}>
          <Avatar sx={styles.avatar} alt="image" src={slack} />
          {!collapsed ? (
            <Typography variant="body2" sx={styles.companyName}>
              Company Name
            </Typography>
          ) : null}
          {!collapsed ? (
            <Typography variant="body1">Company Tagline</Typography>
          ) : null}
        </Box>
        <MenuItem
          active={location.pathname === "/"}
          component={<Link to="/" />}
          icon={<DashboardOutlined />}
        >
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem active icon={<DashboardOutlined />}>
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem active icon={<AnalyticsOutlined />}>
          <Typography variant="body2">OrganizationTable</Typography>
        </MenuItem>
        <MenuItem active icon={<SettingsOutlined />}>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <MenuItem active component={<Link to="" />} icon={<LogoutOutlined />}>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  avatar: {
    width: "40%",
    height: "auto",
  },
  companyName: {
    mt: 1,
  },
};
export default SideBar;