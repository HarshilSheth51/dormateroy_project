import React from "react";
import { useParams } from "react-router-dom";
import Data from "./data";
import Newbookinginfo from "./newimfo";
import AppAppBar from "./navbar";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "../getLPTheme";
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';

const defaultTheme = createTheme({});


function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {


  const images = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
        
        </ToggleButton>
        <ToggleButton value={false}>
          {/* <SvgMaterialDesign sx={{ fontSize: '20px', mr: 1 }} /> */}
           
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const BookingInfoPage = () => {
  const [newdata, setdata] = useState(Data);
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const { itemId } = useParams();
  
  


   


  const product = Data.find((item) => item.name === itemId);
  if (!product) {
    return <p> not found</p>;
  }

  console.log("newdata: ", newdata);

  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <>
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Newbookinginfo
          sliderImages={product.sliderImages}
          img={product.img}
          price={product.price}
          dormateroyname={product.cardname}
          rating={product.rating}
          address={product.address}
          star={product.star}
          name={product.name}
          fprice={product.fprice}
          glocation ={product.glocation}
          qty={product.qty}
        />
      </ThemeProvider>
    </>
  );
};

export default BookingInfoPage;

