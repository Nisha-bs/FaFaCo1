import React, { useState } from "react";
// import classes from "./land.module.css";
import classes from "../Style/HeaderStyle.css";
// import Scroll from "./Scroll";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import LandTable from "./LandTable";
import instance from "./BaseURL";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { landActions } from "../../store/landStore";
import { useSelector } from "react-redux";
// import Layout from "../Layout/Layout";
import { farmerActions } from "../../store/reducer";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import SideBar from "./SideBar";
import { Fragment } from "react";
import Layout from "../Components/Layout/Layout";

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
  const [addOns, setAddOns] = useState("None");
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

  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    margin: "auto",
    marginLeft: "2.5rem",
    marginRight: "1.5rem",
    width: "91%",
    marginTop: "1rem",
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });

  return (
    <Layout>
      <Fragment>
        {/* <SideBar> */}
        <Box
          component="form"
          // backgroundColor="grey"
          width={500}
          margin="auto"
          // marginLeft="20rem"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "51ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" gutterBottom marginLeft={25}>
            LandForm
          </Typography>
          <FormControl fullWidth style={{ marginLeft: "1rem" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={interestedFor}
              label="Category"
              onChange={(e) => setInterestedFor(e.target.value)}
            >
              <MenuItem value={"ownFarming"}>own Farming</MenuItem>
              <MenuItem value={"wasteLand"}>waste Land</MenuItem>
              <MenuItem value={"takenLease"}>taken Lease</MenuItem>
              <MenuItem value={"availableForLease"}>
                available For Lease
              </MenuItem>
            </Select>
          </FormControl>

          {takenLeaseCheck ? (
            <TextField
              disabled
              id="outlined-number"
              label="Area"
              type="number"
              width="56ch"
              placeholder="Area in sq.ft"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              sx={{
                "& > :not(style)": { m: 1, width: "56ch" },
              }}
            />
          ) : (
            <TextField
              id="outlined-number"
              label="Area"
              type="text"
              width="56ch"
              placeholder="Area in sq.ft"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              sx={{
                "& > :not(style)": { m: 1, width: "56ch" },
              }}
            />
          )}
          {takenLeaseCheck ? (
            <FormControl fullWidth style={{ marginLeft: "1rem" }}>
              <InputLabel id="demo-simple-select-label">AddOns</InputLabel>
              <Select
                disabled
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder="Select Cleaning Process"
                value={addOns}
                label="AddOns"
                onChange={(e) => setAddOns(e.target.value)}
              >
                <MenuItem value={"interestedToClean"}>
                  interestedToClean
                </MenuItem>
                <MenuItem value={"cleanupTOFarm"}>cleanupTOFarm</MenuItem>
                <MenuItem value={"None"}>Non</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <FormControl fullWidth style={{ marginLeft: "1rem" }}>
              <InputLabel id="demo-simple-select-label">AddOns</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder="Select Cleaning Process"
                value={addOns}
                label="AddOns"
                onChange={(e) => setAddOns(e.target.value)}
              >
                <MenuItem value={"interestedToClean"}>
                  interestedToClean
                </MenuItem>
                <MenuItem value={"cleanupTOFarm"}>cleanupTOFarm</MenuItem>
                <MenuItem value={"None"}>Non</MenuItem>
              </Select>
            </FormControl>
          )}

          {takenLeaseCheck && (
            <div>
              <TextField
                //Supervisor ID
                id="outlined-number"
                label="SupervisorID"
                type="text"
                placeholder="supervisorID"
                sx={{
                  "& > :not(style)": { m: 1, width: "56ch" },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={supervisorID}
                onClick={landHandler}
                onChange={(e) => setSupervisorID(e.target.value)}
              />

              <TextField
                //Land ID
                id="outlined-number"
                label="LandID"
                type="text"
                placeholder="LandID"
                sx={{
                  "& > :not(style)": { m: 1, width: "56ch" },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={supervisorID}
                onChange={(e) => setLandId(e.target.value)}
              />
            </div>
          )}
          <BootstrapButton
            onClick={submitHandler}
            variant="contained"
            disableRipple
          >
            Submit
          </BootstrapButton>
          {error && <p>Please Fill Required Details</p>}
          {/* {table && <LandTable />} */}
        </Box>
        {/* </SideBar> */}
      </Fragment>
    </Layout>
  );
};

export default Land;
