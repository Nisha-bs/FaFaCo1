import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { livestckk } from "../../store/gardenreducer";
import Layout from "../Layout/Layout";
import instance from "./BaseURL";
import classes from "./garden.module.css";
const Livestock = () => {
  const dataa = useSelector((state) => state.user.livestck);
  const farmerid = useSelector((state) => state.farmer.farmer_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [breed, setBreed] = useState();
  const [count, setCount] = useState();
  const [name, setName] = useState();
  const [place, setPlace] = useState();
  const [season, setSeason] = useState();
  const [type, setType] = useState();
  const [breedError, setBreedError] = useState();
  const [countError, setCountError] = useState();
  const [nameError, setnameError] = useState();
  const [placeError, setPlaceError] = useState();
  const [seasonError, setSeasonError] = useState();
  const [typeError, setTypeError] = useState();
  const livestockSubmitHandle = (e) => {
    e.preventDefault();
    console.log("livestock...");
    const data = {
      farmerId: farmerid,
      breed: breed,
      count: count,
      name: name,
      place: place,
      season: season,
      type: type,
    };
    instance
      .post("/livestock/create", {
        livestockDetails: [data],
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("submitting LIVESTOCK DETAILS...");
          dispatch(livestckk([...dataa, data]));
          navigate("/livestocktable");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          if (error.response.data) {
            setBreedError(error.response.data.breed);
            setCountError(error.response.data.count);
            setnameError(error.response.data.name);
            setPlaceError(error.response.data.place);
            setSeasonError(error.response.data.season);
            setTypeError(error.response.data.type);
          } else {
            setBreedError(null);
            setCountError(null);
            setnameError(null);
            setPlaceError(null);
            setSeasonError(null);
            setTypeError(null);
          }
          console.log(error.response.status);
        } else if (error.request) {
          console.log("network error");
          alert("network error");
        } else {
          console.log(error);
        }
      });
  };
  return (
    <Layout>
      <div className={classes.login}>
        <form>
          <h1 className="login h1">Livestock Form</h1>
          <label>Place</label>
          <input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          ></input>
          {placeError ? (
            <span
              style={{ color: "red", display: "block", fontSize: "x-small" }}
            >
              {placeError}
            </span>
          ) : null}
          <br />
          <label>Type</label>
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          ></input>
          {typeError ? (
            <span
              style={{ color: "red", display: "block", fontSize: "x-small" }}
            >
              {typeError}
            </span>
          ) : null}
          <br />
          <label>Breed</label>
          <input
            type="text"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          ></input>
          {breedError ? (
            <span
              style={{ color: "red", display: "block", fontSize: "x-small" }}
            >
              {breedError}
            </span>
          ) : null}
          <br />
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          {nameError ? (
            <span
              style={{ color: "red", display: "block", fontSize: "x-small" }}
            >
              {nameError}
            </span>
          ) : null}
          <br />
          <label>Count</label>
          <input
            type="number"
            placeholder="Count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
          ></input>
          {countError ? (
            <span
              style={{ color: "red", display: "block", fontSize: "x-small" }}
            >
              {countError}
            </span>
          ) : null}
          <br />

          <label>Season</label>
          <input
            type="text"
            placeholder="Season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            required
          ></input>
          {seasonError ? (
            <span
              style={{ color: "red", display: "block", fontSize: "x-small" }}
            >
              {seasonError}
            </span>
          ) : null}
          <br />

          <button
            className="login-form button"
            type="submit"
            onClick={livestockSubmitHandle}
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Livestock;
