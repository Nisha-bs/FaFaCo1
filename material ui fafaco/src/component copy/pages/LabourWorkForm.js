import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import classes from "./LabourWorkForm.module.css";
// import Layout from "../Layout/Layout";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { farmerActions } from "../../store/reducer";
import instance from "./BaseURL";

const LabourWorkForm = () => {
  const dispatch = useDispatch();

  const { farmer_id } = useSelector((state) => state.farmer);
  console.log("farmer_id", farmer_id.toString());
  // const { labourWork } = useSelector((state) => state.labour);
  // console.log("labourWork", labourWork);

  const input = [
    "landPlowing",
    "landPlowingWithTractor",
    "fertilization",
    "weedRemoving",
    "pesticideSpraying",
    "handHarvesting",
    "cropSpanking",
    "pumpsetDuty",
    "landCleaning",
    "treeClimbing",
    "paddySteaming",
    "others",
  ];

  const [labour, setLabour] = useState("");
  const [landPlowing, setLandPlowing] = useState(false);
  const [landPlowingWithTractor, setLandPlowingWithTractor] = useState(false);
  const [fertilization, setFertilization] = useState(false);
  const [weedRemoving, setWeedRemoving] = useState(false);
  const [pesticideSpraying, setPesticideSpraying] = useState(false);
  const [handHarvesting, setHandHarvesting] = useState(false);
  const [cropSpanking, setCropSpanking] = useState(false);
  const [pumpsetDuty, setPumpsetDuty] = useState(false);
  const [landCleaning, setLandCleaning] = useState(false);
  const [treeClimbing, setTreeClimbing] = useState(false);
  const [paddySteaming, setPaddyStreaming] = useState(false);
  const [others, setOthers] = useState(false);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  // const[update, setUpdate] = useState(false)

  const [farmerId, setFarmerId] = useState(farmer_id);
  const [userinfo, setUserInfo] = useState({
    works: [],
    response: [],
  });

  const handleChange = (event) => {
    const { value, checked } = event.target;

    const { works } = userinfo;

    console.log("ans", value, checked);

    if (value === "landPlowing") {
      setLandPlowing(checked);
    } else if (value === "landPlowingWithTractor") {
      setLandPlowingWithTractor(checked);
    } else if (value === "fertilization") {
      setFertilization(checked);
    } else if (value === "weedRemoving") {
      setWeedRemoving(checked);
    } else if (value === "pesticideSpraying") {
      setPesticideSpraying(checked);
    } else if (value === "handHarvesting") {
      setHandHarvesting(checked);
    } else if (value === "cropSpanking") {
      setCropSpanking(checked);
    } else if (value === "pumpsetDuty") {
      setPumpsetDuty(checked);
    } else if (value === "landCleaning") {
      setLandCleaning(checked);
    } else if (value === "treeClimbing") {
      setTreeClimbing(checked);
    } else if (value === "paddySteaming") {
      setPaddyStreaming(checked);
    } else if (value === "others") {
      setOthers(checked);
    }

    if (checked) {
      setUserInfo({
        works: [...works, value],
        response: [...works, value],
      });
    } else {
      setUserInfo({
        works: works.filter((e) => e !== value),
        response: works.filter((e) => e !== value),
      });
    }
    console.log("user", userinfo.response);
    if (userinfo.response === "landPlowing") {
      console.log("tr", "true");
    }
  };

  const labourData = [
    {
      farmerId: farmerId,
      landPlowing: landPlowing,
      landPlowingWithTractor: landPlowingWithTractor,
      fertilization: fertilization,
      weedRemoving: weedRemoving,
      pesticideSpraying: pesticideSpraying,
      handHarvesting: handHarvesting,
      cropSpanking: cropSpanking,
      pumpsetDuty: pumpsetDuty,
      landCleaning: landCleaning,
      treeClimbing: treeClimbing,
      paddySteaming: paddySteaming,
    },
  ];
  console.log("labourData", labourData);

  const submitHandler = (event) => {
    event.preventDefault();

    instance
      .post("/labour/create", {
        labourDetails: labourData,
      })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          // dispatch(cropActions.add_crop([...add,data]))

          setShow(true);
          // navigate("/livestocktable");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //navigate("/livestock");
  };
  const updateHandler = (event) => {
    event.preventDefault();

    instance
      .put("/labour/", {
        labourDetails: labourData,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //navigate("/livestock");
  };

  return (
    <Layout>
      <div className={classes.labour}>
        <h1>Labour Work Details</h1>

        <div className={classes.check}>
          <div className={classes.checkbox}>
            <label>
              <input
                type="checkbox"
                name="landPlowing"
                // value={landPlowing}
                // onChange={()=> setLandPlowing(!landPlowing)}
                value="landPlowing"
                onChange={handleChange}
              />
              Land plowing{" "}
            </label>

            <label>
              <input
                type="checkbox"
                name="landPlowingWithTractor"
                //value={landPlowingWithTractor}
                //onChange={()=> setLandPlowingWithTractor(!landPlowingWithTractor)}
                value="landPlowingWithTractor"
                onChange={handleChange}
              />
              Land plowing with tractor{" "}
            </label>
            <label>
              <input
                type="checkbox"
                name="fertilization"
                //value={fertilization}
                //onChange={()=> setFertilization(!fertilization)}
                value="fertilization"
                onChange={handleChange}
              />
              Fertilization
            </label>
            <label>
              <input
                type="checkbox"
                name="weedRemoving"
                //value={weedRemoving}
                //onChange={()=> setWeedRemoving(!weedRemoving)}
                onChange={handleChange}
                value="weedRemoving"
              />
              Weed removing{" "}
            </label>

            <label>
              <input
                type="checkbox"
                name="pesticideSpraying"
                //value={pesticideSpraying}
                //onChange={()=> setPesticideSpraying(!pesticideSpraying)}
                value="pesticideSpraying"
                onChange={handleChange}
              />
              Pesticide spraying{" "}
            </label>

            <label>
              <input
                type="checkbox"
                name="handHarvesting"
                //value={handHarvesting}
                // onChange={()=> setHandHarvesting(!handHarvesting)}
                value="handHarvesting"
                onChange={handleChange}
              />
              Hand harvesting{" "}
            </label>

            <label>
              <input
                type="checkbox"
                name="cropSpanking"
                // value={cropSpanking}
                //onChange={()=> setCropSpanking(!cropSpanking)}
                onChange={handleChange}
                value="cropSpanking"
              />
              Crop spanking{" "}
            </label>

            <label>
              <input
                type="checkbox"
                name="pumpsetDuty"
                //value={pumpsetDuty}
                //onChange={()=> setPumpsetDuty(!pumpsetDuty)}
                onChange={handleChange}
                value="pumpsetDuty"
              />
              Pumpset duty{" "}
            </label>

            <label>
              <input
                type="checkbox"
                name="landCleaning"
                // value={landCleaning}
                //onChange={()=> setlandCleaning(!landCleaning)}
                value="landCleaning"
                onChange={handleChange}
              />
              Land cleaning{" "}
            </label>

            <label>
              <input
                type="checkbox"
                name="treeClimbing"
                //value={treeClimbing}
                //onChange={()=> setTreeClimbing(!treeClimbing)}
                value="treeClimbing"
                onChange={handleChange}
              />
              Tree climbing{" "}
            </label>

            <label>
              <input
                type="checkbox"
                name="paddySteaming"
                //value={paddySteaming}

                //onChange={()=> setPaddyStreaming(!paddySteaming)}
                value="paddySteaming"
                onChange={handleChange}
              />
              Paddy Steaming
            </label>

            <label>
              <input
                type="checkbox"
                name="others"
                //value={others}
                //onChange={()=> setOthers(!others)}
                onChange={handleChange}
                value="others"
              />
              Others{" "}
            </label>
          </div>

          {show && (
            <div>
              <h2>selected works:</h2>
              <textarea
                name="response"
                value={userinfo.response}
                style={{
                  height: "150px",
                  width: "400px",
                  marginLeft: "300px",
                  marginTop: "25px",
                  fontSize: "15px",
                }}
                onChange={handleChange}
              ></textarea>
            </div>
          )}
        </div>
        {/* <ul>
            <li>{userinfo}</li>
            </ul> */}

        {/* {!show ? ( */}
        <button onClick={submitHandler}>Submit</button>
        {/* ) : (
          <button onClick={updateHandler}>update</button>
        )} */}
      </div>
    </Layout>
  );
};
export default LabourWorkForm;
