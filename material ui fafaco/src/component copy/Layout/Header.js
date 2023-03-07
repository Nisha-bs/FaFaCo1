import "./Header.css";
import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { GiFarmer } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
// import { Fragment } from "react";
import { farmerActions } from "../../store/reducer";
import EditMachinedetails from "../pages/EditMachinedetails";
import { cropActions } from "../../store/cropDetailsReducer";
import { gardenLogout } from "../../store/gardenreducer";
import { landActions } from "../../store/landStore";
//import { Router } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isauth = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const { isLogin } = useSelector((state) => state.auth);
  console.log("farmer", isLogin);
  const { isFarmerEdit } = useSelector((state) => state.auth);
  const { farmername } = useSelector((state) => state.farmer);
  console.log(farmername, "farmer");
  const { farmer_id } = useSelector((state) => state.farmer);
  const username = localStorage.getItem("username");

  const addEmployeeHandler = (event) => {
    event.preventDefault();
    navigate("/add_employee");
  };

  const viewEmployeeHandler = (event) => {
    event.preventDefault();
    navigate("/view_employee");
  };

  const addFarmerHandler = (event) => {
    navigate("/farmerdetails");
    event.preventDefault();
  };

  const viewFarmerHandler = (event) => {
    event.preventDefault();

    navigate("/viewfarmer");
  };
  const logoutHandler = (event) => {
    dispatch(authActions.logout());
    dispatch(authActions.farmerLogout());
    //empty redux
    dispatch(authActions.authLogout());
    dispatch(cropActions.cropLogout());
    dispatch(gardenLogout());
    dispatch(landActions.landLogout());
    dispatch(farmerActions.farmerLogout());
    console.log("far", isLogin);
    localStorage.clear();
    navigate("/");
  };

  const addLandHandler = () => {
    navigate("/land");
  };
  const addCropHandler = () => {
    navigate("/cropform");
  };
  const addGardenHandler = () => {
    navigate("/garden");
  };
  const addBuySell = () => {
    navigate("/buysell");
  };
  const addLiveStockHandler = () => {
    navigate("/livestock");
  };
  const addMachineHandler = () => {
    navigate("/machinedetails");
  };
  const addLabourHandler = () => {
    navigate("/labour");
  };

  const viewEditFarmerHandler = (event) => {
    event.preventDefault();

    dispatch(cropActions.cropLogout());
    dispatch(gardenLogout());
    dispatch(landActions.landLogout());
    dispatch(farmerActions.farmerLogout());
    dispatch(authActions.farmerLogout());
    dispatch(authActions.farmerEditLogout());
    navigate("/viewfarmer");
    console.log(isLogin, "show");
  };
  const editFarmerHandler = () => {
    navigate("/farmerdetails");
  };
  const editLandHandler = () => {
    navigate("/editland");
  };
  const editedMachineHandler = () => {
    navigate("/machinetable");
  };
  const editGardenHandler = () => {
    navigate("/gardentable");
  };
  const editLivestockHandler = () => {
    navigate("/livestocktable");
  };
  const editCropHandler = () => {
    navigate("/croptable");
  };
  const editLabourHandler = () => {
    navigate("/editlabour");
  };

  return (
    <div>
      {!role && (
        <header className="header">
          <div className="header-front">
            <ul>
              <GiFarmer style={{ color: "white" }} />
              <NavLink to="/login" className="active">
                FaFaCo
              </NavLink>
            </ul>
          </div>
          {(isFarmerEdit || isLogin) && (
            <p>
              Welcome {farmername}({farmer_id})
            </p>
          )}
          <div className="header-back">
            {!isauth && (
              <nav>
                <ul>
                  <li>
                    <NavLink to="/signup" className="active">
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/employee" className="active">
                      Login
                    </NavLink>
                  </li>
                </ul>
              </nav>
            )}

            {isauth && (
              <nav>
                <ul className="header-button">
                  <CgProfile className="icon" /> <button>{username}</button>
                  <button type="submit" onClick={logoutHandler}>
                    Logout
                  </button>
                </ul>
              </nav>
            )}
          </div>
        </header>
      )}
      {role && (
        <header className="header">
          <div className="header-front">
            <ul>
              <GiFarmer style={{ color: "white" }} />
              <NavLink to="/login" className="active">
                FaFaCo
              </NavLink>
            </ul>
          </div>
          {(isFarmerEdit || isLogin) && (
            <p>
              Welcome {farmername}({farmer_id})
            </p>
          )}
          <div className="header-back">
            {!isauth && (
              <nav>
                <ul>
                  <li>
                    <NavLink to="/admin" className="active">
                      Login
                    </NavLink>
                  </li>
                </ul>
              </nav>
            )}

            {isauth && (
              <nav>
                <ul className="header-button">
                  <CgProfile className="icon" />
                  <button>{username}</button>
                  <button type="submit" onClick={logoutHandler}>
                    Logout
                  </button>
                </ul>
              </nav>
            )}
          </div>
        </header>
      )}
      <div>
        <div className="home1">
          {!isLogin && isauth && role && (
            <div className="employee">
              <ul>
                <li>
                  <button type="submit" onClick={addEmployeeHandler}>
                    Add Employee
                  </button>
                </li>
                <li>
                  <button type="submit" onClick={viewEmployeeHandler}>
                    View Employee
                  </button>
                </li>
                <li>
                  <button type="submit" onClick={addFarmerHandler}>
                    Add Farmer
                  </button>
                </li>
                <li>
                  <button type="submit" onClick={viewFarmerHandler}>
                    View Farmer
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* {!isfarmerLogin && isauth && !role && (
            <div className="employee">
              <ul>
                <li>
                  <button type="submit" onClick={editFarmerHandler}>
                    Edit Farmer
                  </button>
                </li>
                <li>
                  <button type="submit" onClick={viewFarmerHandler}>
                    View Farmer
                  </button>
                </li>
              </ul>
            </div>
          )} */}
          {isauth && (role || !role) && isLogin && (
            <div className="employee">
              <ul>
                {!isFarmerEdit ? (
                  <ul>
                    <li>
                      <button type="submit" onClick={addLandHandler}>
                        Add Land
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={addCropHandler}>
                        Add Crop
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={addGardenHandler}>
                        Add Garden
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={addLabourHandler}>
                        Add Labour
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={addLiveStockHandler}>
                        Add LiveStock
                      </button>
                    </li>

                    <li>
                      <button type="submit" onClick={addMachineHandler}>
                        Add Machine
                      </button>
                    </li>
                  </ul>
                ) : (
                  <div>
                    <li>
                      <button type="submit" onClick={viewEditFarmerHandler}>
                        View Farmer
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={editFarmerHandler}>
                        Edit Farmer
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={editLandHandler}>
                        Edit Land
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={editCropHandler}>
                        Edit Crop
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={editGardenHandler}>
                        Edit Garden
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={editLabourHandler}>
                        Edit Labour
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={editLivestockHandler}>
                        Edit LiveStock
                      </button>
                    </li>
                    <li>
                      <button type="submit" onClick={editedMachineHandler}>
                        Edit Machine
                      </button>
                    </li>
                  </div>
                )}

                {/* <li>
                  <button type="submit" onClick={addBuySell}>
                    Buy & Sell
                  </button>
                </li> */}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
