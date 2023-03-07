import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import "../../Style/HeaderStyle.css";
import { Box, color } from "@mui/system";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const Header = () => {
  const [drawerToggle, setDrawerToggle] = useState(false);
  const drawerHandler = () => {
    setDrawerToggle(!drawerToggle);
  };
  const drawer = (
    <Box onClick={drawerHandler} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
        color="green"
      >
        FaFaCo
      </Typography>
      <Divider />
      <ul className="mobile-navigation   ">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/land"}>Add Land</NavLink>
        </li>
      </ul>
    </Box>
  );
  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "green" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={drawerHandler}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FaFaCo
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
            <ul className="navigation-menu">
              <li>
                <NavLink to={"/"}>Home</NavLink>
                <Link></Link>
              </li>
            </ul>
            <Box />
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={drawerToggle}
            onClose={drawerHandler}
            sx={{
              display: { xs: "block", sm: "none" },
              "&.MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Toolbar />
      </Box>
    </>
  );
};

export default Header;
