import Login from "./Login";
import "./Admin.css";
import * as React from "react";
import { Fragment } from "react";
import Layout from "../Layout/Layout";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";

const Admin = () => {
  return (
    <Fragment>
      <Toolbar />
      <Box>
        {/* <Layout /> */}
        <div className="admin">
          <h1>Admin Login</h1>
          <div className="admin-login">
            <Login />
          </div>
        </div>
      </Box>
    </Fragment>
  );
};

export default Admin;
