import { Route, Routes } from "react-router-dom";
import * as React from "react";
import ReactDOM from "react-dom";
import Farmerdetails from "./component copy/pages/Farmerdetails";
import Machinedetails from "./component copy/pages/Machinedetails";
import Start from "./component copy/pages/Start";
import Land from "./component copy/pages/Land";
import ViewFarmer from "./component copy/pages/ViewFarmer";
import Add from "./component copy/pages/Add_Employee";
import CropForm from "./component copy/pages/CropForm";
import Signup from "./component copy/pages/Signup";
import Admin from "./component copy/pages/Admin";
import Employee from "./component copy/pages/Employee";
import View from "./component copy/pages/View_Employee";
import EditLand from "./component copy/pages/EditLand";
import Livestock from "./component copy/pages/Livestock";
import Garden from "./component copy/pages/Garden";
import LabourWorkForm from "./component copy/pages/LabourWorkForm";
import Scroll from "./component copy/pages/Scroll";
import SelectLand from "./component copy/pages/SelectLand";
import LandTable from "./component copy/pages/LandTable";
import Edit from "./component copy/pages/Edit_Employee";
import Preview from "./component copy/pages/Preview";
import Editgarden from "./component copy/pages/editgarden";
import EditLivestock from "./component copy/pages/Editlivestocktable";
import EditMachinedetails from "./component copy/pages/EditMachinedetails";
import EditCrop from "./component copy/pages/CropEditTable";
import Gardentable from "./component copy/pages/gardentable";
import Livestocktable from "./component copy/pages/livestocktable";
import CropTable from "./component copy/pages/CropTable";
import LabourEditForm from "./component copy/pages/LabourEditForm";
import ViewMachine from "./component copy/pages/Viewmachine";
import SideBar from "./component copy/pages/SideBar";
import Profile from "./component copy/pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add_employee" element={<Add />} />
      <Route path="/view_employee" element={<View />} />
      <Route path="/farmerdetails" element={<Farmerdetails />} />
      <Route path="/land" element={<Land />} />
      <Route path="/machinedetails" element={<Machinedetails />} />
      <Route path="/viewfarmer" element={<ViewFarmer />} />
      <Route path="/cropform" element={<CropForm />} />
      <Route path="/livestock" element={<Livestock />} />
      <Route path="/garden" element={<Garden />} />
      <Route path="/gardentable" element={<Gardentable />} />
      <Route path="/livestocktable" element={<Livestocktable />} />
      <Route path="/editgarden" element={<Editgarden />} />
      <Route path="/editlivestock" element={<EditLivestock />} />
      <Route path="/labour" element={<LabourWorkForm />} />
      <Route path="/edit_employee" element={<Edit />} />
      <Route path="/selectlandtable" element={<Scroll />} />
      <Route path="/selectlandpage" element={<SelectLand />} />
      <Route path="/landtable" element={<LandTable />} />
      <Route path="/editland" element={<EditLand />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/editmachine" element={<EditMachinedetails />} />
      <Route path="/editcrop" element={<EditCrop />} />
      <Route path="/croptable" element={<CropTable />} />
      <Route path="/editlabour" element={<LabourEditForm />} />
      <Route path="/machinetable" element={<ViewMachine />} />
      <Route path="/sidebar" element={<SideBar />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;

// import { Route, Routes } from "react-router-dom";
// import Farmerdetails from "./component copy/pages/Farmerdetails";
// import Machinedetails from "./component copy/pages/Machinedetails";
// import Start from "./component copy/pages/Start";
// import Land from "./component copy/pages/Land";
// import ViewFarmer from "./component copy/pages/ViewFarmer";
// import Add from "./component copy/pages/Add_Employee";
// import CropForm from "./component copy/pages/CropForm";
// import Signup from "./component copy/pages/Signup";
// import Admin from "./component copy/pages/Admin";
// import Employee from "./component copy/pages/Employee";
// import View from "./component copy/pages/View_Employee";
// import EditLand from "./component copy/pages/EditLand";
// import Livestock from "./component copy/pages/Livestock";
// import Garden from "./component copy/pages/Garden";
// import LabourWorkForm from "./component copy/pages/LabourWorkForm";
// import Scroll from "./component copy/pages/Scroll";
// import SelectLand from "./component copy/pages/SelectLand";
// import LandTable from "./component copy/pages/LandTable";
// import Edit from "./component copy/pages/Edit_Employee";
// // import Preview from "./component copy/pages/Preview";
// import Editgarden from "./component copy/pages/editgarden";
// import EditLivestock from "./component copy/pages/Editlivestocktable";
// import EditMachinedetails from "./component copy/pages/EditMachinedetails";
// import EditCrop from "./component copy/pages/CropEditTable";
// import Gardentable from "./component copy/pages/gardentable";
// import Livestocktable from "./component copy/pages/livestocktable";
// import CropTable from "./component copy/pages/CropTable";
// import LabourEditForm from "./component copy/pages/LabourEditForm";
// import ViewMachine from "./component copy/pages/Viewmachine";
// import SideBar from "./component copy/pages/SideBar";
// import React from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// // import landicon1 from "../../icons8-field-ios-16-glyph/landicon1.png";
// // import landicon2 from "../../icons8-field-ios-16-glyph/landicon2.png";
// import { GiFlatPlatform } from "react-icons/gi";
// import { RiPlantFill } from "react-icons/ri";
// import { GrUserWorker } from "react-icons/gr";
// import { GiFarmer } from "react-icons/gi";
// import { FaTractor } from "react-icons/fa";
// import { GiForest } from "react-icons/gi";
// import { GiCow } from "react-icons/gi";
// import { useNavigate } from "react-router-dom";
// import { ReactFragment } from "react";
// import { Fragment } from "react";

// const drawerWidth = 240;
// const App = () => {
//   const navigate = useNavigate();
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Clipped drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: "auto" }}>
//           <List>
//             {[
//               { name: "Add Land", icon: <GiFlatPlatform /> },
//               { name: "Add Crop", icon: <RiPlantFill /> },
//               { name: "Add Garden", icon: <GiForest /> },
//               { name: "Add Labour", icon: <GiFarmer /> },
//               { name: "Add Machine", icon: <FaTractor /> },
//               { name: "Add Livestock", icon: <GiCow /> },
//             ].map((text, index) => (
//               <ListItem key={text} disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon onClick={() => navigate("/land")}>
//                     {text.icon}
//                   </ListItemIcon>
//                   <ListItemText primary={text.name} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//          <Toolbar />
//         <Land />

