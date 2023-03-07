import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";

//import classes from "./LabourWorkForm.module.css";
import classes from "./LabourWorkForm.module.css";
// import Layout from "../Layout/Layout";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { farmerActions } from "../../store/reducer";
import instance from "./BaseURL";
import { cropActions } from "../../store/cropDetailsReducer";

const LabourEditForm = () => {
  const { farmer_id } = useSelector((state) => state.farmer);
  console.log("farmer_id", farmer_id.toString());
  // const {labourWork} = useSelector((state)=> state.labour)
  // console.log('labourWork', labourWork)
  const { labourEditData } = useSelector((state) => state.crop);
  console.log("labourEditData", labourEditData);
  //     const labour=
  //         {

  //             landPlowing: true,
  //             "landPlowingWithTractor": false,
  //             "fertilization": true,
  //             "weedRemoving": false,
  //             "pesticideSpraying": true,
  //             "handHarvesting": false,
  //             "cropSpanking": true,
  //             "pumpsetDuty": false,
  //             "landCleaning": true,
  //             "treeClimbing": false,
  //             "paddySteaming": true,
  //         }

  // console.log('ans', typeof labour.landPlowing )
  //   const input = [

  //             "landPlowing",
  //             "landPlowingWithTractor",
  //             "fertilization",
  //             "weedRemoving",
  //             "pesticideSpraying",
  //             "handHarvesting",
  //             "cropSpanking",
  //             "pumpsetDuty",
  //             "landCleaning",
  //             "treeClimbing",
  //             "paddySteaming",
  //             'others'

  //     ]

  // const [labour, setLabour] = useState("");
  const [landPlowing, setLandPlowing] = useState(labourEditData[0].landPlowing);
  const [landPlowingWithTractor, setLandPlowingWithTractor] = useState(
    labourEditData[0].landPlowingWithTractor
  );
  const [weedRemoving, setWeedRemoving] = useState(
    labourEditData[0].weedRemoving
  );
  const [pesticideSpraying, setPesticideSpraying] = useState(
    labourEditData[0].pesticideSpraying
  );
  const [handHarvesting, setHandHarvesting] = useState(
    labourEditData[0].handHarvesting
  );
  const [cropSpanking, setCropSpanking] = useState(
    labourEditData[0].cropSpanking
  );
  const [pumpsetDuty, setPumpsetDuty] = useState(labourEditData[0].pumpsetDuty);
  const [landCleaning, setLandCleaning] = useState(
    labourEditData[0].landCleaning
  );
  const [treeClimbing, setTreeClimbing] = useState(
    labourEditData[0].treeClimbing
  );
  const [paddySteaming, setPaddyStreaming] = useState(
    labourEditData[0].paddySteaming
  );
  const [fertilization, setFertilization] = useState(
    labourEditData[0].fertilization
  );
  const [others, setOthers] = useState(false);

  const navigate = useNavigate();

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

  const updateHandler = (event) => {
    event.preventDefault();

    instance
      .put("/labour/", {
        labourDetails: labourData,
      })
      .then((response) => {
        console.log(response);
        alert("successfully updated");
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
                checked={landPlowing}
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
                checked={landPlowingWithTractor}
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
                checked={fertilization}
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
                checked={weedRemoving}
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
                checked={pesticideSpraying}
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
                checked={handHarvesting}
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
                checked={cropSpanking}
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
                checked={pumpsetDuty}
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
                checked={landCleaning}
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
                checked={treeClimbing}
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
                checked={paddySteaming}
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
        </div>

        <button onClick={updateHandler}>update</button>
      </div>
    </Layout>
  );
};
export default LabourEditForm;
