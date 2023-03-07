import SimpleBarReact from "simplebar-react";
import classes from "./scroll.module.css";
import Checkbox from "@mui/material/Checkbox";
// import style from "./ViewFarmer.module.css";
import "simplebar/src/simplebar.css";
import { useDispatch, useSelector } from "react-redux";
import { landActions } from "../../store/landStore";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import React from "react";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const Scroll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const availabelLeaseList = [];

  const { fullFarmer } = useSelector((state) => state.farmer);
  const { farmer_id } = useSelector((state) => state.farmer);

  fullFarmer.map((farmer) =>
    farmer.landDetails.map((land) => {
      console.log(land.category);
      if (
        land.category === "availableForLease" &&
        farmer_id !== land.farmerId
      ) {
        const data = {
          landid: land.landId,
          name: farmer.farmerDetails.farmerName,
          fathername: farmer.farmerDetails.fatherName,
          ownerid: land.ownerId,
          area: land.area,
          category: land.category,
          farmerid: farmer.farmerDetails.farmerId,
          village: farmer.farmerDetails.village,
        };
        availabelLeaseList.push(data);
        console.log("landdetails", availabelLeaseList);
      } else {
        return "";
      }
    })
  );

  const selectHandler = (id) => {
    console.log(id, "id");
    const selected = availabelLeaseList.filter(
      (landid) => landid.landid === id
    );

    console.log("selected", selected);
    dispatch(landActions.selectedRentalLand(selected));

    navigate("/selectlandpage");
  };

  const backHandler = () => {
    navigate("/land");
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    // <Layout>
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ backgroundColor: "green" }}>
            <TableRow>
              <StyledTableCell align="center">Select Farmer</StyledTableCell>
              <StyledTableCell align="center">
                Farmer Name
                <SearchIcon sx={{ fontSize: "15px" }} />
              </StyledTableCell>
              <StyledTableCell align="center">
                Farmer Id
                <SearchIcon sx={{ fontSize: "15px" }} />
              </StyledTableCell>
              <StyledTableCell align="center">
                Land Id
                <SearchIcon sx={{ fontSize: "15px" }} />
              </StyledTableCell>
              <StyledTableCell align="center">Area</StyledTableCell>
              <StyledTableCell align="center">
                FatherName
                <SearchIcon sx={{ fontSize: "15px" }} />
              </StyledTableCell>
              <StyledTableCell align="center">
                Village
                <SearchIcon sx={{ fontSize: "15px" }} />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availabelLeaseList.map((land) => (
              <TableRow key={land.landid}>
                <TableCell align="center" padding="checkbox">
                  <AccessibilityIcon
                    onClick={() => selectHandler(land.landid)}
                  />
                  {/* // <Checkbox */}
                  {/* //   // color="primary"
                  //   // indeterminate={numSelected > 0 && numSelected < rowCount}
                  //   // checked={rowCount > 0 && numSelected === rowCount}
                  //   // onChange={onSelectAllClick}
                  //   inputProps={{
                  //     "aria-label": "select all desserts",
                  //   }}
                  // />{" "} */}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {land.name}
                </TableCell>
                <TableCell align="center"> {land.ownerid}</TableCell>
                <TableCell align="center"> {land.landid}</TableCell>
                <TableCell align="center">{land.area}</TableCell>
                <TableCell align="center">{land.fathername}</TableCell>
                <TableCell align="center">{land.village}</TableCell>

                {/* <TableCell align="center">
                  <AiOutlineCheck
                    size={20}
                    style={{ margin: "5px" }}
                    onClick={() => selectHandler(land.landid)}
                  />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={availabelLeaseList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    // <div className={classes.land}>
    //   <div className={classes.container}>
    //     <h1>Lands for Lease</h1>
    //     <SimpleBarReact
    //       autoHide={true}
    //       style={{ maxHeight: 400 }}
    //       className={classes.land}
    //     >
    //       <table border="1" className="table">
    //         <thead>
    //           <tr className="table-head-row">
    //             <th>Name</th>
    //             <th>Farmer Id</th>
    //             <th>Land Id</th>
    //             <th>Area</th>
    //             <th>FatherName</th>
    //             <th>Village</th>
    //             <th>Select Land</th>
    //           </tr>
    //         </thead>
    //         {availabelLeaseList.map((land) => (
    //           <tbody key={land.landid}>
    //             <tr key={land.landid}>
    //               {land.name}
    //               {land.ownerid}
    //               {land.landid}
    //               {land.area}
    //               {land.fathername}
    //               {land.village}

    //
    //                 <AiOutlineCheck
    //                   size={20}
    //                   style={{ margin: "5px" }}
    //                   onClick={() => selectHandler(land.landid)}
    //                 />
    //
    //             </tr>
    //           </tbody>
    //         ))}
    //       </table>
    //     </SimpleBarReact>
    //     <button onClick={backHandler}> Back</button>
    //   </div>
    // </div>
  );
};

export default Scroll;

// function App() {
//   return (

//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
