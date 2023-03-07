import SimpleBarReact from "simplebar-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { farmerActions } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./scroll.module.css";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import Layout from "../Layout/Layout";
import instance from "./BaseURL";
import { authActions } from "../../store/auth";
import { landActions } from "../../store/landStore";
import { cropActions } from "../../store/cropDetailsReducer";
import { Fragment } from "react";
import SideBar from "./SideBar";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";

const ViewFarmer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [farmer, setFarmer] = useState([]);
  const isfarmerLogin = useSelector((state) => state.auth.isLogin);
  const { isFarmerEdit } = useSelector((state) => state.auth);
  useEffect(() => {
    instance
      .get(`/farmer/all`)
      .then((response) => {
        // console.log(response);
        setFarmer(response.data);
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

  const editHandler = (Id) => {
    const newEditdata = farmer.filter(
      (input) => input.farmerDetails.farmerId === Id
    );
    console.log(newEditdata[0].labourDetails, "edit");
    dispatch(farmerActions.edit_data(newEditdata));
    dispatch(authActions.farmerEdited());
    dispatch(authActions.farmerLogin(true));
    dispatch(farmerActions.create_id(newEditdata[0].farmerDetails.farmerId));
    dispatch(cropActions.add_crop(newEditdata[0].cropDetails));
    dispatch(
      farmerActions.create_name(newEditdata[0].farmerDetails.farmerName)
    );
    dispatch(cropActions.labour_edit_data(newEditdata[0].labourDetails));

    console.log(isFarmerEdit, isfarmerLogin, newEditdata, "farmerEdit");
    newEditdata.map((farmerDetails) => {
      // console.log(farmerDetails, "details");
      farmerDetails.landDetails.map((land) => {
        console.log("land0", land);
        dispatch(landActions.createLand(land));
      });
    });
    navigate("/profile");
    // navigate("/farmerdetails");
  };
  console.log(isFarmerEdit, "farmerEdit");

  const deleteHandler = (Id, e) => {
    if (window.confirm("Are you sure want to delete?") === true) {
      const newdata = farmer.filter(
        (input) => input.farmerDetails.farmerId === Id
      );
      var f_id;
      {
        newdata.map((input) => (f_id = input.farmerDetails.farmerId));
      }
      // console.log(f_id);
      instance
        .delete(`/farmer/id/${f_id}`)
        .then((response) => {
          console.log(response);
          // alert("Are you sure you want to delete?");
          // if (response.status === 200) {
          //   navigate("/farmerdetails");
          // }
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
    }
  };

  return (
    <Fragment>
      {/* <Layout> */}
      <SideBar />
      <Toolbar />
      {/* <Box> */}
      <div className={classes.land}>
        <div className={classes.container}>
          <h1>Farmer Details</h1>
          <SimpleBarReact
            autoHide={true}
            style={{ maxHeight: 450 }}
            className={classes.land}
          >
            <table border={1}>
              <thead>
                <tr>
                  <th>Farmer Id</th>
                  <th>Name</th>
                  <th>Father Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  {/* //                   <th>Whatsapp Number</th> */}
                  <th>Village</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmer.map((input) => (
                  <tr key={input.farmerDetails.farmerId}>
                    <td>{input.farmerDetails.farmerId}</td>
                    <td>{input.farmerDetails.farmerName}</td>
                    <td>{input.farmerDetails.fatherName}</td>
                    <td>{input.farmerDetails.age}</td>
                    <td>{input.farmerDetails.gender}</td>
                    <td>{input.farmerDetails.phoneNumber}</td>
                    {/* //                     <td>{input.farmerDetails.whatsappNumber}</td> */}
                    <td>{input.farmerDetails.village}</td>
                    <td>
                      <MdEdit
                        size={15}
                        style={{ margin: "5px" }}
                        onClick={() =>
                          editHandler(input.farmerDetails.farmerId)
                        }
                      />
                      <AiTwotoneDelete
                        size={15}
                        style={{ margin: "5px" }}
                        onClick={(e) =>
                          deleteHandler(input.farmerDetails.farmerId)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SimpleBarReact>
        </div>
      </div>
      {/* </Box> */}
    </Fragment>
  );
};

export default ViewFarmer;
