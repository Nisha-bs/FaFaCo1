import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Gardenn } from "../../store/gardenreducer";
import "./Gardentable.css";
import Layout from "../Layout/Layout";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import instance from "./BaseURL";
import SimpleBarReact from "simplebar-react";
import classes from "./scroll.module.css";
const Gardentable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let gar = useSelector((state) => state.user.garden);
  //   let gar = useSelector((state) => state.farmer.editData);
  //   console.log(gar1);
  //   const gar = gar1[0].gardenDetails;
  //   console.log(gar, "gar");
  const { farmer_id } = useSelector((state) => state.farmer);

  let editHandle = (input, index) => {
    console.log("editing garden...");
    navigate("/editgarden", { state: { input, index } });
    console.log(index);
  };
  let deleteHandle = (i) => {
    const dele = gar.filter((x, index, arr) => index !== i);
    console.log(dele);
    dispatch(Gardenn([...dele]));
    instance
      .put("/garden/", {
        gardenDetails: [...dele],
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
  const addHandle = () => {
    navigate("/garden");
  };

  let tablebody = gar.map((x, index) => (
    <tr className="table-head-row" key={index}>
      {/* <td>{index + 1}</td> */}
      <td>{farmer_id}</td>
      <td>{x.area}</td>
      <td>{x.type}</td>
      <td>{x.name}</td>
      <td>{x.variety}</td>
      <td>{x.brand}</td>
      <td>{x.count}</td>
      <td>{x.organic.toString()}</td>
      <td>{x.age}</td>
      <td>{x.sellingPeriod}</td>
      <td>
        <MdEdit
          size={15}
          style={{ margin: "5px" }}
          onClick={() => editHandle(x, index)}
        />
        <AiTwotoneDelete
          size={15}
          style={{ margin: "5px" }}
          onClick={() => deleteHandle(index)}
        />
      </td>
    </tr>
  ));
  console.log(tablebody);
  return (
    <Layout>
      <div
        className={classes.land}
        // className="garden"
      >
        <h1
        // className="login h1" style={{ fontSize: "x-large" }}
        >
          <b>Garden Details</b>
        </h1>
        <div className={classes.land}>
          <button onClick={addHandle}>Add garden</button>
          <SimpleBarReact
            autoHide={true}
            style={{ maxHeight: 120 }}
            className={classes.land}
          >
            <table
              border="1"
              className="table"
              //  className="gardencontainer
            >
              <thead>
                <tr
                  className="table-head-row"
                  // className="garden tr"
                >
                  <th>farmer id</th>
                  <th>variety</th>
                  <th>type</th>
                  <th>brand</th>
                  <th>area</th>
                  <th>age</th>
                  <th>count</th>
                  <th>name</th>
                  <th>sellingPeriod</th>
                  <th>organic</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{tablebody}</tbody>
            </table>
          </SimpleBarReact>
        </div>
      </div>
    </Layout>
  );
};

export default Gardentable;
