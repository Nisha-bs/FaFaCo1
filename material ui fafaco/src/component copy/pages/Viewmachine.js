import { useState, useEffect } from "react";
import * as React from "react";
import { farmerActions } from "../../store/reducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Viewmachine.module.css";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import instance from "./BaseURL";
import Layout from "../Layout/Layout";

const ViewMachine = () => {
  // const { editData } = useSelector((state) => state.farmer);
  // console.log("new",editData);
  const { machine_detail } = useSelector((state) => state.farmer);
  const { farmer_id } = useSelector((state) => state.farmer);
  // console.log("machine",machine_detail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [machine, setMachine] = useState([]);
  // const Id = machine.map((item, index) => item.farmerDetails.farmerId);
  // console.log("farmerId",Id);

  useEffect(() => {
    instance
      .get(`/farmer/all`, {
        headers: {
          "Access-Control-Allow-Origin": "",
        },
      })
      .then((response) => {
        console.log(response);
        setMachine(response.data);
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
  }, []);

  var Id = farmer_id;
  const filteredmachine = machine.filter(
    (item) => item.farmerDetails.farmerId === Id
  );
  console.log("m", filteredmachine);

  const editHandler = (input, index) => {
    // const newEditMachinedata = machine.filter((item) => { item.machineDetails.map((input,id) => input === Input )});
    const newEditMachinedata = input;
    console.log("edit", newEditMachinedata);
    dispatch(farmerActions.edit_machine_data(newEditMachinedata));
    navigate("/editmachine");
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
    navigate("/machinedetails");
  };

  return (
    <Layout>
      <section className={classes.land}>
        <h1>Machine Details</h1>
        {/* <button onClick={clickHandler}>Add Machine</button> */}
        <table border={1}>
          <thead>
            <tr>
              {/* <th>S.No</th> */}
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
            {/* {machine_detail.map((input,index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{input.farmerId}</td>
                  <td>{input.type}</td>
                  <td>{input.subType}</td>
                  <td>{input.attachments}</td>
                  <td>{input.brand}</td>
                  <td>{input.count}</td>
                  <td>{input.rentalBasis}</td>
                  <td>{input.rent}</td>
                  <td><MdEdit size={15} style={{ margin:"5px" }} onClick={() => editHandler(input,index)} />
                  <AiTwotoneDelete size={15} style={{ margin:"5px" }} onClick={() => deleteHandler(index)} /></td>
                </tr>
              ))} */}
            {/* {machine_detail.map((input)=> {
                        return (
                                <tr>
                                    <td>{machine_detail.length+1}</td>
                                    <td>{input.farmerId}</td>
                                    <td>{input.type}</td>
                                    <td>{input.subType}</td>
                                    <td>{input.attachments}</td>
                                    <td>{input.brand}</td>
                                    <td>{input.count}</td>
                                    <td>{input.rentalBasis}</td>
                                    <td>{input.rent}</td>
                                    <td><MdEdit size={15} style={{ margin:"5px" }} onClick={() => editHandler(input)} /></td>
                                </tr>
                        )})} */}
            {filteredmachine.map((item, index) => {
              return item.machineDetails.map((input, id) => {
                return (
                  <tr key={machine_detail.length}>
                    {/* <td>{machine_detail.length+1}</td> */}
                    <td>{item.farmerDetails.farmerId}</td>
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
                        onClick={() => editHandler(input)}
                      />
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </section>
    </Layout>
  );
};

export default ViewMachine;
