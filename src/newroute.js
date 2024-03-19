import "./App.css";
import React from "react";
import DashboardLayout from "./dashboard";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import Sucess from "./landingPage/component/sucess";

const Newroute = () =>{
    return(
        <>
        
            <DashboardLayout/>
            
              <Routes>
              {/* <Route path="/succ" element={<Sucess />} /> */}
              </Routes>
            
      
        </>
    );
}

export default Newroute;