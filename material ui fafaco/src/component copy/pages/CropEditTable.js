import classes from "./CropForm.module.css";
import { useState } from "react";
import * as React from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import instance from "./BaseURL";
import { cropActions } from "../../store/cropDetailsReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import CropEditTable from "./CropEditTable";
import { useEffect } from "react";
import { farmerActions } from "../../store/reducer";
// import CropEditTable from "./CropEditTable";
// import classes from './CropEditTable.module.css'
// import CropTable from "./CropTable";

const CropEditTable = () => {
  const { farmer_id } = useSelector((state) => state.farmer);
  console.log("idid", farmer_id.toString());
  const { addCrop } = useSelector((state) => state.crop);
  console.log("addCrop", addCrop);
  const { cropEditData } = useSelector((state) => state.crop);
  console.log("cropEditData", cropEditData[0], cropEditData.brand);
  // const { editData } = useSelector((state) => state.farmer);
  // console.log(editData[0].cropDetails[0].name, "cropDetails");

  // const editData = cropEditData.map((item)=> {
  //   return console.log('editData',  item.farmerId)
  // })
  //console.log('editData',  editData)
  const organicVal = cropEditData.harvestPeriod;
  console.log("organicVal", organicVal);
  //const table = []

  // const {cropData} = useSelector((state)=> state.crop)
  // console.log('cropData', cropData)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  var [inputdata, setInputData] = useState([]);

  const [farmerId, setFarmerId] = useState(cropEditData.farmerId);
  const [area, setArea] = useState(cropEditData.area);
  const [type, setType] = useState(cropEditData.type);
  const [name, setName] = useState(cropEditData.name);
  const [variety, setVariety] = useState(cropEditData.variety);
  const [brand, setBrand] = useState(cropEditData.brand);
  const [cropedAt, setCropedAt] = useState(cropEditData.croppedAt);
  const [organic, setOrganic] = useState(cropEditData.organic);
  const [seedingType, setSeedingType] = useState(cropEditData.seedingType);
  var [harvestPeriod, setHarvestPeriod] = useState(organicVal);

  // const [num, setNum] = useState();
  // const [text, setText] = useState();

  // harvestPeriod = num + " " + text;
  // console.log("t", harvestPeriod);

  const [tableDetail, setTableDetail] = useState();
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  var [areaUnit, setAreaUnit] = useState();
  var [areaNum, setAreaNum] = useState();

  var [placeholderValue, setPlaceholderValue] = useState();

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

  const editCrop = [];
  const getData = addCrop.map((item, ind) => {
    console.log("ind", ind);
    //console.log('input', Object.values (cropEditData).index)

    console.log("true", cropEditData.index);

    if (ind === cropEditData.index) {
      console.log("trueIndex", ind);
      editCrop.push(data);
      // console.log('dataeditCrop', editCrop)
    } else {
      editCrop.push(item);
    }
  });

  console.log("editCrop", editCrop);

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

    // dispatch(cropActions.add_crop([...addCrop,data]));
    console.log("data", data);

    instance
      .put("/crop/", { cropDetails: [data] })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          // dispatch(cropActions.edit_crop(editCrop));
          dispatch(cropActions.edit_crop([editCrop]));
          // addCrop.map((item, ind)=> {
          //     console.log('item', ind)
          //     //console.log('input', Object.values (cropEditData).index)

          //     console.log('true', cropEditData.index)

          //   if(ind ===  cropEditData.index){
          //     console.log('true',ind )

          //   }

          //   })
          navigate("/croptable");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className={classes.div}>
        <h1 className={classes.header}>Edit Crop Details</h1>

        <form className={classes.crop_form}>
          <label>Select land type</label>
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
          <label>Crop Name</label>
          <input
            placeholder="Enter Crop Name"
            type="text"
            value={name}
            name="name"
            onChange={(event) => setName(event.target.value)}
          />
          {/* {errMsg && name.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.name}</h5> */}
          <label>Crop Type</label>
          <input
            type="text"
            placeholder="Enter Crop type"
            value={variety}
            name="variety"
            onChange={(event) => setVariety(event.target.value)}
          />
          {/* {errMsg && variety.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.variety}</h5> */}
          <label>Brand Name</label>
          <input
            type="text"
            placeholder="Enter Brand"
            value={brand}
            name="brand"
            onChange={(event) => setBrand(event.target.value)}
          />
          {/* {errMsg && brand.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.brand}</h5> */}
          <div className={classes.area}>
            <label>Select Area Unit</label>
            <select
              value={areaUnit}
              // onChange={(event) => setAreaUnit(event.target.value)}
              onChange={areaChangeHandler}
              placeholder="Select  Unit"
            >
              <option hidden value="">
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
            <label>croppedAt(Starting Date)</label>
            <input
              type="date"
              required="required"
              placeholder="Enter Cropped at Date(Starting Date)"
              value={cropedAt}
              onChange={(event) => setCropedAt(event.target.value)}
            />
            {/* {errMsg && cropedAt.length<=0?<h5>This field may not be blank</h5> : ''} */}
            {/* <h5>{errorMsg.croppedAt}</h5> */}
          </div>

          <div className={classes.dropdown}>
            <label>Harvest Period</label>
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

              <option value="March-April<">March-April</option>
              <option value="April-May">April-May</option>
              <option value="May-June">May-June</option>
              <option value="June-July">June-July</option>
              <option value="September-October">September-October</option>
              <option value="October-November">October-November</option>
              <option value="November-December">November-December</option>
              <option value="December-January">December-January</option>
            </select>

            {/* {errMsg && harvestPeriod.length<=0?<h5>This field may not be blank</h5> : ''} */}
            {/* <h5>{errorMsg.harvestPeriod}</h5> */}
          </div>

          <label>Seeding type</label>

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
          {/* {errMsg && seedingType.length<=0?<h5>This field may not be blank</h5> : ''} */}
          {/* <h5>{errorMsg.seedingType}</h5> */}
        </form>

        <div className={classes.check}>
          <input
            type="checkbox"
            value={organic}
            name="organic"
            onChange={() => setOrganic(!organic)}
          />
          <label for="checkbox">Organic</label>
          {/* <h5>{errorMsg.organic}</h5> */}
        </div>

        <button onClick={submitHandler} className={classes.btn}>
          SUBMIT
        </button>

        <button onClick={() => navigate("/cropform")}>nxt</button>
      </div>
    </Layout>
  );
};

export default CropEditTable;
