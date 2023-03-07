import classes from "./CropForm.module.css";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import instance from "./BaseURL";
import { cropActions } from "../../store/cropDetailsReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { farmerActions } from "../../store/reducer";
import SideBar from "./SideBar";
import { Toolbar } from "@mui/material";

const CropForm = () => {
  const { farmer_id } = useSelector((state) => state.farmer);
  console.log("idid", farmer_id.toString());
  const { addCrop } = useSelector((state) => state.crop);
  console.log("addCrop", addCrop);
  const { cropEditData } = useSelector((state) => state.crop);
  console.log("addCrop", cropEditData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [farmerId, setFarmerId] = useState(farmer_id);
  const [area, setArea] = useState();
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [variety, setVariety] = useState("");
  const [brand, setBrand] = useState("");
  const [cropedAt, setCropedAt] = useState("");
  const [organic, setOrganic] = useState(false);
  const [seedingType, setSeedingType] = useState("");
  var [harvestPeriod, setHarvestPeriod] = useState("");

  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [areaUnit, setAreaUnit] = useState();

  var [placeholderValue, setPlaceholderValue] = useState();

  const handleChange = (event) => {
    const { checked } = event.target;
    console.log("cheked", checked);
    setOrganic(checked);
  };

  const data = {
    farmerId: farmer_id,
    area: +area,
    type: type,
    name: name,
    variety: variety,
    brand: brand,
    croppedAt: cropedAt,
    organic: organic,
    seedingType: seedingType,
    harvestPeriod: harvestPeriod,
  };
  console.log("data", data);

  const areaValue = ["Acres", "Hectares", "Square Meters"];

  const areaChangeHandler = (event) => {
    setAreaUnit(event.target.value);
    areaValue.map((item) => {
      console.log("item", item);
      if (item === event.target.value) {
        setPlaceholderValue(event.target.value);
      }
    });
    console.log("true", placeholderValue);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    console.log("data", data);

    instance
      .post("/crop/create", { cropDetails: [data] })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          dispatch(cropActions.add_crop([data]));
          setShow(true);
          navigate("/croptable");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editHandler = (item, index) => {
    console.log("editinput", item.croppedAt);

    const editData = {
      index: index,
      farmerId: item.farmerId,
      area: item.area,
      type: item.type,
      name: item.name,
      variety: item.variety,
      brand: item.brand,
      croppedAt: item.croppedAt,
      organic: item.organic,
      seedingType: item.seedingType,
      harvestPeriod: item.harvestPeriod,
    };

    console.log("editData", editData);

    dispatch(cropActions.crop_edit_data(editData));

    navigate("/cropedit");
  };

  const cropTableHandler = () => {
    navigate("/croptable");
  };
  return (
    // <Layout>
    <SideBar>
      <Toolbar />
      <div className={classes.div}>
        <button onClick={cropTableHandler} style={{ marginLeft: "1rem" }}>
          Crop Table
        </button>
        <h1 style={{ display: "inline-block" }}>Add Crop Details</h1>

        <form className={classes.crop_form}>
          <label>Land Type</label>
          <select
            value={type}
            name="type"
            onChange={(event) => setType(event.target.value)}
          >
            <option hidden value="">
              Select Type of Land{" "}
            </option>
            <option value="DryLand">Dryland</option>
            <option value="Wetland">Wetland</option>
          </select>
          {/* {errMsg && type.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.type}</h5> */}
          <label style={{ marginTop: "1rem" }}>
            Crop Name
            <input
              placeholder="Enter Crop Name"
              type="text"
              value={name}
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          {/* {errMsg && name.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.name}</h5> */}
          <label>
            Crop Variety
            <input
              type="text"
              placeholder="Enter Crop type"
              value={variety}
              name="variety"
              onChange={(event) => setVariety(event.target.value)}
            />
          </label>
          {/* {errMsg && variety.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.variety}</h5> */}
          <label>
            Brand Name
            <input
              type="text"
              placeholder="Enter Brand"
              value={brand}
              name="brand"
              onChange={(event) => setBrand(event.target.value)}
            />
          </label>
          {/* {errMsg && brand.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.brand}</h5> */}
          <label>Area Unit </label>
          <div className={classes.area}>
            <select
              value={areaUnit}
              // onChange={(event) => setAreaUnit(event.target.value)}
              onChange={areaChangeHandler}
              placeholder="Select  Unit"
            >
              <option hidden value="Units">
                Select Area Units
              </option>
              <option value="Square Meters">Square Meters</option>
              <option value="Acres">Acres</option>
              <option value="Hectares">Hectares</option>
            </select>

            <input
              type="number"
              placeholder={"in" + " " + placeholderValue}
              value={area}
              name="area"
              onChange={(event) => setArea(event.target.value)}
            />
          </div>
          {/* <h5>{errorMsg.area}</h5> */}
          <div className={classes.date}>
            <label>
              Enter Cropped At(Starting Date)
              <input
                type="date"
                required="required"
                placeholder="Enter Cropped at Date(Starting Date)"
                value={cropedAt}
                onChange={(event) => setCropedAt(event.target.value)}
              />
            </label>
            {/* {errMsg && cropedAt.length<=0?<h5>This field may not be blank</h5> : ''} */}
            {/* <h5>{errorMsg.croppedAt}</h5> */}
          </div>

          <div className={classes.dropdown}>
            <label>
              Select Harvest Period
              <select
                value={harvestPeriod}
                onChange={(event) => setHarvestPeriod(event.target.value)}
                // onChange={harvestChangeHandler}
                placeholder="Select Harvest Period"
              >
                <option hidden value="">
                  Select Period
                </option>
                <option value="January-February">January-February</option>
                <option value="February-March">February-March</option>
                <option value="March-April">March-April</option>
                <option value="April-May">April-May</option>
                <option value="May-June">May-June</option>
                <option value="June-July">June-July</option>
                <option value="September-October">September-October</option>
                <option value="October-November">October-November</option>
                <option value="November-December">November-December</option>
                <option value="December-January">December-January</option>
              </select>
            </label>

            {/* {errMsg && harvestPeriod.length<=0?<h5>This field may not be blank</h5> : ''} */}
            {/* <h5>{errorMsg.harvestPeriod}</h5> */}
          </div>

          <label>
            Select Seeding Type
            <select
              value={seedingType}
              name="seedingType"
              onChange={(event) => setSeedingType(event.target.value)}
              placeholder="choose planted or seeded"
              // selected disabled
            >
              <option hidden value>
                Select Seeding Type{" "}
              </option>
              <option value="Planted">Planted</option>

              <option value="Seeded">Seeded</option>
            </select>
          </label>
          {/* {errMsg && seedingType.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.seedingType}</h5> */}
        </form>

        <div className={classes.check}>
          <input
            type="checkbox"
            value={organic}
            name="organic"
            // onChange={(e) =>setOrganic(!organic)}
            onChange={handleChange}
          />
          <label for="checkbox">Organic</label>
        </div>

        <button onClick={submitHandler} className={classes.btn}>
          SUBMIT
        </button>

        {/* <button onClick={() => navigate("/cropedit")}>nxt</button> */}
        {/* <div className={classes.crop}>
          <h2>Crop Details Table </h2>
          {/* {show &&  */}
        {/* <table>
            <tr>
              <th>Farmer Id</th>
              <th>Type</th>
              <th>Name</th>
              <th>Variety</th>
              <th>Brand</th>
              <th>Area</th>
              <th>Cropped At</th>
              <th>Seeding Type</th>
              <th>Organic</th>
              <th>harvest Period</th>
              <th>Action</th>
            </tr>
            {addCrop.map((item, index) => { */}
        {/* // console.log('item',item.farmerId)
              return (
                <tr key={index}>
                  <td>{item.farmerId}</td>
                  <td>{item.type}</td>
                  <td>{item.name}</td>
                  <td>{item.variety}</td>
                  <td>{item.brand}</td>
                  <td>{item.area}</td>
                  <td>{item.croppedAt}</td>
                  <td>{item.seedingType}</td> */}
        {/* <td>{item.organic.toString()}</td>
                  <td>{item.harvestPeriod}</td>
                  <td>
                    <button
                      onClick={() => {
                        editHandler(item, index);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })} */}
        {/* </table> */}
        {/* </div> */}
      </div>
    </SideBar>
    // </Layout>
  );
};

export default CropForm;
