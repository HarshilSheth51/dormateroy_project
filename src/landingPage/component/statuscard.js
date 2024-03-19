import React from "react";
import Drawer from "@mui/joy/Drawer";
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { CircularProgress, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import { AspectRatio } from "@mui/icons-material";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
  faFileImport,
  faImagePortrait,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Invoice from '../component/invoice';

const Statuscard = ({dormateroyname}) =>{
    return(
        <>
        <Stack direction="row">
              <Card
                color="primary"
                variant="soft"
                orientation="horizontal"
                sx={{
                  mt: "1rem",
                  ml: "3rem",
                  width: "65%",
                  "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    level="title-lg"
                    id="card-description"
                    sx={{
                      fontFamily: "Josefin Sans",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                     {dormateroyname} 
                  </Typography>
                  <Stack direction="row">
                    <p
                      style={{
                        color: "black",
                        fontFamily: "Josefin Sans",
                        fontSize: "20px",
                      }}
                    >
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                      {/* {fullname}  */}
                    </p>
                    <p
                      style={{
                        color: "black",
                        fontFamily: "Josefin Sans",
                        fontSize: "20px",
                        marginLeft: "15px",
                      }}
                    >
                      <FontAwesomeIcon icon={faPhone}  style={{paddingRight:'5px'}}></FontAwesomeIcon>
                      {/* {mobilenum} */}
                    </p>
                  </Stack>
                  <Stack direction='row'>
                  <p
                      style={{
                        color: "black",
                        fontFamily: "Josefin Sans",
                        fontSize: "20px",
                      }}
                    >
                      <FontAwesomeIcon  icon={faClock} style={{paddingRight:'5px'}}></FontAwesomeIcon>
                      {/* {fromtime} */}
                    </p>

                    <p
                      style={{
                        color: "black",
                        fontFamily: "Josefin Sans",
                        fontSize: "20px",
                        marginLeft:'15px'
                      }}
                    >
                    
                      To
                    </p>
                    
                    <p
                      style={{
                        color: "black",
                        fontFamily: "Josefin Sans",
                        fontSize: "20px",
                        marginLeft:'15px'
                      }}
                    >
                      <FontAwesomeIcon icon={faClock} style={{paddingRight:'5px'}}></FontAwesomeIcon>
                      {/* {totime} */}
                    </p>
                    </Stack>

                  <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: "none" }}
                  >
                    Cool weather all day long
                  </Chip>
                </CardContent>
              </Card>

              <Card
                color="success"
                variant="soft"
                orientation="horizontal"
                sx={{
                  mt: "1rem",
                  ml: "3rem",
                  width: "20%",
                  "&:hover": {
                    boxShadow: "lg",
                    borderColor: "neutral.outlinedHoverBorder",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    level="title-lg"
                    id="card-description"
                    sx={{
                      fontFamily: "Josefin Sans",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    {/* ₹ {finalallprice} */}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Josefin Sans",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                    level="body-sm"
                    aria-describedby="card-description"
                    mb={1}
                  >
                    Include all taxes +
                  </Typography>
                  <Chip
                    variant="outlined"
                    color="success"
                    size="lg"
                    sx={{ pointerEvents: "none" }}
                  >
                    Payment Sucessfully
                  </Chip>
                  
                  <Invoice/>
                  
                </CardContent>
              </Card>
            </Stack>
        
        
        
        
        </>
    );
}

export default Statuscard;