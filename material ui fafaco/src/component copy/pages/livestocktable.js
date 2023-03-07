import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { livestckk } from "../../store/gardenreducer";
import "./Gardentable.css";
import SimpleBarReact from "simplebar-react";
import classes from "./scroll.module.css";
import Layout from "../Layout/Layout";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import instance from "./BaseURL";

const Livestocktable = () => {
  const liv = useSelector((state) => state.user.livestck);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editHandle = (input, index) => {
    console.log("editing...");
    navigate("/editlivestock", { state: { input, index } });
  };
  const deleteHandle = (i) => {
    const dele = liv.filter((x, index, arr) => index !== i);
    console.log(dele);
    dispatch(livestckk([...dele]));
    instance
      .put("/livestock/", {
        livestockDetails: [...dele],
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
    navigate("/livestock");
  };

  console.log("LIVE", liv);
  const tablebody = liv.map((x, index) => (
    <tr key={index}>
      <td>{x.farmerId}</td>
      <td>{x.name}</td>
      <td>{x.breed}</td>
      <td>{x.count}</td>

      <td>{x.place}</td>
      <td>{x.season}</td>
      <td>{x.type}</td>
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
  return (
    <Layout>
      <div
        className={classes.land}
        //   className="garden"
      >
        <h1 className="login h1" style={{ fontSize: "x-large" }}>
          <b>Livestock Details</b>
        </h1>
        <button onClick={addHandle}>Add Livestock</button>
        <SimpleBarReact
          autoHide={true}
          style={{ maxHeight: 400 }}
          className={classes.land}
        >
          <table border="1" className="table">
            <thead>
              <tr className="table-head-row">
                <th>Farmer id</th>
                <th>name</th>
                <th>place</th>
                <th>type</th>
                <th>breed</th>

                <th>count</th>
                <th>season</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{tablebody}</tbody>
          </table>
        </SimpleBarReact>
      </div>
    </Layout>
  );
};

export default Livestocktable;
