import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";
import {
  faStar,
  faCheck,
  faWifi,
  faLocationDot,
  faElevator,
  faTv,
  faJugDetergent,
  faSquareParking,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
// import Data from "./data";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Stack,
  Typography,
  Divider,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

const Newbookinginfo = ({
  name,
  fprice,
  glocation,
  sliderImages,
  img,
  dormateroyname,
  price,
  star,
  rating,
  address,
}) => {
  const [roomprice, setroomprice] = useState();
  const [discountprice, setnewprice] = useState(Math.floor(roomprice * 0.3));
  const [totalprice, settotalrpice] = useState();

  const [timeprice, settimeprice] = useState(Math.floor(price / 2));
  const [timedisprice, settimedisprice] = useState(Math.floor(timeprice * 0.3));
  const [timetotalprice, settimetotalprice] = useState();

  const discountPercentage = 0.3;
  const discountedPrice = roomprice * (1 - discountPercentage);
  const totalSaving = Math.floor(roomprice - discountedPrice);

  useEffect(() => {
    settotalrpice(Math.floor(roomprice - totalSaving));
    settimetotalprice(Math.floor(timeprice - timedisprice));
    setroomprice(Math.floor(price * rooms));
  });

  const timedispre = 0.3;

  const timediscountprice = timeprice * (1 - timedispre);
  const timetotalsaving = Math.floor(timeprice - timediscountprice);

  const taxes = 115;
  const finalprice = taxes + totalprice;

  const timefinalprice = taxes + timetotalprice;

  const [checkindate, setcheckindate] = useState();
  const [checkoutdate, setcheckoutdate] = useState();
  const [rooms, setroom] = useState();
  const [guests, setguest] = useState();
  const [fromtime, setfromtime] = useState();
  const [totime, settotime] = useState();

  console.log("roomprice", roomprice);
  const { info } = useParams();

  // const dorinfo = Data.find((n => n.key === parseInt(itemid)));

  const [value, setValue] = useState(0);

  const handleImageClick = (index) => {
    let newValue = index % sliderImages.length;
    if (newValue < 0) {
      newValue += sliderImages.length;
    }
    setValue(newValue);
  };

  useEffect(() => {
    fetch(
      "https://dormatery-project-default-rtdb.firebaseio.com/searchingDetails.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let newobj = Object.values(data);
        newobj.find((items) => {
          setcheckindate(items.cheakin);
          setcheckoutdate(items.cheakout);
          setroom(items.room);
          setguest(items.guest);
          setfromtime(items.scheduleStartTime);
          settotime(items.scheduleEndTime);
        });
      });
  }, []);

  const handlesubmit = () => {};

  return (
    <>
      <div class="header">
        <div style={{ position: "relative" }}>
          <FontAwesomeIcon
            className="button"
            size="lg"
            style={{ position: "absolute", top: "160px", left: "10px" }}
            onClick={() => handleImageClick((value - 1) % sliderImages.length)}
            icon={faArrowLeft}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className="button"
            size="lg"
            style={{ position: "absolute", right: "10px", top: "160px" }}
            onClick={() => handleImageClick((value + +1) % sliderImages.length)}
            icon={faArrowRight}
          ></FontAwesomeIcon>
        </div>
        <CardMedia
          component="img"
          alt="images"
          height="450"
          image={
            sliderImages && sliderImages.length > 0
              ? sliderImages[value % sliderImages.length]
              : img
          }
          // onClick={() => handleImageClick((value + 1) % sliderImages.length)}
          style={{ cursor: "pointer" }}
        />
            <div role="presentation" style={{marginTop:"20px"}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link  color="inherit" to="/" style={{fontSize:'20px'}}>
          Back to home
        </Link>
        </Breadcrumbs>
    </div>

        <div
          style={{
            alignItems: "center",
            textAlign: "center",
            paddingTop: "0px",
          }}
        ></div>
      </div>
      <div class="row">
        <div class="col-6">
          <h2 className="hotel-name" style={{ marginLeft: "10px" }}>
            {dormateroyname}

            <div
              class="col-0"
              style={{
                backgroundColor: "green ",
                marginRight: "42.5rem",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  color: "white",
                  paddingLeft: "4.5px",
                }}
              >
                {star}
              </span>

              <FontAwesomeIcon
                size="2xs"
                style={{
                  paddingTop: "5px",
                  paddingLeft: "5px",
                  color: "white",
                }}
                icon={faStar}
              ></FontAwesomeIcon>

              <span
                style={{
                  fontSize: "15px",
                  color: "white",
                  paddingLeft: "8px",
                  paddingTop: "2px",
                }}
              >
                {rating}
              </span>
            </div>
          </h2>

          <div
            style={{
              marginLeft: "10px",
              paddingTop: "10px",
              marginRight: "30px",
              paddingBottom: "10px",
              marginTop: "60px",
              fontWeight: "bold",
              fontFamily: "revert",
              borderRadius: "10px",
            }}
          >
            <FontAwesomeIcon
              size="lg"
              icon={faLocationDot}
              style={{
                paddingLeft: "8px",
                paddingRight: "0px",
                paddingTop: "10px",
              }}
            ></FontAwesomeIcon>
            <a
              href={glocation}
              target="_blank"
              className="address"
              style={{
                paddingLeft: "5px",
                textDecoration: "none",
                color: "black",
              }}
            >
              {address} (Click & Go to Maps ) {<br></br>}
            </a>

            {/* <span style={{paddingLeft:'10px'}}>Ahmedabad , Gujarta</span> */}
          </div>
          <Divider style={{ marginTop: "10px" }} />
          <Typography
            variant="h5"
            component="div"
            className="text-heading"
            style={{
              marginLeft: "10px",
              paddingTop: "20px",
              fontWeight: "bold",
            }}
          >
            About this Dormitory
          </Typography>
          <div className="dor-info">
            <FontAwesomeIcon icon={faCheck} size="lg"></FontAwesomeIcon>{" "}
            <span style={{ fontSize: "18px", fontWeight: 500 }}>
              Affordable Dormitory at prime location.
            </span>{" "}
            <br />
            <FontAwesomeIcon icon={faCheck} size="lg"></FontAwesomeIcon>{" "}
            <span style={{ fontSize: "18px", fontWeight: 500 }}>
              Free Cancellation.
            </span>
            <br />
            <FontAwesomeIcon icon={faCheck} size="lg"></FontAwesomeIcon>{" "}
            <span style={{ fontSize: "18px", fontWeight: 500 }}>
              Reserve your room now and enjoy 30% off your entire stay.
            </span>
          </div>

          <Divider style={{ marginTop: "10px" }} />

          <Typography
            variant="h5"
            component="div"
            className="text-heading"
            style={{
              marginLeft: "10px",
              paddingTop: "20px",
              fontWeight: "bold",
            }}
          >
            Ratings and reviews
          </Typography>
          <div className="dor-info">
            <Stack direction="row">
              <div
                className="col2-0"
                style={{
                  backgroundColor: "green ",
                  borderRadius: "8px",
                  padding: "5px",
                  marginLeft: "5px",
                  height: "10%",
                  marginTop: "30px",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginLeft: "0px  ",
                  }}
                >
                  {star}
                </span>
                <FontAwesomeIcon
                  size="sm"
                  style={{
                    paddingTop: "0px",
                    paddingLeft: "5px",
                    paddingBottom: "1  px",
                    color: "white",
                  }}
                  icon={faStar}
                ></FontAwesomeIcon>
                <Stack direction="column">
                  <div
                    className="rating-star"
                    style={{
                      backgroundColor: "lightgray",
                      marginRight: "0%",
                      borderRadius: "2px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        padding: "1px",
                        whiteSpace: "nowrap",
                        paddingLeft: "2px",
                      }}
                    >
                      {rating}
                    </span>
                  </div>
                </Stack>
              </div>

              <Divider
                orientation="vertical"
                flexItem
                style={{ marginLeft: "20px" }}
              />
              <div style={{ marginLeft: "10px" }} className="col3-0">
                <Stack direction="column">
                  <div style={{ display: "flex" }}>
                    <span>
                      5{" "}
                      <FontAwesomeIcon
                        style={{ color: "#CDCDCD  " }}
                        icon={faStar}
                      ></FontAwesomeIcon>
                    </span>
                    <div className="progress-bar1"></div>80%
                  </div>
                  <div style={{ display: "flex" }}>
                    <span>
                      4{" "}
                      <FontAwesomeIcon
                        style={{ color: "#CDCDCD  " }}
                        icon={faStar}
                      ></FontAwesomeIcon>
                    </span>
                    <div className="progress-bar2"></div>70%
                  </div>
                  <div style={{ display: "flex" }}>
                    <span>
                      3{" "}
                      <FontAwesomeIcon
                        style={{ color: "#CDCDCD  " }}
                        icon={faStar}
                      ></FontAwesomeIcon>
                    </span>
                    <div className="progress-bar3"></div>33%
                  </div>
                  <div style={{ display: "flex" }}>
                    <span>
                      2{" "}
                      <FontAwesomeIcon
                        style={{ color: "#CDCDCD  " }}
                        icon={faStar}
                      ></FontAwesomeIcon>
                    </span>
                    <div className="progress-bar4"></div>21%
                  </div>
                  <div style={{ display: "flex" }}>
                    <span>
                      1{" "}
                      <FontAwesomeIcon
                        style={{ color: "#CDCDCD  " }}
                        icon={faStar}
                      ></FontAwesomeIcon>
                    </span>
                    <div className="progress-bar5"></div>10%
                  </div>
                </Stack>
              </div>
            </Stack>
          </div>
        </div>

        <div class="col-3 menu">
          <Typography
            variant="h5"
            component="div"
            className="heading-text"
            style={{
              marginLeft: "10px",
              paddingTop: "20px",
              fontWeight: "bold",
              fontFamily: "revert",
              paddingBottom: "10px",
              fontFamily: "Poppins",
            }}
          >
            Amenities
          </Typography>

          <ul>
            <li>
              <FontAwesomeIcon icon={faWifi}></FontAwesomeIcon>Free Wifi
            </li>
            <li style={{ paddingRight: "43px", marginLeft: "10px" }}>
              {" "}
              <FontAwesomeIcon
                style={{ paddingRight: "12px" }}
                icon={faSuperpowers}
              ></FontAwesomeIcon>
              Power backup
            </li>
          </ul>
          <ul>
            <li>
              {" "}
              <FontAwesomeIcon icon={faElevator}></FontAwesomeIcon>Elevator
            </li>
            <li style={{ marginLeft: "10px" }}>
              <FontAwesomeIcon
                style={{ paddingRight: "5px" }}
                icon={faTv}
              ></FontAwesomeIcon>
              TV
            </li>
            <li style={{ marginLeft: "10px", paddingRight: "37px" }}>
              <FontAwesomeIcon
                style={{ paddingRight: "10px" }}
                icon={faSquareParking}
              ></FontAwesomeIcon>
              Parking
            </li>
          </ul>
          <ul>
            <li style={{}}>
              <FontAwesomeIcon icon={faJugDetergent}></FontAwesomeIcon>Laundry
              Facilities
            </li>
            <li style={{ marginLeft: "10px", paddingRight: "15px" }}>
              Common Areas
            </li>
            <li style={{ paddingRight: "21px" }}>Cleaning Services</li>
          </ul>
          <ul></ul>

          <Typography
            variant="h5"
            component="div"
            className="text-heading"
            style={{
              marginLeft: "10px",
              paddingTop: "20px",
              fontWeight: "bold",
            }}
          >
            Dormitory policies
          </Typography>
          {checkindate && (
            <div className="dor-info">
              <Stack direction="row">
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    paddingRight: "15px",
                  }}
                >
                  Check-in
                </span>
                <br />

                <span style={{ fontSize: "18px", fontWeight: 500 }}>
                  Check-out
                </span>
                <br />
              </Stack>

              <Stack direction="row">
                <div
                  style={{
                    border: "1px solid black",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingTop: "5px",
                    borderRadius: "15px",
                  }}
                >
                  <p style={{ marginTop: "10px" }}>12:00 PM</p>
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ color: "black", marginLeft: "15px" }}
                />
                <div
                  style={{
                    border: "1px solid black",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingTop: "5px",
                    marginLeft: "20px",
                    borderRadius: "15px",
                  }}
                >
                  <p style={{ marginTop: "10px" }}>11:00 AM</p>
                </div>
              </Stack>

              <p style={{ marginRight: "20px", marginTop: "5px" }}>
                Guests can check in using any local or outstation ID proof (PAN
                card not accepted).
              </p>
            </div>
          )}
          {fromtime && (
            <div className="dor-info">
              <Stack direction="row">
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    paddingRight: "15px",
                  }}
                >
                  Check-in
                </span>
                <br />

                <span style={{ fontSize: "18px", fontWeight: 500 }}>
                  Check-out
                </span>
                <br />
              </Stack>

              <Stack direction="row">
                <div
                  style={{
                    border: "1px solid black",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingTop: "5px",
                    borderRadius: "15px",
                  }}
                >
                  <p style={{ marginTop: "10px" }}>{fromtime}</p>
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ color: "black", marginLeft: "15px" }}
                />
                <div
                  style={{
                    border: "1px solid black",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingTop: "5px",
                    marginLeft: "20px",
                    borderRadius: "15px",
                  }}
                >
                  <p style={{ marginTop: "10px" }}>{totime}</p>
                </div>
              </Stack>

              <p style={{ marginRight: "20px", marginTop: "5px" }}>
                Guests can check in using any local or outstation ID proof (PAN
                card not accepted).
              </p>
            </div>
          )}
        </div>
        <div class="col-3 right">
          <div class="aside ">
            <Stack direction="row">
              <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>
                {fromtime == "" && totime == "" ? totalprice : timetotalprice}
              </h2>

              <div style={{ position: "relative", left: "25px" }}>
                <h2
                  style={{
                    textDecoration: "line-through",
                    fontSize: "16px",
                    color: "grey",
                    paddingTop: "20px",
                  }}
                >
                  {fromtime == "" && totime == "" ? totalSaving : timedisprice}
                </h2>
              </div>
              <div style={{ display: "flex" }}>
                <h2
                  style={{
                    textDecoration: "line-through",
                    fontSize: "16px",
                    paddingLeft: "0px",
                    paddingTop: "0px",
                    color: "grey",
                  }}
                >
                  {fromtime == "" && totime == "" ? roomprice : timeprice}
                </h2>
                <p style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  x{rooms} Room
                </p>
                <p
                  style={{
                    paddingLeft: "5px",
                    marginRight: "50px",
                    paddingTop: "0px",
                    color: "#F8AE23",
                    fontWeight: "bolder",
                  }}
                >
                  30% Off
                </p>
                <br />
              </div>
            </Stack>

            {checkindate && (
              <div
                className="date-day"
                style={{
                  backgroundColor: "white",
                  padding: "1px",
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
              >
                <p style={{ fontWeight: "bold", textAlign: "center" }}>
                  {checkindate} {checkoutdate}
                </p>
              </div>
            )}

            {fromtime && (
              <div
                className="date-day"
                style={{
                  backgroundColor: "white",
                  padding: "1px",
                  marginRight: "30px",
                  marginLeft: "30px",
                  marginTop: "15px",
                }}
              >
                <p style={{ fontWeight: "bold", textAlign: "center" }}>
                  Time Form {fromtime} : To {totime}
                </p>
              </div>
            )}

            <div
              className="room-gue"
              style={{
                backgroundColor: "white",
                padding: "1px",
                marginRight: "50px",
                marginLeft: "50px",
                marginTop: "15px",
              }}
            >
              <p style={{ fontWeight: "bold", textAlign: "center" }}>
                {rooms} Room , {guests} Guest
              </p>
            </div>

            <Divider style={{ marginTop: "10%" }} />

            <Stack direction="row">
              <p
                style={{
                  fontSize: "15px",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                }}
              >
                Your Saving
              </p>
              <p
                style={{
                  paddingLeft: "54%",
                  fontWeight: "bold",
                  textDecoration: "line-through",
                  fontSize:'18px'
                }}
              >
                {fromtime == "" && totime == "" ? totalSaving : timetotalsaving}
              </p>
              <br />
            </Stack>
            <Stack direction="row">
              <p
                style={{
                  fontSize: "15px",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                }}
              >
                Total Price <br />x {rooms} Room
              </p>
              <p style={{ paddingLeft: "57%", fontWeight: "bold" , fontSize:'18px' }}>
                {fromtime == "" && totime == "" ? totalprice : timetotalprice}
              </p>
              <br />
            </Stack>
            <Stack direction="row">
              <p
                style={{
                  fontSize: "15px",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                }}
              >
                taxes & fees
              </p>
              <p className="final-taxprice" style={{ fontWeight: "bold" , fontSize:'18px' }}>
                {taxes}
              </p>
            </Stack>

            <Stack direction="row">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                Total Price
              </p>
              <p className="final-price" style={{ fontWeight: "bold" }}>
                {fromtime == "" && totime == "" ? finalprice : timefinalprice}
              </p>
            </Stack>
            <Link to={`/${name}/${fprice}`}>
              <button class="button-79" role="button">
                Contiune to Book
              </button>
            </Link>

            <Stack direction="row"></Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newbookinginfo;
