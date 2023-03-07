import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import * as React from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminHandler = (event) => {
    dispatch(authActions.admin());
    navigate("/admin");
  };

  const employeeHandler = (event) => {
    dispatch(authActions.staff());
    navigate("/employee");
  };

  return (
    <div className="navbar">
      <div>
        <label className="faf">FaFaCo</label>
        <br />
        <label className="navlogo"> ( Farm Farmers Consumers )</label>
      </div>
      <div className="navlink">
        <button onClick={adminHandler}>Admin</button>
        <button onClick={employeeHandler}>Staff</button>
      </div>
    </div>
  );
};

export default Navbar;
