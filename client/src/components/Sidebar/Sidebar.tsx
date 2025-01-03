import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { getAuth } from "firebase/auth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SortIcon from "@mui/icons-material/Sort";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 80;

const auth = getAuth();

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const user = auth.currentUser;

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box className="bg-inherit p-4 ">
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? drawerWidthCollapsed : drawerWidthExpanded,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? drawerWidthCollapsed : drawerWidthExpanded,
            transition: "width 0.5s ease",
            overflowX: "hidden",
            boxSizing: "border-box",
            borderRadius: "5px",
            backgroundColor: "inherit",
          },
        }}
        className="rounded-lg backdrop-blur-lg m-1 h-[calc(100%-16px)] !bg-zinc-900 flex flex-col"
      >
        <Toolbar
          className={`flex ${
            collapsed ? "justify-end" : "justify-between text-3xl text-white"
          } bg-zinc-800`}
        >
          {!collapsed && "Parlex"}
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Divider className="bg-black" />
        <Box className="flex flex-col flex-1 bg-zinc-800 text-white">
          <Box className="flex flex-col items-center my-2 gap-2">
            <Avatar className="w-18 h-18" />
            {!collapsed && <Typography>{user?.displayName}</Typography>}
          </Box>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton component={Link} to="/dashboard">
                <DashboardIcon />
                {!collapsed && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={Link} to="/wordbank">
                <BookIcon />
                {!collapsed && <ListItemText primary="Word bank" />}
              </ListItemButton>
            </ListItem>

            <Divider />
            <Box className="flex flex-col items-center">
              {!collapsed && <Typography variant="h6">Challenges</Typography>}

              <ListItem>
                <ListItemButton component={Link} to="/flashcards">
                  <FlashOnIcon />
                  {!collapsed && <ListItemText primary="Flashcards" />}
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} to="/completesentence">
                  <TextFieldsIcon />
                  {!collapsed && <ListItemText primary="Un/Une" />}
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} to="/wordorder">
                  <SortIcon />
                  {!collapsed && <ListItemText primary="Shuffled sentences" />}
                </ListItemButton>
              </ListItem>
            </Box>
          </List>
        </Box>

        <Box className="mt-auto bg-zinc-800">
          <List>
            <ListItem>
              <ListItemButton onClick={logout}>
                <LogoutIcon />
                {!collapsed && (
                  <ListItemText className="!text-white " primary="Logout" />
                )}
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
