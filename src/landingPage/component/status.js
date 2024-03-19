import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

const Bookingstatus = () =>{
    const [rows, setRows] = useState([]);

    
    useEffect(() => {
      fetch("http://localhost:4000/paymentsession")
        .then((res) => res.json())
        .then((ndata) => {
          console.log('datatatt', ndata);
          console.log('helllllo')
        });
  }, []);
  
  useEffect(() => {
      fetch("https://dormatery-project-default-rtdb.firebaseio.com/conformdetails.json")
        .then((res) => res.json())
        .then((data) => {
          const newRows = Object.values(data).map((objval) => {
            return {
              dormateroyname: objval.dormateroyname,
              fullname: objval.fullname,
              mobilenum: objval.mobilenum,
              finalallprice: objval.finalallprice,
              payment:objval.payment
              // payment: "", // Initialize payment status to empty string
            };
          });
          setRows((prevRows) => [...prevRows, ...newRows]); // Merge data from both endpoints
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, []); 


    return(
        <>
         
    <TableContainer component={Paper} className="table-admin">
    <h1 style={{textAlign:'center'}}>User Details</h1>
      <Table sx={{ minWidth: 500 }} aria-label="simple table" className="table">
        <TableHead className="table-head">
          <TableRow className="table-row">
            <TableCell>Dormateroy Name</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Mobile Number&nbsp;</TableCell>
            <TableCell align="right">Price&nbsp;</TableCell>
            <TableCell align="right">Payment Status&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                margin: "10%",
              }}
            >
              <TableCell component="th" scope="row">
                {row.dormateroyname}
              </TableCell>
              <TableCell align="right" style={{fontWeight:'bolder'}}>
                
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-JmDfLz7ErRiTZ9vIme55A9JGQqdx8qJ_xQ_lB2UIqGAFELpsKQQ8xuTSrlqrly-tSQ&usqp=CAU" alt=""  height={50} width={50} style={{borderRadius:'50%'}}/> <br />
                {row.fullname}</TableCell>
              <TableCell align="right">{row.mobilenum}</TableCell>
              <TableCell align="right">{row.finalallprice}</TableCell>
              <TableCell align="right">Sucess</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    );
}

export default Bookingstatus;