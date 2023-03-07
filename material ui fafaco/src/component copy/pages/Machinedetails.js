import { useState, useEffect } from "react";
import * as React from "react";
import classes from "./Machinedetails.module.css";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { useLinkClickHandler, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { farmerActions } from "../../store/reducer";
import ViewMachine from "./Viewmachine";
import instance from "./BaseURL";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

const Machinedetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const Attachments = ["Backhoe","Bedformer","Front Dozer","Furrower","Harvester","Planter","Trailer"]
  const { create } = useSelector((state) => state.farmer);
  // console.log("bool",create);
  const { machine_detail } = useSelector((state) => state.farmer);
  const { update_machine_detail } = useSelector((state) => state.farmer);
  console.log("whole", machine_detail);
  const { farmer_id } = useSelector((state) => state.farmer);
  console.log("f", farmer_id);
  const { editData } = useSelector((state) => state.farmer);
  // const { editMachineData } = useSelector((state) => state.farmer);
  // console.log("new",editMachineData);
  var [enteredType, setEnteredType] = useState("");
  var [enteredSubtype, setEnteredSubtype] = useState("");
  var [enteredAttachment, setEnteredAttachment] = useState("");
  var [enteredBrand, setEnteredBrand] = useState("");
  var [enteredCount, setEnteredCount] = useState("");
  var [enteredDay, setEnteredDay] = useState("");
  var [enteredRent, setEnteredRent] = useState("");
  const [areaDetails, setAreaDetails] = useState("");
  const [Subtype, setSubtype] = useState([]);
  const [Attachment, setAttachment] = useState([]);
  // const [machine,setMachine] = useState([]);
  var [showLand, setShowLand] = useState(false);
  var [click, setClick] = useState(false);
  var [click1, setClick1] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [error1, setError1] = useState({});

  const selectHandler = () => {
    if (enteredType === "Mowers") {
      setSubtype([
        "Push mowers",
        "Cylinder mowers",
        "Rotary mowers",
        "Hover mowers",
        "Self-propelled mowers",
        "Bagging mowers",
        "Mulching mowers",
        "Others",
      ]);
      setAttachment([
        "Aerators",
        "Dethatchers",
        "Lawn Rollers",
        "Sprayers",
        "Spreaders",
        "Others",
      ]);
    } else if (enteredType === "Backhoe") {
      setSubtype(["Center Mount Backhoe", "Sideshift Backhoe", "Others"]);
      setAttachment([
        "Augers",
        "Brooms",
        "Buckets",
        "Couplers",
        "Grapples",
        "Hammers",
        "Rippers",
        "Snowplows",
        "Thumbs",
        "Others",
      ]);
    } else if (enteredType === "Harrow") {
      setSubtype([
        "Disc harrows",
        "Tine harrows",
        "Spring-tooth harrows",
        "Drag harrows",
        "Spike harrows",
        "Chain harrows",
        "Chain-disk harrows",
        "Others",
      ]);
      setAttachment([
        "TWO-BAR COIL TINE HARROW",
        "THREE-ROW COIL TINE HARROW",
        "THREE-ROW SPIKE DRAG HARROW",
        "FINISHING REELS",
        "REAR-TOW HITCH",
        "Others",
      ]);
    } else if (enteredType === "Cultivator") {
      setSubtype([
        "Shifting Cultivation",
        "Subsistence Farming",
        "Pastoralism",
        "Intensive Farming",
        "Others",
      ]);
      setAttachment([
        "5 Tynes Power Tiller Cultivator",
        "Rigid Cultivator",
        "Nine Tyne Cultivator",
        "Cultivator Box Type",
        "7 Tyne soil Cultivator",
        "Others",
      ]);
    } else if (enteredType === "Rake") {
      setSubtype([
        "Garden Rake",
        "Landscape Rake",
        "Thatch Rake",
        "Lawn Rake",
        "Leaf Rake",
        "Leaf Scoop Rake",
        "Shrub Rake",
        "Stone Rake",
        "Others",
      ]);
      setAttachment([
        "Edge-Pro 300",
        "Fast Connect Rear",
        "Frond & Mid",
        "Standard Hitch Rear",
        "Others",
      ]);
    } else if (enteredType === "Tractor") {
      setSubtype([
        "Utility Tractors",
        "Row Crop Tractors",
        "Garden Tractors",
        "Orchard Type Tractors",
        "Implement Carrier Tractors",
        "Others",
      ]);
      setAttachment([
        "Backhoe",
        "Bedformer",
        "Front Dozer",
        "Furrower",
        "Harvester",
        "Planter",
        "Trailer",
        "Others",
      ]);
    } else if (enteredType === "Combine Harvester") {
      setSubtype([
        "Control Combine Harvester",
        "Self-Propelled Combine Harvester",
        "Others",
      ]);
      setAttachment([
        "Cerio",
        "Vario",
        "Maxflex",
        "Convio",
        "Corio",
        "Folding cutterbars",
        "Others",
      ]);
    } else if (enteredType === "Sprayers") {
      setSubtype([
        "Knapsack Sprayer",
        "Portable Power Sprayer",
        "Knapsack Power Sprayer",
        "Mist Dust Sprayer",
        "HTP Sprayers",
        "Orchard Sprayers",
        "Others",
      ]);
      setAttachment([
        "Dribble bar",
        "Spray boom covers",
        "Telescopic lances",
        "Hand lance shrouds",
        "Vertical spray frames",
        "Others",
      ]);
    } else if (enteredType === "Chain Saw") {
      setSubtype([
        "Manual / Pocket Chainsaws",
        "Battery-powered Chainsaws",
        "Corded-electric Chainsaws",
        "Gas-powered Chainsaws",
        "Pole Chainsaws",
        "Pneumatic Chainsaws",
        "Others",
      ]);
      setAttachment(["Chainsaw stump grinder", "Bow chainsaw", "Others"]);
    } else if (enteredType === "Brush cutters") {
      setSubtype(["Handheld", "Walk-behind", "Tow-behind", "Others"]);
      setAttachment([
        "Brush Cutter Weeder Attachment",
        "Brush Cutter Trimmer Attachment",
        "Brush Cutter Tiller Attachment",
        "Brush Cutter Waterpump Attachment",
        "Brush Cutter Power Hoe Attachment",
        "Others",
      ]);
    } else if (enteredType === "Saw Mills") {
      setSubtype([
        "Band sawmill",
        "Circular sawmill",
        "Double band sawmill",
        "Horizontal sawmill",
        "Others",
      ]);
      setAttachment([
        "Clip-On Slabber",
        "Planer Blade",
        "Sander Disc",
        "Electric Winch",
        "Track Extensions",
        "Others",
      ]);
    }
  };

  useEffect(() => {
    if (enteredDay === "Area") {
      setShowLand(true);
    } else {
      setShowLand(false);
    }
  }, [enteredDay]);

  const saveHandler = async (e) => {
    e.preventDefault();

    const inputdata = {
      // id: farmer.length+1,
      farmerId: farmer_id,
      type: enteredType,
      subType: enteredSubtype,
      attachments: enteredAttachment,
      brand: enteredBrand,
      count: enteredCount,
      rentalBasis: enteredDay,
      areaDetail: areaDetails,
      rent: enteredRent,
    };
    console.log("data", inputdata);

    await instance
      .post(`/machinery/create`, { machineDetails: [inputdata] })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(farmerActions.create_machine_detail(inputdata));
          setClick1(true);
          navigate("/machinetable");
        }
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
    setClick(true);
    // dispatch(authActions.farmerLogout());
    // navigate("/viewfarmer");
  };

  const editHandler = (input, index) => {
    // const newEditMachinedata = machine.filter((item) => { item.machineDetails.map((input,id) => input === Input )});
    const newEditMachinedata = input;
    console.log("edit", newEditMachinedata);
    dispatch(farmerActions.edit_machine_data(newEditMachinedata));
    navigate("/editmachinedetails");
  };

  const deleteHandler = (i) => {
    const deletemachine = machine_detail.filter(
      (input, index, arr) => index !== i
    );
    console.log("del", deletemachine);
    dispatch(farmerActions.create_machine_detail(deletemachine));
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setClick(!click);
  };

  return (
    <Layout>
      <section className={classes.box}>
        <form>
          <h1>Machine Details</h1>
          <label style={{ fontFamily: "Times New Roman" }}>Type:</label>
          <select
            name="type"
            id="type"
            value={enteredType}
            onChange={(e) => setEnteredType(e.target.value)}
            onClick={selectHandler}
          >
            <option value="type">Type</option>
            <option value="Mowers">Mowers</option>
            <option value="Backhoe">Backhoe</option>
            <option value="Harrow">Harrow</option>
            <option value="Cultivator">Cultivator</option>
            <option value="Rake">Rake</option>
            <option value="Tractor">Tractor</option>
            <option value="Combine Harvester">Combine Harvester</option>
            <option value="Sprayers">Sprayers</option>
            <option value="Chain Saw">Chain Saw</option>
            <option value="Brush cutters">Brush cutters</option>
            <option value="Saw Mills">Saw Mills</option>
            <option value="Others">Others</option>
          </select>
          {error1 && <p>{error1.type}</p>}
          <label style={{ fontFamily: "Times New Roman" }}>Subtype:</label>
          <select
            name="subtype"
            id="subtype"
            value={enteredSubtype}
            onChange={(e) => setEnteredSubtype(e.target.value)}
          >
            <option value="subtype">Sub Type</option>
            {Subtype.map((x, y) => (
              <option key={y} value={x}>
                {x}
              </option>
            ))}
          </select>
          {error1 && <p>{error1.subType}</p>}
          <label style={{ fontFamily: "Times New Roman" }}>Attachment:</label>
          <select
            name="attach"
            id="attach"
            value={enteredAttachment}
            onChange={(e) => setEnteredAttachment(e.target.value)}
          >
            <option value="attachment">Attachments</option>
            {Attachment.map((x, y) => (
              <option key={y} value={x}>
                {x}
              </option>
            ))}
          </select>
          {error1 && <p>{error1.attachments}</p>}
          <label style={{ fontFamily: "Times New Roman" }}>Brand:</label>
          <input
            type="text"
            name="brand"
            id="brand"
            placeholder="Brand"
            value={enteredBrand}
            onChange={(e) => setEnteredBrand(e.target.value)}
          />
          {error1 && <p>{error1.brand}</p>}
          <label style={{ fontFamily: "Times New Roman" }}>Count:</label>
          <input
            type="text"
            name="count"
            id="count"
            placeholder="Count"
            value={enteredCount}
            onChange={(e) => setEnteredCount(e.target.value)}
          />
          {error1 && <p>{error1.count}</p>}
          <label style={{ fontFamily: "Times New Roman" }}>
            Rental Basics:
          </label>
          <select
            name="rentalbasics"
            id="rentalbasics"
            value={enteredDay}
            onChange={(e) => setEnteredDay(e.target.value)}
          >
            <option value="Rental Basics">Rental Basics</option>
            <option value="Hour">Hour</option>
            <option value="Day">Day</option>
            <option value="Area">Area</option>
          </select>
          {error1 && <p>{error1.rentalBasis}</p>}
          {showLand ? (
            <label style={{ fontFamily: "Times New Roman" }}>Area Size:</label>
          ) : null}
          {showLand ? (
            <input
              type="text"
              name="landdetails"
              id="landdetails"
              placeholder="Area size"
              value={areaDetails}
              onChange={(e) => setAreaDetails(e.target.value)}
            />
          ) : null}
          {/* <input type="text" name="landdetails" id="landdetails" /> */}
          <label style={{ fontFamily: "Times New Roman" }}>Rent Price:</label>
          <input
            type="number"
            name="rent"
            id="rent"
            placeholder="Rent Price"
            value={enteredRent}
            onChange={(e) => setEnteredRent(e.target.value)}
          />
          {error1 && <p>{error1.rent}</p>}
          {/* <button type="submit" onClick={editHandler}>Edit</button> */}
          <button type="submit" onClick={saveHandler}>
            Save
          </button>
        </form>
        {/* {click1 && (
          <div className={classes.land}>
            <table border={1}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Farmer Id</th>
                  <th>Machine Type</th>
                  <th>Machine Subtype</th>
                  <th>Attachment</th>
                  <th>Brand</th>
                  <th>Count</th>
                  <th>Rental Basics</th>
                  <th>Rent Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {machine_detail.map((input, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{input.farmerId}</td>
                    <td>{input.type}</td>
                    <td>{input.subType}</td>
                    <td>{input.attachments}</td>
                    <td>{input.brand}</td>
                    <td>{input.count}</td>
                    <td>{input.rentalBasis}</td>
                    <td>{input.rent}</td>
                    <td>
                      <MdEdit
                        size={15}
                        style={{ margin: "5px" }}
                        onClick={() => editHandler(input, index)}
                      />
                      <AiTwotoneDelete
                        size={15}
                        style={{ margin: "5px" }}
                        onClick={() => deleteHandler(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
        {/* </div> */}
        {/* )} */}
      </section>
    </Layout>
  );
};

export default Machinedetails;
