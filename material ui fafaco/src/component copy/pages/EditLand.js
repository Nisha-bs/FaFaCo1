import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./land.module.css";
// import classes from "./scroll.module.css";
import Layout from "../Layout/Layout";
import instance from "./BaseURL";
import { landActions } from "../../store/landStore";
import SimpleBarReact from "simplebar-react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useEffect } from "react";

const LandTable = () => {
  const dispatch = useDispatch();
  const { farmer_id } = useSelector((state) => state.farmer);
  const navigate = useNavigate();
  const { landData } = useSelector((state) => state.land);
  const [showland, setShowLand] = useState(false);

  useEffect(() => {
    if (landData.length === [].length) {
      setShowLand(false);
    } else {
      setShowLand(true);
    }
    console.log(showland);
  }, [showland, landData]);

  var land = [];
  const removeHandler = async (id) => {
    landData.map((lands) => {
      if (lands.landId === id) {
        land = lands;
        // console.log(land, id, "lands");
      }
    });
    console.log(land, id, "lands1");

    await instance({
      url: `/land/id/${land.landId}`,
      method: "delete",
      data: {
        farmerId: land.ownerId,
        landId: land.landId,
        ownerId: land.ownerId,
      },
    })
      .then((response) => {
        console.log("deleteresponse", response);
        alert("Confirm Deletion");
        // console.log("delete", typeof land.landId);
        dispatch(landActions.deleteLand(land.landId));
        setShowLand(true);
        // navigate("/landtable");
      })
      .catch((error) => {
        console.log("deleteerror", error);
      });
  };
  const addHandler = () => {
    navigate("/land");
  };

  return (
    <Layout>
      <div className={classes.land}>
        <div className={classes.container} style={{ marginTop: "-60%" }}>
          {showland ? (
            <div>
              <h1>Land Details</h1>
              <div style={{ marginLeft: "10rem" }}>
                <button onClick={() => addHandler()}>Add Land</button>
              </div>
              <SimpleBarReact
                autoHide={true}
                style={{ maxHeight: 450 }}
                className={classes.land}
              >
                <table border="1" className="table">
                  <thead>
                    <tr className="table-head-row">
                      <th>FarmerID</th>
                      <th>LandID</th>
                      <th>OnwerID</th>
                      <th>Category</th>
                      <th>SupervisorID</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {landData.map((land, ind) => (
                      <tr key={ind}>
                        <td>{farmer_id}</td>
                        <td> {land.landId} </td>
                        <td>{land.ownerId}</td>
                        <td>{land.category}</td>
                        <td>{land.supervisorId}</td>
                        <div>
                          <AiTwotoneDelete
                            size={15}
                            style={{ margin: "5px" }}
                            onClick={() => removeHandler(land.landId)}
                          />
                          {/* <button onClick={() => removeHandler(land.landId)}>
                      Remove
                    </button> */}
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </SimpleBarReact>
            </div>
          ) : (
            <div className={classes.land}>
              <h1>No Lands Found</h1>
              <button onClick={() => addHandler()}>Add Land</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LandTable;
