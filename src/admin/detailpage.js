import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import { useState } from "react";
export default function Detailspage() {
  const [qty, setqty] = useState("1");
  const [details, setdetails] = useState({
    dormateroyname: "",
    cardname: "",
    city: "",
    address: "",
    price: "",
    star: "",
    rating: "",
    dec: "",
    dec2: "",
    discount: "",
    image: "",
    glink: "",
    pagename: "",
  });

  const [newimage, setimage] = useState();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setdetails({ ...details, [name]: value });
    console.log(value);
  };

  const handlesubmit = async () => {
    const {
      dormateroyname,
      cardname,
      city,
      address,
      price,
      star,
      rating,
      dec,
      dec2,
      discount,
      image,
      glink,
      pagename,
    } = details;

    if (
      dormateroyname &&
      cardname &&
      city &&
      address &&
      price &&
      star &&
      rating &&
      dec &&
      dec2 &&
      discount &&
      image &&
      glink &&
      pagename
    ) {
      let ndata = await fetch(
        "https://dormatery-project-default-rtdb.firebaseio.com/dormaterydata.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dormateroyname,
            cardname,
            city,
            address,
            price,
            star,
            rating,
            dec,
            dec2,
            discount,
            image,
            glink,
            pagename,
            qty,
          }),
        }
      );

      setdetails({
        dormateroyname: "",
        cardname: "",
        city: "",
        address: "",
        price: "",
        star: "",
        rating: "",
        dec: "",
        dec2: "",
        discount: "",
        image: "",
        glink: "",
        pagename: "",
      });

      alert("Data is Submit");
    } else {
      alert("Data is not submit");
    }
  };

  return (
    <div className="App">
      <AppBar style={{ height: "80px" }}>
        <h1 style={{ textAlign: "center" }}>Details Form </h1>
      </AppBar>

      <form style={{ marginTop: "8%", marginLeft: "28%" }}>
        <Stack direction="row" style={{}}>
          <TextField
            style={{ width: "300px", margin: "5px" }}
            fullWidth
            id="fullWidth"
            name="dormateroyname"
            type="text"
            label="Dormateroy name"
            variant="outlined"
            onChange={handlechange}
          />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            name="cardname"
            label="Dormateroy Cardname"
            variant="outlined"
            onChange={handlechange}
          />
        </Stack>

        <br />
        <Stack direction="row" style={{}}>
          <TextField
            style={{ width: "300px", margin: "5px" }}
            fullWidth
            id="fullWidth"
            name="city"
            type="text"
            label="City"
            variant="outlined"
            onChange={handlechange}
          />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            id="outlined-multiline-flexible"
            label="Address"
            name="address"
            multiline
            variant="outlined"
            maxRows={4}
            onChange={handlechange}
          />
        </Stack>

        <br />
        <Stack direction="row" style={{}}>
          <TextField
            style={{ width: "300px", margin: "5px" }}
            fullWidth
            id="fullWidth"
            name="price"
            type="text"
            label="Price"
            variant="outlined"
            onChange={handlechange}
          />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            name="star"
            label="Star"
            variant="outlined"
            onChange={handlechange}
          />
        </Stack>

        <br />
        <Stack direction="row" style={{}}>
          <TextField
            style={{ width: "300px", margin: "5px" }}
            fullWidth
            name="rating"
            id="fullWidth"
            type="text"
            label="Rating"
            variant="outlined"
            onChange={handlechange}
          />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            name="dec"
            multiline
            label="Description 1"
            variant="outlined"
            maxRows={2}
            onChange={handlechange}
          />
        </Stack>

        <br />
        <Stack direction="row" style={{}}>
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            multiline
            name="dec2"
            label="Description 2"
            variant="outlined"
            maxRows={2}
            onChange={handlechange}
          />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            name="discount"
            multiline
            label="Discount details"
            variant="outlined"
            maxRows={2}
            onChange={handlechange}
          />
        </Stack>
        <br />
        <Stack direction="row" style={{}}>
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            name="glink"
            multiline
            label="Location link"
            variant="outlined"
            maxRows={2}
            onChange={handlechange}
          />
          <br />
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Upload image"
            type="file"
            name="image"
            variant="standard"
            onChange={handlechange}
          />
        </Stack>
        <br />
        <Stack direction="row" style={{}}>
          <TextField
            style={{ width: "300px", margin: "5px" }}
            type="text"
            multiline
            label="Page name"
            variant="outlined"
            maxRows={2}
            name="pagename"
            onChange={handlechange}
          />
          <br />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "25%", marginTop: "1%", marginBottom: "20px" }}
          onClick={handlesubmit}
        >
          save
        </Button>
      </form>
    </div>
  );
}
