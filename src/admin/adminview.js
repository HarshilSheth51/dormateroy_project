import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";


function createData(
  email: string,
  firstname: string,
  lastname: string,
  password: string
) {
  return { email, firstname, lastname, password };
}

export default function AdminTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("https://dormatery-project-default-rtdb.firebaseio.com/regidata.json")
      .then((res) => res.json())
      .then((data) => {
        let newobj = Object.values(data);
        const newRows = newobj.map((objval) => {
          console.log(objval.email);
          console.log(objval.firstname);
          console.log(objval.lastname);
          console.log(objval.password);

          return createData(
            objval.email,
            objval.firstname,
            objval.lastname,
            objval.password
          ); 
        });
        setRows(newRows);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
    
    <TableContainer component={Paper} className="table-admin">
    <h1 style={{textAlign:'center'}}>User Details</h1>
      <Table sx={{ minWidth: 500 }} aria-label="simple table" className="table">
        <TableHead className="table-head">
          <TableRow className="table-row">
            <TableCell>Email</TableCell>
            <TableCell align="right">Firstname</TableCell>
            <TableCell align="right">Lastname&nbsp;</TableCell>
            <TableCell align="right">Password&nbsp;</TableCell>
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
                {row.email}
              </TableCell>
              <TableCell align="right">{row.firstname}</TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
