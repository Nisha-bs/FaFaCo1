import React, { useEffect, useState } from "react";
import axios from "axios"
import classes from "./garden.module.css";
import {useDispatch, useSelector} from "react-redux";
import { Gardenn } from "../../store/gardenreducer";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import instance from "./BaseURL";

const Editgarden=()=>{
  
  const dispatch =useDispatch();
  let dataa=useSelector((state)=>state.user.garden);
  const navigate=useNavigate();
  const [farmerId, setFarmerid]=useState();
  const [area, setArea]=useState();
  const[type, setType]=useState();
  const [name, setName]=useState();
  const[variety, setVariety]=useState();
  const [brand, setBrand]=useState();
  const [count, setCount]=useState();
  const [organic, setOrganic]=useState(false);
  const [age, setAge]=useState();
  const [sellingPeriod, setSelling]=useState();
  const [areaError, setAreaError]=useState();
  const[typeError, setTypeError]=useState();
  const [nameError, setnameError]=useState();
  const [varietyError, setVarietyError]=useState();
  const [brandError,setBrandError]=useState();
  const[countError,setCountError]=useState();
  const[ageError,setageError]=useState();
  const [sellingError, setSellingError]=useState();
  const [organicError,setOrganicError]=useState();
  let data={
    "farmerId":farmerId,
    "area":area,
    "type":type,
    "name":name,
    "variety":variety,
    "brand":brand,
    "count":count,
    "organic": organic,
    "age":age,
    "sellingPeriod":sellingPeriod
  };
  let location=useLocation();
  const e=location.state.index;
  console.log(e);
  const[list, setList]=useState(e);
  const getgarden=()=>{
    setFarmerid(location.state.input.farmerId);
    setArea(location.state.input.area);
    setType(location.state.input.type);
    setName(location.state.input.name);
    setVariety(location.state.input.variety);
    setBrand(location.state.input.brand);
    setCount(location.state.input.count);
    setOrganic(location.state.input.organic);
    setAge(location.state.input.age);
    setSelling(location.state.input.sellingPeriod);

    }

  useEffect(()=>{
    getgarden();
  },[]);


  const submitHandle=(e)=>{
      e.preventDefault();
      
      console.log("editing");
      console.log(data);
      Object.freeze(dataa);
      const datacopy=[...dataa]
      datacopy[location.state.index]=data;
      dispatch(Gardenn([...datacopy]));
      instance.put("/garden/",{
        gardenDetails:[...datacopy]
      }).then((res)=>{
        if(res.status===200){
        navigate("/gardentable");
        }
      }
      
    ).catch((error) => {
      if (error.response) {
        console.log(error.response);
        if(error.response.data){
          setAreaError(error.response.data.area);
          setTypeError(error.response.data.type);
          setnameError(error.response.data.name);
          setVarietyError(error.response.data.variety);
          setBrandError(error.response.data.brand);
          setCountError(error.response.data.count);
          setageError(error.response.data.age);
          setSellingError(error.response.data.sellingPeriod);
          setOrganicError(error.response.data.organic);

        }else{
          setAreaError(null);
          setTypeError(null);
          setnameError(null);
          setVarietyError(null);
          setBrandError(null);
          setCountError(null);
          setageError(null);
          setSellingError(null);
          setOrganicError(null);
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
          <h1 className="login h1">Edit garden form</h1>
          <label>Variety</label>
          <input type="text" placeholder="Variety" value={variety} onChange={(e)=>setVariety(e.target.value)} required></input>
          {varietyError?<span style={{"color":"red","display":"block","fontSize":"x-small"}}>{varietyError}</span>:null}<br/>
          <label>Type</label>
          <input type="text" placeholder="Type" value={type} onChange={(e)=>setType(e.target.value)} required></input>
          {typeError?<span style={{"color":"red","display":"block","fontSize":"x-small"}}>{typeError}</span>:null}<br/>
          <label>Brand</label>
          <input type="text" placeholder="Brand" value={brand} onChange={(e)=>setBrand(e.target.value)} required></input>
          {brandError?<span style={{"color":"red","display":"block","fontSize":"x-small"}}>{brandError}</span>:null}<br/>
          <label>Area</label>
          <input type="number" placeholder="Area" value={area} onChange={(e)=>setArea(e.target.value)} required></input>
          {areaError? <span style={{"color":"red","display":"block","fontSize":"x-small"}}>{areaError}</span>:null}<br/>
          <label>Count</label>
          <input type="number" placeholder="Count" value={count} onChange={(e)=>setCount(e.target.value)} required></input>
          {countError?<span style={{"color":"red","display":"block","fontSize":"x-small"}}>{countError}</span>:null}<br/>
          <label>Name</label>
          <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}required></input>
          {nameError?<span style={{"color":"red","display":"block","fontSize":"x-small"}}>{nameError}</span>:null}<br/>
         
          
          
          
          <label>Age</label>
          <input type="number" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)} required></input>
          {ageError?<span style={{"color":"red","display":"block","fontSize":"x-small"}}>{ageError}</span>:null}<br/>
          <label>Selling period</label>
          <input type="text" placeholder="Selling period" value={sellingPeriod} onChange={(e)=>setSelling(e.target.value)} required></input>
          {sellingError?<span style={{"color":"red","display":"block","fontSize":"x-small"}}>{sellingError}</span>:null}<br/>
          <label>Organic: </label>
          <input type="checkbox" value={organic} onChange={(e)=>setOrganic(!organic)}></input>
          <button className="login-form button"  type="submit" onClick={submitHandle}>submit</button>
        </form >
      </div>
    </Layout>
  )
}

export default Editgarden;