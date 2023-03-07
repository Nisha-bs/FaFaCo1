import classes from "./Farmerdetails.module.css";
import { useState } from "react";
import { farmerActions } from "../../store/reducer";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout/Layout";
import axios from "axios";
import { authActions } from "../../store/auth";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CgAsterisk } from "react-icons/cg";
import instance from "./BaseURL";
import * as React from "react";
import { Fragment } from "react";
import SideBar from "./SideBar";
import { Toolbar } from "@mui/material";

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
      // console.log("update", District);
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

  // useEffect(() => {

  // },[editData]);

  const stateHandler = async (event) => {
    event.preventDefault();
    setEnteredState(event.target.value);
    await instance
      .get(`/farmer/states`)
      .then((response) => {
        console.log(response);
        if (response) {
          setState(response.data);
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
  // console.log("new",state);
  // console.log("old",enteredstate);
  for (let i = 0; i < state.length; i++) {
    if (enteredstate === state[i]) {
      var state_val = state[i];
      // console.log("up",updated);
    }
  }

  const districtHandler = async (event) => {
    event.preventDefault();
    setEnteredDistrict(event.target.value);
    await instance
      .get(`/farmer/districts/?state=${state_val}`)
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
  for (let i = 0; i < district.length; i++) {
    if (entereddistrict === district[i]) {
      var district_val = district[i];
      // console.log("up",district_val);
    }
  }
  const unionHandler = async (event) => {
    event.preventDefault();
    setEnteredUnion(event.target.value);
    await instance
      .get(`/farmer/unions/?district=${district_val}`)
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
  for (let i = 0; i < union.length; i++) {
    if (enteredunion === union[i]) {
      var union_val = union[i];
      // console.log("up",union_val);
    }
  }

  const panchayatHandler = async (event) => {
    event.preventDefault();
    setEnteredPanchayat(event.target.value);
    await instance
      .get(`/farmer/panchayats/?union=${union_val}`)
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
  for (let i = 0; i < panchayat.length; i++) {
    if (enteredpanchayat === panchayat[i]) {
      var panchayat_val = panchayat[i];
      // console.log("up",panchayat_val);
    }
  }

  const villageHandler = async (event) => {
    event.preventDefault();
    setEnteredVillage(event.target.value);
    await instance
      .get(`/farmer/villages/?panchayat=${panchayat_val}`)
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
  for (let i = 0; i < village.length; i++) {
    if (enteredvillage === village[i]) {
      var village_val = village[i];
      // console.log("up", village_val);
    }
  }

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

    console.log("data", data);

    // console.log(enteredcontact.length);
    if (enteredcontact.length === 10) {
      {
        create
          ? await instance
              .post(`/farmer/create`, { farmerDetails: data })
              .then((response) => {
                console.log("res", response);
                if (response.status === 200) {
                  dispatch(farmerActions.create_id(response.data.farmerId));
                  dispatch(authActions.farmerLogin(true));
                  dispatch(farmerActions.create_name(data.farmerName));
                  dispatch(farmerActions.create_farmer([data]));
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
    } else {
      setError1({ contact_number: "Please Enter 10-digit number" });
    }
    // dispatch(authActions.farmerLogin(true));
    // navigate("/land");
    setClick(true);
  };

  // console.log(Object.keys(error1).length);
  if (
    Object.keys(error1).length === 1 &&
    Object.keys(error1)[0] === "contact_number"
  ) {
    var error = Object.values(error1)[0];
  } else if (Object.keys(error1).length >= 1) {
    error = "Please fill the required fields";
  } else {
    error = null;
  }

  return (
    <Fragment>
      <SideBar />
      <Toolbar />
      {/* <Layout/> */}
      <section className={classes.box}>
        <form>
          <h1>Farmer Details</h1>

          <div className={classes.Addname}>
            {create ? (
              <input
                name="name"
                id="name"
                type="text"
                placeholder="FullName"
                value={enteredname}
                onChange={(e) => setEnteredName(e.target.value)}
              />
            ) : (
              <input
                name="name"
                id="name"
                type="text"
                placeholder="* FullName"
                value={enteredname}
                onChange={(e) => setEnteredName(e.target.value)}
                disabled="disabled"
              />
            )}
            {/* {click && <label>{error.farmerName}</label>} */}
            <input
              name="nickname"
              id="nickname"
              type="text"
              placeholder="* Nickname"
              value={enterednickname}
              onChange={(e) => setEnteredNickname(e.target.value)}
            />
            {/* {click && <label>{error.nickName}</label>} */}
          </div>
          <div className={classes.Addfathername}>
            {create ? (
              <input
                name="fathername"
                id="fathername"
                type="text"
                placeholder="* Father/Husband's name"
                value={enteredfathername}
                onChange={(e) => setEnteredFathername(e.target.value)}
              />
            ) : (
              <input
                name="fathername"
                id="fathername"
                type="text"
                placeholder="* Father/Husband's name"
                value={enteredfathername}
                onChange={(e) => setEnteredFathername(e.target.value)}
                disabled="disabled"
              />
            )}
            {/* {click && <label>{error.fatherName}</label>} */}
          </div>
          <div className={classes.Addname}>
            {create ? (
              <select
                name="gender"
                id="gender"
                value={enteredgender}
                onChange={(e) => setEnteredGender(e.target.value)}
              >
                <option value="Gender">* Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <select
                name="gender"
                id="gender"
                value={enteredgender}
                onChange={(e) => setEnteredGender(e.target.value)}
                disabled="dasabled"
              >
                <option value="Gender">* Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            )}
            {/* {click && <label>{error.gender}</label>} */}
            <input
              name="age"
              id="age"
              type="number"
              placeholder="* Age"
              value={enteredage}
              onChange={(e) => setEnteredAge(e.target.value)}
            />
            {/* {click && <label>{error.age}</label>} */}
            <div className={classes.Addname}>
              <input
                name="con_num"
                id="con_num"
                type="tel"
                placeholder="* Contact number"
                value={enteredcontact}
                onChange={(e) => setEnteredContact(e.target.value)}
              />
              {/* {click && <label>{error.phoneNumber}</label>} */}
              {/* {enteredcontact.trim.length !== 10 && <label></label>} */}
              <input
                name="w_num"
                id="w_num"
                type="tel"
                placeholder="Whatsapp number"
                value={enteredwhatsapp}
                onChange={(e) => setEnteredWhatsapp(e.target.value)}
              />
            </div>
            <div className={classes.Addname}></div>
            {create ? (
              <select
                name="person"
                id="person"
                value={enteredperson}
                onChange={(e) => setEnteredPerson(e.target.value)}
              >
                <option value="Local/Outsider">* Local/Outsider</option>
                <option value="Local">Local</option>
                <option value="Outsider">Outsider</option>
              </select>
            ) : (
              <select
                name="person"
                id="person"
                value={enteredperson}
                onChange={(e) => setEnteredPerson(e.target.value)}
                disabled="disabled"
              >
                <option value="Local/Outsider">* Local/Outsider</option>
                <option value="Local">Local</option>
                <option value="Outsider">Outsider</option>
              </select>
            )}
            {/* {click && <label>{error.residentialType}</label>} */}
            {create ? (
              <select
                name="state"
                id="state"
                value={enteredstate}
                onChange={(e) => setEnteredState(e.target.value)}
                onClick={stateHandler}
              >
                <option value="State">* State</option>
                {state.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="state"
                id="state"
                value={enteredstate}
                onChange={(e) => setEnteredState(e.target.value)}
                onClick={stateHandler}
                disabled="disabled"
              >
                <option value="State">{enteredstate}</option>
                {state.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            )}
            {/* {click && <label>{error.state}</label>} */}
          </div>
          <div className={classes.Addname}>
            {create ? (
              <select
                name="district"
                id="district"
                value={entereddistrict}
                onChange={(e) => setEnteredDistrict(e.target.value)}
                onClick={districtHandler}
              >
                <option value="District">* District</option>
                {district.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="district"
                id="district"
                value={entereddistrict}
                onChange={(e) => setEnteredDistrict(e.target.value)}
                onClick={districtHandler}
                disabled="disabled"
              >
                <option value="District">{entereddistrict}</option>
                {district.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            )}
            {/* {click && <label>{error.district}</label>} */}
            {create ? (
              <select
                name="union"
                id="union"
                placeholder="Nickname"
                value={enteredunion}
                onChange={(e) => setEnteredUnion(e.target.value)}
                onClick={unionHandler}
              >
                <option value="Union">* Union</option>
                {union.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="union"
                id="union"
                placeholder="Nickname"
                value={enteredunion}
                onChange={(e) => setEnteredUnion(e.target.value)}
                onClick={unionHandler}
                disabled="disabled"
              >
                <option value="Union">{enteredunion}</option>
                {union.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            )}
            {/* {click && <label>{error.Union}</label>} */}
          </div>
          <div className={classes.Addname}>
            {create ? (
              <select
                name="panchayat"
                id="panchayat"
                value={enteredpanchayat}
                onChange={(e) => setEnteredPanchayat(e.target.value)}
                onClick={panchayatHandler}
              >
                <option value="Panchayat">* Panchayat</option>
                {panchayat.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="panchayat"
                id="panchayat"
                value={enteredpanchayat}
                onChange={(e) => setEnteredPanchayat(e.target.value)}
                onClick={panchayatHandler}
                disabled="disabled"
              >
                <option value="Panchayat">{enteredpanchayat}</option>
                {panchayat.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            )}
            {/* {click && <label>{error.panchayat}</label>} */}
            {create ? (
              <select
                name="village"
                id="village"
                value={enteredvillage}
                onChange={(e) => setEnteredVillage(e.target.value)}
                onClick={villageHandler}
              >
                <option value="Village">* Village</option>
                {village.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="village"
                id="village"
                value={enteredvillage}
                onChange={(e) => setEnteredVillage(e.target.value)}
                onClick={villageHandler}
                disabled="disabled"
              >
                <option value="Village">{enteredvillage}</option>
                {village.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            )}
            {/* {click && <label>{error.village}</label>} */}
          </div>

          <div className={classes.check}>
            <div className={classes.checkbox}>
              <h4>Interested In</h4>
              <label>
                <input
                  type="checkbox"
                  id="own"
                  name="own"
                  checked={enteredOwnland}
                  value={enteredOwnland}
                  onChange={() => setEnteredOwnLand(!enteredOwnland)}
                />
                Own Land
              </label>
              <label>
                <input
                  type="checkbox"
                  id="rent"
                  name="rent"
                  checked={enteredRentland}
                  value={enteredRentland}
                  onChange={() => setEnteredRentLand(!enteredRentland)}
                />{" "}
                Rented Land
              </label>
              <label>
                <input
                  type="checkbox"
                  id="crop"
                  name="crop"
                  checked={enteredcrop}
                  value={enteredcrop}
                  onChange={() => setEnteredCrop(!enteredcrop)}
                />
                Alternate Crop
              </label>

              <label>
                <input
                  type="checkbox"
                  id="seed"
                  name="seed"
                  checked={enteredSeed}
                  value={enteredSeed}
                  onChange={() => setEnteredSeed(!enteredSeed)}
                />
                Seed Variety
              </label>
              <label>
                <input
                  type="checkbox"
                  id="seedtype"
                  name="seedtype"
                  checked={enteredSeedtype}
                  value={enteredSeedtype}
                  onChange={() => setEnteredSeedType(!enteredSeedtype)}
                />
                Single Seed
              </label>
              <label>
                <input
                  type="checkbox"
                  id="organic"
                  name="organic"
                  checked={enteredOrganic}
                  value={enteredOrganic}
                  onChange={() => setEnteredOrganic(!enteredOrganic)}
                />
                Organic
              </label>
            </div>
          </div>
          {create ? (
            <button type="submit" onClick={submitHandler}>
              Submit
            </button>
          ) : (
            <button type="submit" onClick={submitHandler}>
              Update
            </button>
          )}
          {click ? <p>{error}</p> : null}
        </form>
      </section>
    </Fragment>
  );
};

export default Farmerdetails;