//         <Routes>
//            <Toolbar />
//           <Route path="/" element={<Start />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/employee" element={<Employee />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/add_employee" element={<Add />} />
//           <Route path="/view_employee" element={<View />} />
//           <Route path="/farmerdetails" element={<Farmerdetails />} />
//           <Route path="/land" element={<Land />} />
//           <Route path="/machinedetails" element={<Machinedetails />} />
//           <Route path="/viewfarmer" element={<ViewFarmer />} />
//           <Route path="/cropform" element={<CropForm />} />
//           <Route path="/livestock" element={<Livestock />} />
//           <Route path="/garden" element={<Garden />} />
//           <Route path="/gardentable" element={<Gardentable />} />
//           <Route path="/livestocktable" element={<Livestocktable />} />
//           <Route path="/editgarden" element={<Editgarden />} />
//           <Route path="/editlivestock" element={<EditLivestock />} />
//           <Route path="/labour" element={<LabourWorkForm />} />
//           <Route path="/edit_employee" element={<Edit />} />
//           <Route path="/selectlandtable" element={<Scroll />} />
//           <Route path="/selectlandpage" element={<SelectLand />} />
//           <Route path="/landtable" element={<LandTable />} />
//           <Route path="/editland" element={<EditLand />} />
//            <Route path="/preview" element={<Preview />} />
//           <Route path="/editmachine" element={<EditMachinedetails />} />
//           <Route path="/editcrop" element={<EditCrop />} />
//           <Route path="/croptable" element={<CropTable />} />
//           <Route path="/editlabour" element={<LabourEditForm />} />
//           <Route path="/machinetable" element={<ViewMachine />} />
//           <Route path="/sidebar" element={<SideBar />} />
//         </Routes>
//       </Box>
//     </Box>
//   );
// };

// export default App;

// import { Route } from "react-router-dom";
// import React from "react";
// import { Fragment } from "react";
// import { BrowserRouter, Routes } from "react-router-dom";
// import Layout from "./New/Components/Layout/Layout";
// import About from "./New/Pages/About";
// import Contact from "./New/Pages/Contact";
// import Home from "./New/Pages/Home";
// import Menu from "./New/Pages/Menu";
// import PageNotFound from "./New/Pages/PageNotFound";
// import Land from "./New/Pages/Land";

// const App = () => {
//   return (
//     <div>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/menu" element={<Menu />} />
//           <Route path="/land" element={<Land />} />
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>

//     </div>
//   );
// };

// export default App;
