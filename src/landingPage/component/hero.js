import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select, Grid, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Data from "../component/data";
import ImgMediaCard from "./booking";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import auth from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";



const citydata = [
  {
    name: "Delhi",
    backgroundImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/India_Gate_in_New_Delhi_03-2016.jpg/800px-India_Gate_in_New_Delhi_03-2016.jpg",
  },
  {
    name: "Mumbai",
    backgroundImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1200px-Mumbai_03-2016_30_Gateway_of_India.jpg",
  },
  {
    name: "Ahmedabad",
    backgroundImage:
      "https://static2.tripoto.com/media/filter/tst/img/610885/TripDocument/1548515968_jama_masjid_panorama_ahmedabad_myeternaltrails_tripoto.jpeg",
  },
  {
    name: "Banglore",
    backgroundImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HbJmvPHAG_vnC_WV-D-fyeopeNhwJ-O1kQW3TXAiqLTGjq3hEqSFsjjf3fwla7rkQe4&usqp=CAU",
  },
  {
    name: "Chennai",
    backgroundImage:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg",
  },
];

const cityname = ["Delhi", "Mumbai", "Ahmedabad", "Banglore", "Chennai"];

export default function Hero() {
  const [guest, setValue] = useState("");
  console.log("guest", guest);
  const [room, Setnvalue] = useState("");
  const [newcard, setnewcard] = useState(Data);
  const [user, setUser] = useState();
  const [tprice, settprice] = useState();
  const [infomess, setinfomess] = useState();

  const [detail, Setdetail] = useState({
    city: "",
    cheakin: "",
    cheakout: "",
    rating: "",
    highprice: "",
    lowprice: "",
    fullday: "",
    halfday: "",
    scheduleStartTime: "",
    scheduleEndTime: "",
  });


  console.log( 'checkin', detail.cheakin);
  const navigate = useNavigate();

  console.log(detail.days);
  let sortbyval = [];
  sortbyval = detail.sortby;

  const detailchange = (e) => {
    const { name, value } = e.target;

    Setdetail({ ...detail, [name]: value });
  };

    useEffect(()=>{
      onAuthStateChanged(auth , (user)=>{
        if(user){
          console.log('user login')
          setUser(user)
        }
        else{
     setUser("")
      }
      })
    })


  useEffect(() => {
    fetch(
      "https://dormatery-project-default-rtdb.firebaseio.com/dormaterydata.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let newobj = Object.values(data);
        // setdata(newobj);
      });
  }, []);



  const detailsubmit = async () => {
    if (detail.city) {
      console.log("detail", detail);
      const { city, cheakin, cheakout, scheduleStartTime, scheduleEndTime } =
        detail;
      var data = await fetch(
        "https://dormatery-project-default-rtdb.firebaseio.com/searchingDetails.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city,
            cheakin,
            cheakout,
            room,
            guest,
            scheduleStartTime,
            scheduleEndTime,
            tprice,
          }),
        }
      );

      
    }

    let getData = [...Data];
    if (detail.city)
      getData = Data.filter((element) => {
        if (detail.city === element.city) {
          return element;
          }
      });

    if (detail.scheduleStartTime && detail.scheduleEndTime) {
      getData = getData.map((element) => {
        let newElement = { ...element };
        newElement.price = Math.floor(element.price / 2);
        settprice(newElement.price);
        return newElement;
      });
    }

    if (detail.sortby === "rating")
      getData = getData.filter((element) => {
        if (element.rating >= 100) {
          return element;
        }
      });
   

    if (detail.sortby == "HighestPrice")
      getData = getData.filter((element) => {
        if (element.price >= 1000) {
          return element;
        }
      });
    getData = getData.sort((a, b) => {
      return a.price - b.price;
    });

    if (detail.sortby == "LowestPrice")
      getData = getData.filter((element) => {
        if (element.price <= 800) {
          return element;
        }
      });
    getData = getData.sort((a, b) => {
      return a.price - b.price;
    });

    // if (detail.days == "Halfday") {
    //   getData = getData.filter((element) => {
    //     return element.price / 2;
    //   });
    // }

    setnewcard(getData);
  };

  const handlecity = (city) => {
    console.log("city", city);
    let arr = [];
    Data.map((item) => {
      if (item.city === city) {
        arr.push(item);
      }
    });
    setnewcard(arr);
  };

  // const onvalChange = (event) => {
  //   Setnewvalue(event.target.value);
  //  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const Change = (event) => {
    Setnvalue(event.target.value);
  };

  const handleStartTimeChange = (value) => {
    const startTime = value ? value.format("h:mm a") : null;
    Setdetail((prevData) => ({
      ...prevData,
      scheduleStartTime: startTime,
      scheduleEndTime: startTime
        ? moment(startTime, "h:mm a").add(6, "hours").format("h:mm a")
        : null,
    }));
  };

  const handleEndTimeChange = (value) => {
    const endTime = value ? value.format("h:mm a") : null;
    Setdetail((prevData) => ({
      ...prevData,
      scheduleEndTime: endTime,
    }));
  };

  const handlelogin =()=>{
    navigate("/login");
  }

  return (
    <>
      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #CEE5FD, #FFF)"
              : "linear-gradient(#02294F, #090E10)",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "70%" } }}
          >
            {user ? (
              user == ""
            ) : (
              <div onClick={handlelogin} class="login-message" style={{}}>
                <p
                  style={{
                    fontSize: "18px",
                    textAlign: "center",
                    color: "black",
                    fontWeight: "bolder",
                  }}
                >
                  you are not login ? . Go To login Page{" "}
                  <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </p>
              </div>
            )}
            <Typography
              component="h1"
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Find nearest&nbsp;
              <Typography
                component="span"
                variant="h1"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                dormateroy
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            ></Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
            >
              <TextField
                sx={{ marginRight: "5px", marginTop: "16px" }}
                InputLabelProps={{
                  style: {
                    fontSize: "20px",
                    fontFamily: "Josefin Sans",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: "25px",
                    fontFamily: "Josefin Sans",
                  },
                }}
                id="standard-basic"
                variant="standard"
                hiddenLabel
                size="Normal"
                placeholder="City"
                onChange={detailchange}
                name="city"
                value={detail.city}
                InputProps={{
                  endAdornment: (
                    <FontAwesomeIcon
                      size="lg"
                      icon={faXmark}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        detailchange({ target: { name: "city", value: "" } })
                      }
                    />
                  ),
                }}
              />

              <Typography
                component="span"
                variant="h5"
                style={{
                  whiteSpace: "nowrap",
                  marginTop: "23px",
                  fontFamily: "Josefin Sans",
                  marginLeft:'20px'
                }}
              >
                Cheak-In
              </Typography>

               <TextField
                InputLabelProps={{
                  style: {
                    fontSize: "25px",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: "21px",
                  },
                }}
                sx={{ marginLeft: "10px", marginTop: "20px" }}
                id="date"
                // label="Cheak-in"
                type="date"
                defaultValue="0000-00-00"
                variant="standard"
                onChange={detailchange}
                name="cheakin"
              />
              <Typography 
                component="span"
                variant="h5"
                style={{
                  whiteSpace: "nowrap",
                  marginTop: "23px",
                  marginLeft: "20px",
                  fontFamily: "Josefin Sans",
                }}
              >
                Cheak-out
              </Typography>
{/* 
              <LocalizationProvider dateAdapter={AdapterDayjs}
              onChange={detailchange}
              name="cheakout"
              value={detail.cheakout}
              >
             <MobileDatePicker/>
            </LocalizationProvider> */}
              <TextField
                InputLabelProps={{
                  style: {
                    fontSize: "25px",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: "21px",
                  },
                }}
                sx={{ marginLeft: "10px", marginTop: "20px" }}
                id="date"
                // label="Cheak-out"
                type="date"
                defaultValue="0000-00-00"
                variant="standard"
                onChange={detailchange}
                name="cheakout"
              />
            </Stack>
            <Typography
              component="span"
              style={{
                whiteSpace: "nowrap",
                marginTop: "23px",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              Select City
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={0}
              useFlexGap
              sx={{ pt: 2, width: "100%" }}
            >
              <div class="hero">
                <div class="social-links">
                  {citydata.map((values) => {
                    return (
                      <div onClick={() => handlecity(values.name)}>
                        <img class="bg-img " src={values.backgroundImage}></img>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Stack>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span style={{ fontSize: "18px" }}>
                If you stay in dormateroy hours base select time. <br />
                Only 6 Hour stay avaiable
              </span>
            </div>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
            >
              {/* <div className="combine-box"> */}
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, padding: "10px 10px 10px 10px" }}
              >
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{
                    fontSize: "1.25rem",
                    paddingLeft: "1rem",
                    fontFamily: "Josefin Sans",
                  }}
                >
                  Rooms
                </InputLabel>
                <Select
                  sx={{ fontSize: "1.20rem" }}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={room}
                  onChange={Change}
                  label="Age"
                >
                  {/* <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem> */}

                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
              {/* </div> */}
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, padding: "10px 10px 10px 10px" }}
              >
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{ fontSize: "1.25rem", fontFamily: "Josefin Sans" }}
                >
                  Guests
                </InputLabel>
                <Select
                  sx={{ fontSize: "1.20rem" }}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={guest}
                  onChange={handleChange}
                  label="Age"
                >
                  {/* <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem> */}

                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
              {/* <div className="sort-byg"> */}
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, padding: "10px 10px 10px 10px" }}
              >
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{
                    fontSize: "1.25rem",
                    paddingLeft: "1rem",
                    fontFamily: "Josefin Sans",
                  }}
                >
                  Sort By
                </InputLabel>
                <Select
                  sx={{ fontSize: "1.20rem" }}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={detail.sortby}
                  name="sortby"
                  onChange={detailchange}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>

                  <MenuItem
                    sx={{ fontFamily: "Josefin Sans" }}
                    value={"rating"}
                  >
                    Rating
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: "Josefin Sans" }}
                    value={"HighestPrice"}
                  >
                    Price (Highest First)
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: "Josefin Sans" }}
                    value={"LowestPrice"}
                  >
                    Price ( Lowest First)
                  </MenuItem>
                </Select>
              </FormControl>
              {/* </div> */}
              {/* <p>Select time</p> */}

              {/* <div className=" flex items-center"> */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignSelf="center"
                spacing={0}
                useFlexGap
                sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
              >
                {/* <div style={{ marginTop: "00px", display: "flex"}}> */}
                <div class="tooltip">
                  <TimePicker
                    className="col-12 timepicker-one"
                    showSecond={false}
                    placeholder="Select Time"
                    value={
                      detail.scheduleStartTime
                        ? moment(detail.scheduleStartTime, "h:mm a")
                        : null
                    }
                    onChange={handleStartTimeChange}
                    format="h:mm a"
                    clearText=""
                    clearIcon
                    use12Hours
                    
                  />
                  <span class="tooltiptext">
                    if Select time auto adjust with 6 hours
                  </span>
                </div>
                {/* <div className="relative  right-6">
                  
                </div> */}
                <p
                  style={{
                    marginRight: "10px",
                    textAlign: "center",
                    fontFamily:'Josefin Sans',
                    fontWeight:'bold'
                  }}
                >
                  To
                </p>
                <TimePicker
                  className="col-18"
                  style={{ marginTop: "0px" }}
                  showSecond={false}
                  placeholder="Select Time"
                  value={
                    detail.scheduleEndTime
                      ? moment(detail.scheduleEndTime, "h:mm a")
                      : null
                  }
                  onChange={handleEndTimeChange}
                  clearText=""
                  clearIcon
                  format="h:mm a"
                  use12Hours
                  // disabled={!detail.scheduleStartTime} // Disable until start time is selected
                  // disabledHours={() => [moment(detail.scheduleStartTime, 'h:mm a').hour() + 1]} // Disable hours except the next 6-hour block
                />
                {/* </div> */}
              </Stack>
              {/* </div> */}
            </Stack>

            {/* <h1>Sortby : {newval}</h1> */}
            <div className="sort-by">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignSelf="center"
                spacing={1}
                useFlexGap
                sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
              ></Stack>
              <Button
                onClick={detailsubmit}
                variant="contained"
                sx={{ padding: "25px", fontSize: "25px" }}
              >
                Check Availabilty
              </Button>
            </div>
          </Stack>
        </Container>
      </Box>

      <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
        {/* {data &&
          data.map((values) => {
            return (
              <ImgMediaCard
                cardname={values.cardname}
                name={values.dormateroyname}
                price={values.price}
                dec={values.dec}
                dec2={values.dec2}
                rating={values.rating}
                img={values.image}
                city={values.city}
                discount={values.discount}
              />
            );
          })} */}

        {newcard.map((values) => {
          return (
            <ImgMediaCard
              cardname={values.cardname}
              name={values.name}
              price={values.price}
              dec={values.dec}
              dec2={values.dec2}
              rating={values.rating}
              img={values.img}
              city={values.city}
              discount={values.discount}
              sliderImages={values.sliderImages}
            />
          );
        })}
      </Grid>
    </>
  );
}
