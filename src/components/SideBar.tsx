import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  DashboardOutlined,
  LogoutOutlined,
  AnalyticsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
const SideBar = () => {
  // const { collapseSidebar, toggleSidebar, broken } = useProSidebar();

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
        button: ({active}) => {
          return {
            backgroundColor: active? theme.palette.info.main : undefined
          }
        }
      }}>
        <MenuItem active={location.pathname === "/"} component={<Link to="/"/>} icon={<DashboardOutlined />}>
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem active icon={<DashboardOutlined />}>
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem active icon={<AnalyticsOutlined />}>
          <Typography variant="body2">OrganizationTable</Typography>
        </MenuItem>
        <MenuItem active icon={< SettingsOutlined />}>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <MenuItem active component={<Link to=""/>} icon={<LogoutOutlined />}>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};
export default SideBar;
