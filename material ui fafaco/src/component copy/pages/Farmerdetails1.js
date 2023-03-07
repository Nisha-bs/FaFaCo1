import classes from "./Farmerdetails.module.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { farmerActions } from "../../store/reducer";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import instance from "./BaseURL";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
// import Addfarmer from "./Addfarmer";

import { Fragment } from "react";
const Farmerdetails = () => {
  const navigate = useNavigate("/land");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(false);
  const [error1, setError1] = useState({});
  const { create } = useSelector((state) => state.farmer);
  // console.log("bool", create);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [union, setUnion] = useState([]);
  const [panchayat, setPanchayat] = useState([]);
  const [village, setVillage] = useState([]);
  var [enteredId, setEnteredId] = useState("");
  var [enteredname, setEnteredName] = useState("");
  var [enterednickname, setEnteredNickname] = useState("");
  var [enteredfathername, setEnteredFathername] = useState("");
  var [enteredgender, setEnteredGender] = useState("");
  var [enteredage, setEnteredAge] = useState("");
  var [enteredcontact, setEnteredContact] = useState("");
  var [enteredwhatsapp, setEnteredWhatsapp] = useState("");
  var [enteredperson, setEnteredPerson] = useState("");
  var [enteredstate, setEnteredState] = useState("");
  var [entereddistrict, setEnteredDistrict] = useState("");
  var [enteredunion, setEnteredUnion] = useState("");
  var [enteredpanchayat, setEnteredPanchayat] = useState("");
  var [enteredvillage, setEnteredVillage] = useState("");
  var [enteredcrop, setEnteredCrop] = useState(false);
  var [enteredRentland, setEnteredRentLand] = useState(false);
  var [enteredOwnland, setEnteredOwnLand] = useState(false);
  var [enteredOrganic, setEnteredOrganic] = useState(false);
  var [enteredSeed, setEnteredSeed] = useState(false);
  var [enteredSeedtype, setEnteredSeedType] = useState(false);
  // var [error,seterror] = useState("");
  const [click, setClick] = useState(false);
  const { editData } = useSelector((state) => state.farmer);
  const [stateopen, setStateopen] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = stateopen;

  const handleClick = (newState) => () => {
    setStateopen({ open: true, ...newState });
  };

  const handleClose = () => {
    setStateopen({ ...stateopen, open: false });
  };

  useEffect(() => {
    if (!create) {
      var Id,
        name,
        nickname,
        fathername,
        gender,
        age,
        phone,
        whatsapp,
        person,
        State,
        District,
        Union,
        Panchayat,
        Village,
        crop,
        ownland,
        leaseland,
        organic,
        seed,
        seedtype;
      {
        editData.map(
          (input) => (
            (Id = input.farmerDetails.farmerId),
            (name = input.farmerDetails.farmerName),
            (nickname = input.farmerDetails.nickName),
            (fathername = input.farmerDetails.fatherName),
            (gender = input.farmerDetails.gender),
            (age = input.farmerDetails.age),
            (phone = input.farmerDetails.phoneNumber),
            (whatsapp = input.farmerDetails.whatsappNumber),
            (person = input.farmerDetails.residentialType),
            (State = input.farmerDetails.state),
            (District = input.farmerDetails.district),
            (Union = input.farmerDetails.union),
            (Panchayat = input.farmerDetails.panchayat),
            (Village = input.farmerDetails.village),
            (crop = input.farmerDetails.altCrop),
            (ownland = input.farmerDetails.leaseOwnLand),
            (leaseland = input.farmerDetails.farmRentedLand),
            (organic = input.farmerDetails.organic),
            (seed = input.farmerDetails.seedVariety),
            (seedtype = input.farmerDetails.singleSeed)
          )
        );
      }
      // console.log(State);
      console.log("update", District);
      setEnteredId(Id);
      setEnteredName(name);
      setEnteredNickname(nickname);
      setEnteredFathername(fathername);
      setEnteredGender(gender);
      setEnteredAge(age);
      setEnteredContact(phone);
      setEnteredWhatsapp(whatsapp);
      setEnteredPerson(person);
      setEnteredState(State);
      setEnteredDistrict(District);
      setEnteredUnion(Union);
      setEnteredPanchayat(Panchayat);
      setEnteredVillage(Village);
      setEnteredCrop(crop);
      setEnteredOwnLand(ownland);
      setEnteredRentLand(leaseland);
      setEnteredOrganic(organic);
      setEnteredSeed(seed);
      setEnteredSeedType(seedtype);
    }
  }, [editData]);

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .get(`/farmer/states`)
        .then((response) => {
          // console.log("respose", response.data);
          setState(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    fetchData();
  }, []);

  const districtHandler = async (event) => {
    // event.preventDefault();
    // console.log("state",event.target.value);
    await instance
      .get(`/farmer/districts/?state=${event.target.value}`)
      .then((response) => {
        console.log(response);
        if (response) {
          setDistrict(response.data);
        }
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

  const unionHandler = async (event) => {
    await instance
      .get(`/farmer/unions/?district=${event.target.value}`)
      .then((response) => {
        console.log(response);
        if (response) {
          setUnion(response.data);
        }
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

  const panchayatHandler = async (event) => {
    await instance
      .get(`/farmer/panchayats/?union=${event.target.value}`)
      .then((response) => {
        console.log(response);
        if (response) {
          setPanchayat(response.data);
        }
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

  const villageHandler = async (event) => {
    await instance
      .get(`/farmer/villages/?panchayat=${event.target.value}`)
      .then((response) => {
        console.log(response);
        if (response) {
          setVillage(response.data);
        }
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      farmerName: enteredname,
      nickName: enterednickname,
      fatherName: enteredfathername,
      gender: enteredgender,
      age: enteredage,
      phoneNumber: enteredcontact,
      whatsappNumber: enteredwhatsapp,
      residentialType: enteredperson,
      state: enteredstate,
      district: entereddistrict,
      union: enteredunion,
      panchayat: enteredpanchayat,
      village: enteredvillage,
      altCrop: enteredcrop,
      farmRentedLand: enteredRentland,
      leaseOwnLand: enteredOwnland,
      organic: enteredOrganic,
      seedVariety: enteredSeed,
      singleSeed: enteredSeedtype,
    };
    // if(enteredcontact.length === 10) {
    console.log("data", data);
    // console.log(enteredcontact.length);
    // if(enteredcontact.length === 10) {
    {
      create
        ? await instance
            .post(`/farmer/create`, { farmerDetails: data })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                dispatch(farmerActions.create_id(response.data.farmerId));
                dispatch(authActions.farmerLogin(true));
                dispatch(farmerActions.create_name(data.farmerName));
                dispatch(farmerActions.create_farmer([data]));
                // <Stack sx={{ width: "100%" }} spacing={2}>
                //   <Alert severity="success">
                //     Farmer information was successfully added
                //   </Alert>
                // </Stack>;
                navigate("/land");
              }
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                // seterror(error.response.data);
                var errorMsg = error.response.data;
                setErrorMessage(true);
                setError1(errorMsg);
              } else if (error.request) {
                console.log("network error");
              } else {
                console.log(error);
              }
            })
        : await instance
            .put(`/farmer/id/${enteredId}`, { farmerDetails: data })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                dispatch(farmerActions.create_id(enteredId));
                dispatch(authActions.farmerLogin(true));
                dispatch(farmerActions.create_name(data.farmerName));
                navigate("/editland");
              }
              // if(response.status === 200) {
              //   create = true;
              // }
              // dispatch(farmerActions.create_id([response.data.farmerId]));
              // dispatch(authActions.farmerLogin(true));
              // navigate("/land");
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                var errorMsg = error.response.data;
                setErrorMessage(true);
                setError1(errorMsg);
              } else if (error.request) {
                console.log("network error");
              } else {
                console.log(error);
              }
            });
    }
    // }
    // else {
    //   setError1({contact_number:"Please enter a valid 10-digit number."})
    // }
    // dispatch(authActions.farmerLogin(true));
    // navigate("/land");
    setClick(true);
  };

  return (
    // <Layout>
    // <Fragment>
    <section className={classes.box}>
      {/* <Addfarmer /> */}
      <form>
        <Typography
          sx={{ m: 1, textAlign: "center" }}
          component="h1"
          variant="h5"
        >
          {create ? "Add" : "Update"} Farmer
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: 230 } }}
          noValidate
          autoComplete="off"
        ></Box>
        <TextField
          sx={{ m: 1, minWidth: 230 }}
          size="small"
          required
          name="farmername"
          id="farmername"
          label="FullName"
          autoFocus
          error={error1.farmerName !== undefined}
          helperText={error1.farmerName}
          value={enteredname}
          onChange={(e) => setEnteredName(e.target.value)}
          color="success"
        />
        <TextField
          sx={{ m: 1, minWidth: 230 }}
          size="small"
          required
          name="nickname"
          id="nickname"
          label="NickName"
          value={enterednickname}
          onChange={(e) => setEnteredNickname(e.target.value)}
          color="success"
          error={error1.nickName !== undefined}
          helperText={error1.nickName}
        />
        <TextField
          sx={{ m: 1, minWidth: 475 }}
          required
          name="fathername"
          id="fathername"
          label="Father Name/Husband Name"
          size="small"
          value={enteredfathername}
          onChange={(e) => setEnteredFathername(e.target.value)}
          color="success"
          error={error1.fatherName !== undefined}
          helperText={error1.fatherName}
        />
        <FormControl
          required
          color="success"
          variant="outlined"
          sx={{ m: 1, minWidth: 230 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            name="gender"
            id="gender"
            value={enteredgender}
            onChange={(e) => setEnteredGender(e.target.value)}
            label="Gender"
            error={error1.gender !== undefined}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
          <FormHelperText>{error1.gender}</FormHelperText>
        </FormControl>
        <TextField
          sx={{ m: 1, minWidth: 230 }}
          size="small"
          required
          label="Age"
          id="age"
          name="age"
          value={enteredage}
          onChange={(e) => setEnteredAge(e.target.value)}
          color="success"
          error={error1.age !== undefined}
          helperText={error1.age}
        />
        <TextField
          sx={{ m: 1, minWidth: 230 }}
          size="small"
          required
          label="Phone Number"
          id="contact"
          value={enteredcontact}
          onChange={(e) => setEnteredContact(e.target.value)}
          color="success"
          error={error1.phoneNumber !== undefined}
          helperText={error1.phoneNumber}
        />
        <TextField
          sx={{ m: 1, minWidth: 230 }}
          size="small"
          label="Whatsapp Number"
          name="whatsapp"
          id="whatsapp"
          value={enteredwhatsapp}
          onChange={(e) => setEnteredWhatsapp(e.target.value)}
          color="success"
        />
        <FormControl
          required
          color="success"
          variant="outlined"
          sx={{ m: 1, minWidth: 230 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-outlined-label1">
            Local/Outsider
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label1"
            id="person"
            value={enteredperson}
            onChange={(e) => setEnteredPerson(e.target.value)}
            label="Local/Outsider"
            error={error1.residentialType !== undefined}
          >
            <MenuItem value="Local">Local</MenuItem>
            <MenuItem value="Outsider">Outsider</MenuItem>
          </Select>
          <FormHelperText>{error1.residentialType}</FormHelperText>
        </FormControl>
        <FormControl
          required
          color="success"
          variant="outlined"
          sx={{ m: 1, minWidth: 230 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-outlined-label2">State</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label2"
            id="state"
            value={enteredstate}
            onChange={(e) => {
              setEnteredState(e.target.value);
              districtHandler(e);
            }}
            label="State"
            error={error1.state !== undefined}
          >
            {state.map((state, index) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error1.state}</FormHelperText>
        </FormControl>
        <FormControl
          required
          color="success"
          variant="outlined"
          sx={{ m: 1, minWidth: 230 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-outlined-label3">
            District
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label3"
            id="district"
            value={entereddistrict}
            onChange={(e) => {
              setEnteredDistrict(e.target.value);
              unionHandler(e);
            }}
            label="District"
            error={error1.district !== undefined}
          >
            {district.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error1.district}</FormHelperText>
        </FormControl>
        <FormControl
          required
          color="success"
          variant="outlined"
          sx={{ m: 1, minWidth: 230 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-outlined-label4">Union</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label4"
            id="union"
            value={enteredunion}
            onChange={(e) => {
              setEnteredUnion(e.target.value);
              panchayatHandler(e);
            }}
            label="Union"
            error={error1.union !== undefined}
          >
            {union.map((state) => (
              <MenuItem key={state} value={state} onClick={districtHandler}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error1.union}</FormHelperText>
        </FormControl>
        <FormControl
          required
          variant="outlined"
          sx={{ m: 1, minWidth: 230 }}
          size="small"
          color="success"
        >
          <InputLabel id="demo-simple-select-outlined-label5">
            Panchayat
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label5"
            id="panchayat"
            value={enteredpanchayat}
            onChange={(e) => {
              setEnteredPanchayat(e.target.value);
              villageHandler(e);
            }}
            label="Panchayat"
            error={error1.panchayat !== undefined}
          >
            {panchayat.map((state) => (
              <MenuItem key={state} value={state} onClick={districtHandler}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error1.panchayat}</FormHelperText>
        </FormControl>
        <FormControl
          required
          variant="outlined"
          sx={{ m: 1, minWidth: 230 }}
          size="small"
          color="success"
        >
          <InputLabel id="demo-simple-select-outlined-label6">
            Village
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label6"
            id="village"
            value={enteredvillage}
            onChange={(e) => setEnteredVillage(e.target.value)}
            label="Village"
            error={error1.village !== undefined}
          >
            {village.map((state) => (
              <MenuItem key={state} value={state} onClick={districtHandler}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error1.village}</FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          sx={{ m: 1, minWidth: 475 }}
          size="small"
          onClick={submitHandler}
        >
          {create ? "Submit" : "Update"}
        </Button>
      </form>
    </section>
    // </Fragment>
    // </Layout>
  );
};

export default Farmerdetails;
