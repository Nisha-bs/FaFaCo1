import { useState } from "react";
import * as React from "react";
import "./Add_Employee.css";
import instance from "./BaseURL";
import { Fragment } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

const Add = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState("");
  const [errorMessage, seterrorMessage] = useState(false);
  const [error, setError] = useState({});
  const [fnameclicked, setFnameClicked] = useState(false);
  const [unameclicked, setUnameClicked] = useState(false);
  const [phonenumberclicked, setPhonenumberClicked] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);

  const navigate = useNavigate();
  const firstnameChangeHandler = (event) => {
    event.preventDefault();
    setFirstname(event.target.value);
    setFnameClicked(true);
  };

  const lastnameChangeHandler = (event) => {
    event.preventDefault();
    setLastname(event.target.value);
  };

  const usernameChangeHandler = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
    setUnameClicked(true);
  };

  const phonenumberChangeHandler = (event) => {
    event.preventDefault();
    setPhonenumberClicked(true);
    setPhoneNumber(event.target.value);
  };

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    setEmailClicked(true);
  };

  const details = {
    first_name: firstname,
    last_name: lastname,
    username: username,
    email: email,
    contact_number: phoneNumber,
  };

  const registerHandler = (event) => {
    event.preventDefault();
    setUnameClicked(false);
    setPhonenumberClicked(false);
    setEmailClicked(false);
    setError({});
    seterrorMessage(false);
    const admintoken = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    instance
      .post(`/employee/create`, details, admintoken)
      .then((response) => {
        if (response.status === 201) {
          setFirstname("");
          setLastname("");
          setUsername("");
          setPhoneNumber("");
          setEmail("");
          setError("");
          alert("added successfully!");
        }
        navigate("/view_employee");
      })
      .catch((error) => {
        const Error = error.response.data;
        console.log(Error);
        seterrorMessage(true);
        setError(Error);
      });
  };

  return (
    <Fragment>
      <SideBar />
      <Toolbar />
      <Box>
        {/* <Layout /> */}
        <div className="Add">
          <form className="Add-form">
            <h1>Add Employee</h1>
            <div className="Add-details">
              <label>First Name*:</label>
              <input
                type="text"
                placeholder="First Name*"
                value={firstname}
                onChange={firstnameChangeHandler}
                required
              />
              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={lastnameChangeHandler}
              />
              {!fnameclicked && errorMessage && (
                <div className="error">{error.first_name}</div>
              )}
              <label>User Name*:</label>
              <input
                type="text"
                placeholder="User Name*"
                value={username}
                onChange={usernameChangeHandler}
                required
              />
              {!unameclicked && errorMessage && (
                <div className="error">{error.username}</div>
              )}
              <label>Phone Number*:</label>
              <input
                type="number"
                placeholder="Phone Number*"
                value={phoneNumber}
                onChange={phonenumberChangeHandler}
                required
              />
              {!phonenumberclicked && errorMessage && (
                <div className="error">{error.contact_number}</div>
              )}
              <label>Email:</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={emailChangeHandler}
              />
              {!emailClicked && errorMessage && (
                <div className="error">{error.email}</div>
              )}
            </div>
            <div className="Add-button">
              <button type="submit" onClick={registerHandler}>
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Fragment>
  );
};
export default Add;
