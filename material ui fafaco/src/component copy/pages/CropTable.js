import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cropActions } from "../../store/cropDetailsReducer";
import classes from "./scroll.module.css";
import Layout from "../Layout/Layout";
import SimpleBarReact from "simplebar-react";
import { MdEdit } from "react-icons/md";

const CropTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addCrop } = useSelector((state) => state.crop);
  console.log("addCrop", addCrop[0][0]);
  const addcrop1 = addCrop[0];
  const { farmer_id } = useSelector((state) => state.farmer);

  const editHandler = (item, index) => {
    console.log("editinput", item.croppedAt);

    const editData = {
      index: index,
      farmerId: item.farmerId,
      area: item.area,
      type: item.type,
      name: item.name,
      variety: item.variety,
      brand: item.brand,
      croppedAt: item.croppedAt,
      organic: item.organic,
      seedingType: item.seedingType,
      harvestPeriod: item.harvestPeriod,
    };

    console.log("editData", editData);

    dispatch(cropActions.crop_edit_data(editData));

    navigate("/editcrop");
  };
  return (
    <div>
      <Layout>
        <div className={classes.land}>
          <h1>Crop Details Table </h1>
          <button onClick={() => navigate("/cropform")}>Add crop</button>
          {/* {show &&  */}
          <SimpleBarReact
            autoHide={true}
            style={{ maxHeight: 400 }}
            className={classes.land}
          >
            <table border="1" className="table">
              <tr className="table-head-row">
                {/* <th>Farmer Id</th> */}
                <th>Type</th>
                <th>Name</th>
                <th>Variety</th>
                <th>Brand</th>
                <th>Area</th>
                <th>Cropped At</th>
                <th>Seeding Type</th>
                <th>Organic</th>
                <th>Edit</th>
                {/* <th>harvest Period</th> */}
                {/* <th>Action</th> */}
              </tr>
              {addcrop1.map((item, index) => {
                // console.log('item',item.farmerId)
                return (
                  <tr key={index}>
                    {/* <td>{farmer_id}</td> */}
                    <td>{item.type}</td>
                    <td>{item.name}</td>
                    <td>{item.variety}</td>
                    <td>{item.brand}</td>
                    <td>{item.area}</td>
                    <td>{item.croppedAt}</td>
                    <td>{item.seedingType}</td>
                    {/* <td>{item.organic.toString()}</td> */}
                    <td>{item.harvestPeriod}</td>
                    <td>
                      <MdEdit
                        size={15}
                        style={{ margin: "5px" }}
                        onClick={() => editHandler(item, index)}
                      />
                      {/* <button
                        onClick={() => {
                          editHandler(item, index);
                        }}
                      >
                        Edit
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </table>
          </SimpleBarReact>
        </div>
      </Layout>
    </div>
  );
};

export default CropTable;
