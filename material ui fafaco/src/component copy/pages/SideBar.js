import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import landicon1 from "../../icons8-field-ios-16-glyph/landicon1.png";
import landicon2 from "../../icons8-field-ios-16-glyph/landicon2.png";
import { GiFlatPlatform } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { GiFarmer } from "react-icons/gi";
import { FaTractor } from "react-icons/fa";
import { GiForest } from "react-icons/gi";
import { GiCow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Land from "./Land";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { cropActions } from "../../store/cropDetailsReducer";
import { gardenLogout } from "../../store/gardenreducer";
import { landActions } from "../../store/landStore";
import { farmerActions } from "../../store/reducer";

const drawerWidth = 200;

const SideBar = () => {
  const dispatch = useDispatch();
  const isauth = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const { isLogin } = useSelector((state) => state.auth);
  console.log("farmer", isLogin);
  const { isFarmerEdit } = useSelector((state) => state.auth);
  const { farmername } = useSelector((state) => state.farmer);
  console.log(farmername, "farmer");
  const { farmer_id } = useSelector((state) => state.farmer);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  // const loginAppBar = [
  //   { name: "Add Land", icon: <GiFlatPlatform /> },
  //   { name: "Add Crop", icon: <RiPlantFill /> },
  // ];

  const logoutHandler = (event) => {
    dispatch(authActions.logout());
    dispatch(authActions.farmerLogout());
    //empty redux
    dispatch(authActions.authLogout());
    dispatch(cropActions.cropLogout());
    dispatch(gardenLogout());
    dispatch(landActions.landLogout());
    dispatch(farmerActions.farmerLogout());
    console.log("far", isLogin);
    localStorage.clear();
    navigate("/");
  };
  const editFarmerHandler = () => {
    navigate("/farmerdetails");
  };
  const editLandHandler = () => {
    navigate("/editland");
  };
  const editedMachineHandler = () => {
    navigate("/machinetable");
  };
  const editGardenHandler = () => {
    navigate("/gardentable");
  };
  const editLivestockHandler = () => {
    navigate("/livestocktable");
  };
  const editCropHandler = () => {
    navigate("/croptable");
  };
  const editLabourHandler = () => {
    navigate("/editlabour");
  };

  const addList = [
    { name: "Add Land", icon: <GiFlatPlatform />, path: "/land" },
    { name: "Add Crop", icon: <RiPlantFill />, path: "/cropform" },
    { name: "Add Garden", icon: <GiForest />, path: "/garden" },
    { name: "Add Labour", icon: <GiFarmer />, path: "/labour" },
    { name: "Add Machine", icon: <FaTractor />, path: "/machine" },
    { name: "Add Livestock", icon: <GiCow />, path: "/livestock" },
  ];
  const editList = [
    { name: "Edit Farmer", icon: <GiFlatPlatform />, path: "/land" },
    { name: "Edit Land", icon: <GiFlatPlatform />, path: "/land" },
    { name: "Edit Crop", icon: <RiPlantFill />, path: "/land" },
    { name: "Edit Garden", icon: <GiForest />, path: "/land" },
    { name: "Edit Labour", icon: <GiFarmer />, path: "/land" },
    { name: "Edit Machine", icon: <FaTractor />, path: "/land" },
    { name: "Edi Livestock", icon: <GiCow />, path: "/land" },
  ];
  const loginList = [
    { name: "Add Employee", icon: <GiFlatPlatform />, path: "/add_employee" },
    { name: "View Employee", icon: <GiFlatPlatform />, path: "/view_employee" },
    { name: "Add Farmer", icon: <RiPlantFill />, path: "/farmerdetails" },
    { name: "View Farmer", icon: <GiForest />, path: "/viewfarmer" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!role && (
        <AppBar
          style={{ background: "green" }}
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6">FaFaCo</Typography>
            {(isFarmerEdit || isLogin) && (
              <p>
                Welcome {farmername}({farmer_id})
              </p>
            )}

            <div className="header-back">
              {!isauth && (
                <Stack spacing={2} direction="row" sx={{ marginLeft: "auto" }}>
                  <Button
                    sx={{ marginLeft: "auto" }}
                    color="inherit"
                    onClick={() => navigate("/signup")}
                  >
                    signup
                  </Button>
                  <Button
                    sx={{ marginLeft: "auto" }}
                    color="inherit"
                    onClick={() => navigate("/employee")}
                  >
                    login
                  </Button>
                </Stack>
              )}

              {isauth && (
                <Button
                  sx={{ marginLeft: "auto" }}
                  color="inherit"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      )}

      {role && (
        <AppBar
          style={{ background: "green" }}
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6">FaFaCo</Typography>
            {(isFarmerEdit || isLogin) && (
              <p>
                Welcome {farmername}({farmer_id})
              </p>
            )}
            <div className="header-back">
              {!isauth && (
                <Button
                  sx={{ marginLeft: "auto" }}
                  color="inherit"
                  onClick={() => navigate("/admin")}
                >
                  Home
                </Button>
              )}

              {isauth && (
                <Button
                  sx={{ marginLeft: "auto" }}
                  color="inherit"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {!isLogin &&
              isauth &&
              role &&
              loginList.map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon onClick={() => navigate(`${text.path}`)}>
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      onClick={() => navigate(`${text.path}`)}
                      primary={text.name}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            {isauth && (role || !role) && isLogin && (
              <div>
                {!isFarmerEdit
                  ? addList.map((text, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton>
                          <ListItemIcon
                            onClick={() => navigate(`${text.path}`)}
                          >
                            {text.icon}
                          </ListItemIcon>
                          <ListItemText
                            onClick={() => navigate(`${text.path}`)}
                            primary={text.name}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))
                  : editList.map((text, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton>
                          <ListItemIcon
                            onClick={() => navigate(`${text.path}`)}
                          >
                            {text.icon}
                          </ListItemIcon>
                          <ListItemText
                            onClick={() => navigate(`${text.path}`)}
                            primary={text.name}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
              </div>
            )}
            {/* // addList.map((text, index) => (
              //   <ListItem key={index} disablePadding>
              //     <ListItemButton>
              //       <ListItemIcon onClick={() => navigate(`${text.path}`)}>
              //         {text.icon}
              //       </ListItemIcon>
              //       <ListItemText primary={text.name} />
              //     </ListItemButton>
              //   </ListItem>
              // ))}

            // {addList.map((text, index) => ( */}
            {/* //{" "}
            <ListItem key={index} disablePadding>
              //{" "}
              <ListItemButton>
                //{" "}
                <ListItemIcon onClick={() => navigate(`${text.path}`)}>
                  // {text.icon}
                  //{" "}
                </ListItemIcon>
                // <ListItemText primary={text.name} />
                //{" "}
              </ListItemButton>
              //{" "}
            </ListItem>
            // ))} //{" "} */}
          </List>
        </Box>
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
      {/* <Toolbar />
        <Land /> */}
      {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      {/* </Box> */}
    </Box>
  );
};

export default SideBar;
