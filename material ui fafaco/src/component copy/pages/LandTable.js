import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./landtable.module.css";
import Button from "@mui/material/Button";
// import Layout from "../Layout/Layout";
import instance from "./BaseURL";
import { landActions } from "../../store/landStore";
import SimpleBarReact from "simplebar-react";
import { AiTwotoneDelete } from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const LandTable = () => {
  const dispatch = useDispatch();
  const { farmer_id } = useSelector((state) => state.farmer);
  const navigate = useNavigate();
  const { landData } = useSelector((state) => state.land);

  // const [land, setLand] = useState();

  var land = [];
  const removeHandler = async (id) => {
    landData.map((lands) => {
      if (lands.landId === id) {
        land = lands;
        console.log(land, id, "lands");
      }
    });
    console.log(land, id, "lands1");

    await instance({
      url: `/land/id/${land.landId}`,
      method: "delete",
      data: {
        farmerId: land.farmerId,
        landId: land.landId,
        ownerId: land.farmerId,
      },
    })
      .then((response) => {
        console.log("deleteresponse", response);
        console.log("delete", typeof land.landId);
        dispatch(landActions.deleteLand(land.landId));
        // navigate("/land");
      })
      .catch((error) => {
        console.log("deleteerror", error);
      });
  };
  const addHandler = () => {
    navigate("/land");
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event) => {
    setPage(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div>
      {/* // <Paper sx={{ width: "300%", overflow: "hidden" }}> */}

      {/* <TableContainer> */}
      <Table style={{ width: 100, rowsPerPageOptions: 3 }}>
        <TableHead style={{ backgroundColor: "grey" }}>
          <TableRow>
            <TableCell align="center">FarmerID</TableCell>
            <TableCell align="center">LandID</TableCell>
            <TableCell align="center">OnwerID</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">SupervisorID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {landData.map((land) => (
            <TableRow key={land.landid}>
              <TableCell align="center">{farmer_id}</TableCell>
              <TableCell align="center"> {land.landId}</TableCell>
              <TableCell align="center">{land.farmerId}</TableCell>
              <TableCell align="center">{land.category}</TableCell>
              <TableCell align="center">{land.supervisorId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        // component="div"
        count={landData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
    // {/* // </Paper> */}
  );
};

export default LandTable;
