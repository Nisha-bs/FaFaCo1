import React, { useState } from "react";
import axios from "axios";
import classes from "./land.module.css";
import { useEffect } from "react";
import LandTable from "./LandTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { landActions } from "../../store/landStore";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { styled } from "@mui/material/styles";
import instance from "./BaseURL";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { farmerActions } from "../../store/reducer";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SelectLand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { landData } = useSelector((state) => state.land);
  const selected = useSelector((state) => state.land.selectedLand);
  const [area, setArea] = useState(selected[0].area);
  const [interestedFor, setInterestedFor] = useState("takenLease");
  const [addOns, setAddOns] = useState(selected[0].addons);
  const [supervisorID, setSupervisorID] = useState(selected[0].ownerid);
  const [landId, setLandId] = useState(selected[0].landid);

  const { farmer_id } = useSelector((state) => state.farmer);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(area, interestedFor, addOns, supervisorID, selected);

    await instance({
      url: "/land/rent",
      method: "post",
      data: {
        rentLandDetails: [
          {
            farmerId: "AMI0158",
            farmer_id,
            landId: landId,
            ownerId: supervisorID,
          },
        ],
      },
    })
      .then((response) => {
        console.log("rentpost", response);

        const data = {
          farmerId: supervisorID,
          landId: landId,
          area: area,
          category: "takenLease",
          addons: addOns,
          ownerId: supervisorID,
          supervisorId: farmer_id,
        };
        dispatch(landActions.createLand(data));
        navigate("/land");
      })
      .catch((error) => {
        console.log("renterror", error);
      });
  };

  return (
    <Box
      className={classes.login}
      width={750}
      // border={1}
      margin="auto"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        marginLeft={10}
        // margin="auto"
        variant="h4"
        // display="flex"
        // justifyContent="center"
      >
        LandForm
      </Typography>

      <FormControl
        required
        variant="outlined"
        // sx={{ m: 1, minWidth: 230 }}
        size="small"
        color="success"
      >
        <InputLabel id="demo-simple-select-outlined-label5">
          Category
        </InputLabel>
        <Select
          size="small"
          style={{ width: 200 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={interestedFor}
          label="Category"
          onChange={(e) => setInterestedFor(e.target.value)}
        >
          <MenuItem value={"ownFarming"}>own Farming</MenuItem>
          <MenuItem value={"wasteLand"}>waste Land</MenuItem>
          <MenuItem value={"takenLease"}>taken Lease</MenuItem>
          <MenuItem value={"availableForLease"}>available For Lease</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        required
        variant="outlined"
        // sx={{ m: 1, minWidth: 230 }}
        size="small"
        color="success"
      >
        <TextField
          disabled
          size="small"
          id="outlined-number"
          label="Area*"
          type="text"
          placeholder="Area in sq.ft"
          style={{ width: 200 }}
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </FormControl>

      <FormControl
        required
        variant="outlined"
        // sx={{ m: 1, minWidth: 230 }}
        size="small"
        color="success"
      >
        <InputLabel id="demo-simple-select-outlined-label5">AddOns</InputLabel>

        <Select
          disabled
          size="small"
          style={{ width: 200 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={addOns}
          label="AddOns"
          onChange={(e) => setAddOns(e.target.value)}
        >
          <MenuItem value={"interestedToClean"}>interestedToClean</MenuItem>
          <MenuItem value={"cleanupTOFarm"}>cleanupTOFarm</MenuItem>
          <MenuItem value={""}>None</MenuItem>
        </Select>
      </FormControl>

      <>
        <TextField
          //Supervisor ID

          disabled
          style={{ width: 330 }}
          size="small"
          id="outlined-number"
          label="SupervisorID"
          type="text"
          placeholder="supervisorID"
          value={supervisorID}
          // onClick={landHandler}
          onChange={(e) => setSupervisorID(e.target.value)}
        />

        <TextField
          //Land ID

          disabled
          style={{ width: 330 }}
          size="small"
          id="outlined-number"
          label="LandID"
          type="text"
          placeholder="LandID"
          value={landId}
          // onClick={landHandler}
          onChange={(e) => setLandId(e.target.value)}
        />
      </>

      <div className={classes.login}>
        <Button variant="contained" onClick={submitHandler}>
          Submit
        </Button>
      </div>

      {/* {error && <p>Please Fill Required Details</p>}
      {table && <LandTable />} */}
    </Box>
    // <Box
    //   width={700}
    //   border={1}
    //   margin="auto"
    //   component="form"
    //   sx={{
    //     "& > :not(style)": { m: 1, width: "25ch" },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    //   <Typography
    //     margin="auto"
    //     variant="h4"
    //     display="flex"
    //     justifyContent="center"
    //   >
    //     LandForm
    //   </Typography>

    //   {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
    //   <Select
    //     size="small"
    //     style={{ width: 212 }}
    //     labelId="demo-simple-select-label"
    //     id="demo-simple-select"
    //     value={interestedFor}
    //     label="Category"
    //     onChange={(e) => setInterestedFor(e.target.value)}
    //   >
    //     <MenuItem value={"ownFarming"}>own Farming</MenuItem>
    //     <MenuItem value={"wasteLand"}>waste Land</MenuItem>
    //     <MenuItem value={"takenLease"}>taken Lease</MenuItem>
    //     <MenuItem value={"availableForLease"}>available For Lease</MenuItem>
    //   </Select>

    //   <TextField
    //     size="small"
    //     id="outlined-number"
    //     label="Area"
    //     type="text"
    //     placeholder="Area in sq.ft"
    //     value={area}
    //     style={{ width: 212 }}
    //     onChange={(e) => setArea(e.target.value)}
    //   />

    //   <FormControl>
    //     <InputLabel id="demo-simple-select-label">AddOns</InputLabel>
    //     <Select
    //       style={{ width: 212 }}
    //       size="small"
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       placeholder="Select Cleaning Process"
    //       value={addOns}
    //       label="AddOns"
    //       onChange={(e) => setAddOns(e.target.value)}
    //     >
    //       <MenuItem value={"interestedToClean"}>interestedToClean</MenuItem>
    //       <MenuItem value={"cleanupTOFarm"}>cleanupTOFarm</MenuItem>
    //       {/* <MenuItem value={"None"}>Non</MenuItem> */}
    //     </Select>
    //   </FormControl>

    //   <>
    //     <TextField
    //       //Supervisor ID

    //       style={{ width: 325 }}
    //       size="small"
    //       id="outlined-number"
    //       label="SupervisorID"
    //       type="text"
    //       placeholder="supervisorID"
    //       value={supervisorID}
    //       onChange={(e) => setSupervisorID(e.target.value)}
    //     />

    //     <TextField
    //       //Land ID

    //       style={{ width: 325 }}
    //       size="small"
    //       id="outlined-number"
    //       label="LandID"
    //       type="text"
    //       placeholder="LandID"
    //       value={landId}
    //       onChange={(e) => setLandId(e.target.value)}
    //     />
    //   </>
    //   <div className={classes.login}>
    //     <Button
    //     // backgroundColor="green"
    //     // sx={{ marginLeft: 10 }}
    //     // onClick={submitHandler}
    //     // variant="contained"
    //     // disableRipple
    //     >
    //       Submit
    //     </Button>
    //   </div>
    // </Box>
    // <Box
    //   component="form"
    //   // backgroundColor="grey"
    //   width={500}
    //   margin="auto"
    //   // marginLeft="20rem"
    //   sx={{
    //     "& .MuiTextField-root": { m: 1, width: "51ch" },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    //   <Typography variant="h4" gutterBottom marginLeft={25}>
    //     LandForm
    //   </Typography>
    //   <FormControl fullWidth style={{ marginLeft: "1rem" }}>
    //     <InputLabel id="demo-simple-select-label">Category</InputLabel>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       value={interestedFor}
    //       label="Category"
    //       onChange={(e) => setInterestedFor(e.target.value)}
    //     >
    //       <MenuItem value={"ownFarming"}>ownFarming</MenuItem>
    //       <MenuItem value={"wasteLand"}>wasteLand</MenuItem>
    //       <MenuItem value={"takenLease"}>takenLease</MenuItem>
    //       <MenuItem value={"availableForLease"}>availableForLease</MenuItem>
    //     </Select>
    //   </FormControl>

    //   <TextField
    //     id="outlined-number"
    //     label="Area"
    //     type="text"
    //     width="56ch"
    //     value={area}
    //     onChange={(e) => setArea(e.target.value)}
    //     placeholder="Area in sq.ft"
    //     InputLabelProps={{
    //       shrink: true,
    //     }}
    //     sx={{
    //       "& > :not(style)": { m: 1, width: "56ch" },
    //     }}
    //   />
    //   <FormControl fullWidth style={{ marginLeft: "1rem" }}>
    //     <InputLabel id="demo-simple-select-label">AddOns</InputLabel>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       placeholder="Select Cleaning Process"
    //       value={addOns}
    //       label="AddOns"
    //       onChange={(e) => setAddOns(e.target.value)}
    //     >
    //       <MenuItem value={"interestedToClean"}>interestedToClean</MenuItem>
    //       <MenuItem value={"cleanupTOFarm"}>cleanupTOFarm</MenuItem>
    //       <MenuItem value={"Non"}>None</MenuItem>
    //     </Select>
    //   </FormControl>

    //   <div>
    //     <TextField
    //       //Supervisor ID
    //       id="outlined-number"
    //       label="SupervisorID"
    //       type="text"
    //       placeholder="supervisorID"
    //       sx={{
    //         "& > :not(style)": { m: 1, width: "56ch" },
    //       }}
    //       InputLabelProps={{
    //         shrink: true,
    //       }}
    //       value={supervisorID}
    //       onChange={(e) => setSupervisorID(e.target.value)}
    //     />

    //     <TextField
    //       //Land ID
    //       id="outlined-number"
    //       label="LandID"
    //       type="text"
    //       placeholder="LandID"
    //       sx={{
    //         "& > :not(style)": { m: 1, width: "56ch" },
    //       }}
    //       InputLabelProps={{
    //         shrink: true,
    //       }}
    //       value={supervisorID}
    //       onChange={(e) => setLandId(e.target.value)}
    //     />
    //   </div>

    //   <BootstrapButton
    //     onClick={submitHandler}
    //     variant="contained"
    //     disableRipple
    //   >
    //     Submit
    //   </BootstrapButton>
    // </Box>
  );
};

export default SelectLand;
