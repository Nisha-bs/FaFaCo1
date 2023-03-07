import { useState } from "react";
import * as React from "react";
import "./Edit_Employee.css";
import instance from "./BaseURL";
import { Fragment } from "react";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  let data = useSelector((state) => state.auth.data);
  const [firstname, setFirstname] = useState(data["firstName"]);
  const [lastname, setLastname] = useState(data["lastName"]);
  const [username, setUsername] = useState(data["userName"]);
  const [phoneNumber, setPhoneNumber] = useState(data["phoneNumber"]);
  const [email, setEmail] = useState(data["email"]);
  const navigate = useNavigate();

  const firstnameChangeHandler = (event) => {
    setFirstname(event.target.value);
  };

  const lastnameChangeHandler = (event) => {
    setLastname(event.target.value);
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const phonenumberChangeHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const editDetails = {
    first_name: firstname,
    last_name: lastname,
    username: username,
    email: email,
    contact_number: phoneNumber,
  };

  const registerHandler = (event) => {
    event.preventDefault();
    console.log(editDetails);
    const admintoken = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    instance
      .put(`/employee/${editDetails["username"]}`, editDetails, admintoken)
      .then((response) => {
        console.log(response);
        alert("employee details edited succussfully!");
        navigate("/view_employee");
      })
      .catch((error) => {
        const Error = error.response;
        console.log(Error);
      });
  };

  return (
    <Fragment>
      <Layout />
      <div className="Edit">
        <form className="Edit-form">
          <h1>Edit Employee Details</h1>
          <div className="Edit-details">
            <label>First Name:</label>
            <input
              disabled
              type="text"
              placeholder="First Name*"
              value={firstname}
              onChange={firstnameChangeHandler}
              required
            />
            <label>Last Name:</label>
            <input
              disabled
              type="text"
              placeholder="Last Name*"
              value={lastname}
              onChange={lastnameChangeHandler}
              required
            />
            <label>User Name:</label>
            <input
              disabled
              type="text"
              placeholder="User Name*"
              value={username}
              onChange={usernameChangeHandler}
              required
            />
            <label>Phone Number:</label>
            <input
              type="number"
              placeholder="Phone Number*"
              value={phoneNumber}
              onChange={phonenumberChangeHandler}
              required
            />
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email*"
              value={email}
              onChange={emailChangeHandler}
              required
            />
          </div>
          <div className="Edit-button">
            <button type="submit" onClick={registerHandler}>
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default Edit;
