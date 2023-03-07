import { useState } from "react";
import "./Login.css";
import instance from "./BaseURL";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState(false);
  const [nameclicked, setNameClicked] = useState(false);
  const [passclicked, setPassClicked] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameChangeHandler = (event) => {
    setName(event.target.value);
    setNameClicked(true);
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPassClicked(true);
    setPassword(event.target.value);
  };

  const data = {
    username: name,
    password: password,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    instance
      .post(`/employee/login`, data)
      .then((response) => {
        if (response.status === 200) {
          response = response.data;
          //console.log(response)
          let token = response["access"];
          //console.log(token)
          localStorage.setItem("token", token);
          localStorage.setItem("username", name);
          dispatch(authActions.login(token));
          navigate("/add_employee");
        }
      })
      .catch((error) => {
        const Error = error.response.data;
        //console.log(Error)
        seterrorMessage(true);
        setError(Error);
      });
    //setName("")
    //setPassword("")
  };

  return (
    <div className="login">
      <form className="login-form">
        <label>User Name:</label>
        <input
          type="text"
          placeholder="User Name"
          value={name}
          onChange={usernameChangeHandler}
          required
        />
        {!nameclicked && errorMessage && (
          <div className="error">{error.username}</div>
        )}
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordChangeHandler}
          required
        />
        {!passclicked && errorMessage && (
          <div className="error">{error.password}</div>
        )}
        <button type="button" onClick={submitHandler}>
          SIGN IN
        </button>
        {errorMessage && <div className="error">{error.detail}</div>}
      </form>
    </div>
  );
};

export default Login;
