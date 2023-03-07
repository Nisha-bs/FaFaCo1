import axios from "axios"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { livestckk } from "../../store/gardenreducer";
import Layout from "../Layout/Layout";
import instance from "./BaseURL";
import classes from "./garden.module.css";
const EditLivestock=()=>{
    let dataa=useSelector((state)=>state.user.livestck)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [farmerid, setFarmerid]=useState();
    const [breed, setBreed]=useState();
    const [count, setCount]=useState();
    const [name, setName]=useState();
    const [place, setPlace]=useState();
    const [season, setSeason]=useState();
    const [type, setType]=useState();
    const [breedError, setBreedError]=useState();
    const[countError,setCountError]=useState();
    const [nameError, setnameError]=useState();
    const [placeError, setPlaceError]=useState();
    const [seasonError, setSeasonError]=useState();
    const[typeError, setTypeError]=useState();
    
    const location=useLocation();
    console.log(location);
    const e=(location.state.input);
    const getLivestock=()=>{
        setFarmerid(e.farmerId);
        
        setBreed(e.breed);
        setCount(e.count);
        setName(e.name);
        setPlace(e.place);
        setSeason(e.season);
        setType(e.type);
    };
    useEffect(()=>{
        getLivestock();
    },[]);
    let data={
        "farmerId":farmerid,
        "breed":breed,
        "count":count,
        "name":name,
        "place":place,
        "season":season,
        "type":type
    };
    const editHandle=(e)=>{
            e.preventDefault();
            console.log("editing");
            console.log(data);
            Object.freeze(dataa);
            let datacopy=[...dataa];
            datacopy[location.state.index]=data;
            dispatch(livestckk([...datacopy]));
            instance.put("/livestock/",{
                livestockDetails:[...datacopy]
            }).then((res)=>{
                if(res.status===200){
                    navigate("/livestocktable");
                }
            }
            ).catch((error) => {
                if (error.response) {
                  console.log(error.response);
                  if(error.response.data){
                    setBreedError(error.response.data.breed);
                    setCountError(error.response.data.count);
                    setnameError(error.response.data.name);
                    setPlaceError(error.response.data.place);
                    setSeasonError(error.response.data.season);
                    setTypeError(error.response.data.type);
                  }
                  else{
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
        }
    return(
        <Layout>
            <div className={classes.login}>
                <form>
                    <h1 className="login h1">Edit livestock form</h1>
                    <label>Place:</label>
                    <input type="text" placeholder="Place" value={place} onChange={(e)=>setPlace(e.target.value)} required></input>
                    {placeError?<span className="error">{placeError}</span>:null}<br/>
                    <label>Type</label>
                    <input type="text" placeholder="Type" value={type} onChange={(e)=>setType(e.target.value)} required></input>
                    {typeError?<span className="error">{typeError}</span>:null}<br/>
                    <label>Breed</label>
                    <input type="text" placeholder="Breed" value={breed} onChange={(e)=>setBreed(e.target.value)} required></input>
                    {breedError?<span className="error">{breedError}</span>:null}<br/>
                    <label>Name:</label>
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required></input>
                    {nameError?<span className="error">{nameError}</span>:null}<br/>
                    <label>Count</label>
                    <input type="number" placeholder="Count" value={count} onChange={(e)=>setCount(e.target.value)} required></input>
                    {countError?<span className="error">{countError}</span>:null}<br/>
                    
                    
                    <label>Season</label>
                    <input type="text" placeholder="Season" value={season} onChange={(e)=>setSeason(e.target.value)} required></input>
                    {seasonError?<span className="error">{seasonError}</span>:null}<br/>
                   
                    <button className="login-form button" type="submit" onClick={editHandle}>Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default EditLivestock;