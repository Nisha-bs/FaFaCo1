import React, { useState } from "react";
import classes from "./land.module.css";
import Scroll from "./Scroll";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LandTable from "./LandTable";
import instance from "./BaseURL";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { landActions } from "../../store/landStore";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { farmerActions } from "../../store/reducer";
import { Autocomplete, Stack, Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SideBar from "./SideBar";
import { Fragment } from "react";
import FormHelperText from "@mui/material/FormHelperText";

// import AvailableLeaseTable from "./AvailableLeaseTable";

const Land = () => {
  const navigate = useNavigate();
  // const farmerDetails = [];

  const dispatch = useDispatch();
  const { landData } = useSelector((state) => state.land);
  const { farmer_id } = useSelector((state) => state.farmer);
  // console.log(landData, "landdetails");
  const [area, setArea] = useState("");
  const [interestedFor, setInterestedFor] = useState("");
  const [addOns, setAddOns] = useState("");
  const [supervisorID, setSupervisorID] = useState("");
  const [landId, setLandId] = useState("");
  const { selectedLand } = useSelector((state) => state.land);
  // console.log(("selectedland", selectedLand));
  const { isFarmerEdit } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const farmingList = ["interestedToClean", "cleanupTOFarm", "None"];
  //check
  const [ownFarmingCheck, setOwnFarmingCheck] = useState(false);
  const [takenLeaseCheck, setTakenLeaseCheck] = useState(false);
  const [error, setError] = useState(false);
  const [table, setTable] = useState(false);
  const [apiError, setApiError] = useState("");
  const [click, setClick] = useState(false);
  // const [initial, setInitial] = useState(false);

  useEffect(() => {
    // console.log("yes", landData);
    // if (landData.length === 0) {
    //   console.log(table, "empty");
    //   setTable(false);
    // } else {
    //   setTable(true);
    //   console.log(table, "data");
    // }
    // if (click && (interestedFor.trim() || addOns.trim() || area.trim()) == "") {
    //   setError(true);
    // } else if (
    //   click &&
    //   (interestedFor.trim() && addOns.trim() && area.trim()) !== ""
    // ) {
    //   setError(false);
    // }
  }, [landData, error, interestedFor, addOns, area]);

  console.log("interestedfor", interestedFor);
  useEffect(
    (e) => {
      if (interestedFor === "") {
        setOwnFarmingCheck(true);
        setTakenLeaseCheck(false);
      } else if (
        interestedFor === "ownFarming" ||
        interestedFor === "availableForLease" ||
        interestedFor === "wasteLand"
      ) {
        setOwnFarmingCheck(true);
        setTakenLeaseCheck(false);
      } else if (interestedFor === "takenLease") {
        setOwnFarmingCheck(false);
        setTakenLeaseCheck(true);
        instance
          .get(`/farmer/all`)
          .then((response) => {
            dispatch(farmerActions.farmerAll(response.data));
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
          });
      }
    },
    [interestedFor]
  );

  // console.log("farmerid", farmer_id);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(area, interestedFor, addOns, supervisorID);
    setClick(true);

    console.log("yes", landData);
    if (landData.length === 0) {
      console.log(table, "empty");
      setTable(false);
    } else {
      setTable(true);
      console.log(table, "data");
    }
    if (click && (interestedFor.trim() || addOns.trim() || area.trim()) == "") {
      setError(true);
    } else if (
      click &&
      (interestedFor.trim() && addOns.trim() && area.trim()) !== ""
    ) {
      setError(false);
    }
    await instance({
      url: "/land/create",
      method: "post",
      data: {
        landDetails: [
          {
            farmerId: "AMI0158",
            // farmer_id,
            // farmerId: "SWE0004",
            area: area,
            category: interestedFor,
            addons: addOns,
            supervisorId: farmer_id,
          },
        ],
      },
    })
      .then((response) => {
        console.log("res", response.data);

        //DISPATCH TO LANDdATA
        const userData = {
          farmerId: farmer_id,
          landId: response.data.landId,
          area: area,
          category: interestedFor,
          addons: addOns,
          ownerId: farmer_id,
          supervisorId: farmer_id,
        };
        dispatch(landActions.createLand(userData));
        if (isFarmerEdit) {
          navigate("/editland");
        }
        setError(false);
        setArea("");
        setSupervisorID("");
        setAddOns("no");
        setInterestedFor("");
        setLandId("");
        setTable(true);
        setClick(false);
      })
      .catch((error) => {
        console.log("err", error);
        setError(true);
        setApiError(error.response.data);
      });
  };

  if (loading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  const landHandler = () => {
    instance
      .get(`/farmer/all`)
      .then((response) => {
        dispatch(farmerActions.farmerAll(response.data));
        setLoading(false);
        // setInterestedFor("takenLease");
        navigate("/selectlandtable");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <Fragment>
      <SideBar />
      <Toolbar />
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
        {/* </FormControl> */}
        {takenLeaseCheck ? (
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
        ) : (
          <FormControl>
            <TextField
              size="small"
              id="outlined-number"
              label="Area*"
              type="text"
              placeholder="Area in sq.ft"
              value={area}
              style={{ width: 200 }}
              onChange={(e) => setArea(e.target.value)}
            />
          </FormControl>
        )}
        {takenLeaseCheck ? (
          <FormControl
            required
            variant="outlined"
            // sx={{ m: 1, minWidth: 230 }}
            size="small"
            color="success"
          >
            <InputLabel id="demo-simple-select-outlined-label5">
              AddOns
            </InputLabel>

            <Select
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
        ) : (
          <FormControl required variant="outlined" size="small" color="success">
            <InputLabel id="demo-simple-select-label">AddOns</InputLabel>
            <Select
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
        )}
        {takenLeaseCheck && (
          <>
            <TextField
              //Supervisor ID
              // sx={{ m: 1, minWidth: 230 }}
              style={{ width: 330 }}
              size="small"
              id="outlined-number"
              label="SupervisorID"
              type="text"
              placeholder="supervisorID"
              value={supervisorID}
              onClick={landHandler}
              onChange={(e) => setSupervisorID(e.target.value)}
            />

            <TextField
              //Land ID
              // sx={{ m: 1, minWidth: 230 }}
              style={{ width: 330 }}
              size="small"
              id="outlined-number"
              label="LandID"
              type="text"
              placeholder="LandID"
              value={landId}
              onClick={landHandler}
              onChange={(e) => setLandId(e.target.value)}
            />
          </>
        )}
        <div className={classes.login}>
          <Button variant="contained" onClick={submitHandler}>
            Submit
          </Button>
        </div>

        {error && <p>Please Fill Required Details</p>}
        {table && <LandTable />}
      </Box>
    </Fragment>
    // <Fragment>
    //   <SideBar />
    //   <Toolbar />
    //   <Box
    //     component="form"
    //     // backgroundColor="grey"
    //     width={500}
    //     margin="auto"
    //     // marginLeft="20rem"
    //     sx={{
    //       "& .MuiTextField-root": { m: 1, width: "10ch" },
    //     }}
    //     noValidate
    //     autoComplete="off"
    //   >
    //     <Typography variant="h4" gutterBottom marginLeft={25}>
    //       LandForm
    //     </Typography>
    //     <FormControl style={{ marginLeft: "1rem" }}>
    //       <InputLabel id="demo-simple-select-label">Category</InputLabel>
    //       <Select
    //         size="small"
    //         style={{ width: 200 }}
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={interestedFor}
    //         label="Category"
    //         onChange={(e) => setInterestedFor(e.target.value)}
    //       >
    //         <MenuItem value={"ownFarming"}>own Farming</MenuItem>
    //         <MenuItem value={"wasteLand"}>waste Land</MenuItem>
    //         <MenuItem value={"takenLease"}>taken Lease</MenuItem>
    //         <MenuItem value={"availableForLease"}>available For Lease</MenuItem>
    //       </Select>
    //     </FormControl>

    //     {takenLeaseCheck ? (
    //       <TextField
    //         disabled
    //         style={{ width: 100 }}
    //         size="small"
    //         id="outlined-number"
    //         label="Area"
    //         type="number"
    //         width="25ch"
    //         placeholder="Area in sq.ft"
    //         value={area}
    //         onChange={(e) => setArea(e.target.value)}
    //         sx={{
    //           "& > :not(style)": { m: 1, width: "56ch" },
    //         }}
    //       />
    //     ) : (
    //       <TextField
    //         style={{ width: 100 }}
    //         size="small"
    //         id="outlined-number"
    //         label="Area"
    //         type="text"
    //         width="25ch"
    //         placeholder="Area in sq.ft"
    //         value={area}
    //         onChange={(e) => setArea(e.target.value)}
    //         sx={{
    //           "& > :not(style)": { m: 1, width: "56ch" },
    //         }}
    //       />
    //     )}
    //     {takenLeaseCheck ? (
    //       <FormControl fullWidth style={{ marginLeft: "1rem" }}>
    //         <InputLabel id="demo-simple-select-label">AddOns</InputLabel>
    //         <Select
    //           style={{ width: 200 }}
    //           disabled
    //           size="small"
    //           labelId="demo-simple-select-label"
    //           id="demo-simple-select"
    //           placeholder="Select Cleaning Process"
    //           value={addOns}
    //           label="AddOns"
    //           onChange={(e) => setAddOns(e.target.value)}
    //         >
    //           <MenuItem value={"interestedToClean"}>interestedToClean</MenuItem>
    //           <MenuItem value={"cleanupTOFarm"}>cleanupTOFarm</MenuItem>
    //           <MenuItem value={"Non"}>Non</MenuItem>
    //         </Select>
    //       </FormControl>
    //     ) : (
    //       <FormControl fullWidth style={{ marginLeft: "1rem" }}>
    //         <InputLabel id="demo-simple-select-label">AddOns</InputLabel>
    //         <Select
    //           style={{ width: 200 }}
    //           size="small"
    //           labelId="demo-simple-select-label"
    //           id="demo-simple-select"
    //           placeholder="Select Cleaning Process"
    //           value={addOns}
    //           label="AddOns"
    //           onChange={(e) => setAddOns(e.target.value)}
    //         >
    //           <MenuItem value={"interestedToClean"}>interestedToClean</MenuItem>
    //           <MenuItem value={"cleanupTOFarm"}>cleanupTOFarm</MenuItem>
    //           <MenuItem value={"None"}>Non</MenuItem>
    //         </Select>
    //       </FormControl>
    //     )}

    //     {takenLeaseCheck && (
    //       <div>
    //         <TextField
    //           style={{ width: 200 }}
    //           size="small"
    //           //Supervisor ID
    //           id="outlined-number"
    //           label="SupervisorID"
    //           type="text"
    //           placeholder="supervisorID"
    //           sx={{
    //             "& > :not(style)": { m: 1, width: "56ch" },
    //           }}
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           value={supervisorID}
    //           onClick={landHandler}
    //           onChange={(e) => setSupervisorID(e.target.value)}
    //         />

    //         <TextField
    //           style={{ width: 200 }}
    //           //Land ID
    //           size="small"
    //           id="outlined-number"
    //           label="LandID"
    //           type="text"
    //           placeholder="LandID"
    //           sx={{
    //             "& > :not(style)": { m: 1, width: "56ch" },
    //           }}
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           value={supervisorID}
    //           onChange={(e) => setLandId(e.target.value)}
    //         />
    //       </div>
    //     )}
    //     <BootstrapButton
    //       onClick={submitHandler}
    //       variant="contained"
    //       disableRipple
    //     >
    //       Submit
    //     </BootstrapButton>
    //     {error && <p>Please Fill Required Details</p>}
    //     {table && <LandTable />}
    //   </Box>
    //   {/* </SideBar> */}
    // </Fragment>
  );
};

export default Land;
