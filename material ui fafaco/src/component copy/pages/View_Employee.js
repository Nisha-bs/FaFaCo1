import "./View_Employee.css";
import axios from "axios";
import instance from "./BaseURL";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Fragment } from "react";
import Layout from "../Layout/Layout";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import SideBar from "./SideBar";
import { Toolbar } from "@mui/material";

const View = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const formtoken = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    instance.get(`/employee/all`, formtoken).then((response) => {
      console.log(response.data);
      dispatch(authActions.employee(response.data));
    });
  }, []);

  const editHandler = (data) => {
    dispatch(authActions.edit(data));
    navigate("/edit_employee");
  };

  const deleteHandler = (employee) => {
    if (window.confirm("Are you sure want to delete?") === true) {
      const formtoken = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      instance
        .delete(`/employee/${employee.userName}`, formtoken)
        .then((response) => {
          console.log(response.data);
          dispatch(authActions.employee(response.data));
        });
    }
  };

  return (
    <Fragment>
      <SideBar />
      <Toolbar />
      {/* <Layout /> */}
      <div className="view-employee">
        <div className="view-container">
          <h1>Employee Details</h1>
          <table border="1" className="view-table">
            <thead>
              <tr className="view-table-head-row">
                <th>SlNo</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {user.map((employee) => (
                <tr key={employee.slNo}>
                  <td>{employee.slNo}</td>
                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td>{employee.userName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>
                    <MdEdit onClick={() => editHandler(employee)} />
                  </td>
                  <td>
                    <AiTwotoneDelete onClick={() => deleteHandler(employee)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default View;
