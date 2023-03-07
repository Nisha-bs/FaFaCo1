import { useState } from "react";
import "./Signup.css";
import * as React from "react";
import instance from "./BaseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Fragment } from "react";
import SideBar from "./SideBar";
import { Toolbar } from "@mui/material";
// import { Fragment } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [credentials , setcredentials] = useState({});
  const [errorMessage, seterrorMessage] = useState(false);
  const [error, setError] = useState({});
  const [nameclicked, setNameClicked] = useState(false);
  const [passclicked, setPassClicked] = useState(false);
  const [cpassclicked, setCpassClicked] = useState(false);
  const navigate = useNavigate();

  const usernameChangeHandler = (event) => {
    event.preventDefault();
    setName(event.target.value);
    setNameClicked(true);
  };

  const newPasswordChangeHandler = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
    setPassClicked(true);
  };

  const confirmPasswordChangeHandler = (event) => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
    setCpassClicked(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setNameClicked(false);
    setPassClicked(false);
    setCpassClicked(false);
    setError({});
    seterrorMessage(false);
    const Password = newPassword.trim();
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = Password.length;
    const uppercasePassword = uppercaseRegExp.test(Password);
    const lowercasePassword = lowercaseRegExp.test(Password);
    const digitsPassword = digitsRegExp.test(Password);
    const specialCharPassword = specialCharRegExp.test(Password);
    const minLengthPassword = minLengthRegExp.test(Password);
    const validation =
      passwordLength &&
      uppercasePassword &&
      lowercasePassword &&
      digitsPassword &&
      specialCharPassword &&
      minLengthPassword;
    if (validation) {
      if (newPassword === confirmPassword) {
        // console.log(password)
        var credentials = {
          userName: name,
          password: newPassword,
        };
      } else {
        setError({ mismatch: "Password mismatched" });
      }
    } else {
      setError({
        mismatch:
          "password must contain min 8 characters atleast one upper case, one special character and numbers...",
      });
    }
    console.log("crete", credentials);
    axios
      .post(
        `https://c017-49-204-129-170.in.ngrok.io/employee/signup`,
        credentials
      )
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          console.log(response.data);
          alert("registered successfully!");
          navigate("/employee");
        }
      })
      .catch((error) => {
        const Error = error.response.data;
        console.log(Error);
        seterrorMessage(true);
        setError(Error);
      });
    console.log(error);
  };

  return (
    <Fragment>
      <SideBar />
      <Toolbar />
      <div className="signup">
        <form className="signup-form">
          <h1>SIGN UP</h1>
          <label>User Name:</label>
          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={usernameChangeHandler}
            required
          />
          {!nameclicked && errorMessage && (
            <div className="signuperror">{error.userName}</div>
          )}
          <label>New Password:</label>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={newPasswordChangeHandler}
            required
          />
          {!passclicked && errorMessage && (
            <div className="signuperror">{error.password}</div>
          )}
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            required
          />
          {!cpassclicked && errorMessage && (
            <div className="signuperror">{error.password}</div>
          )}
          <button type="button" onClick={submitHandler}>
            SIGN UP
          </button>
          {errorMessage && <div className="signuperror">{error.mismatch}</div>}
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
