import "./App.css";
import Login from "./section/login";
import Register from "./section/register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Reset from "./section/reset";
import LandingPage from "./landingPage/landingpage";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import AdminTable from "./admin/adminview";
import BookingInfoPage from "./landingPage/component/Bookinginfopage";
import FinalConformbook from "./landingPage/component/finalconform";
import Sucess from "./landingPage/component/sucess";
import Cancel from "./landingPage/component/cancel";
import Aboutus from "./landingPage/component/aboutus";
import Detailspage from "./admin/detailpage";
import Bookingstatus from "./landingPage/component/status";
import Userstatus from "./landingPage/component/userstatus";
function Routers() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Toaster />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpass" element={<Reset />} />
          <Route path="/adminview" element={<AdminTable />} />
          <Route path="/success" element={<Sucess />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/details" element={<Detailspage />} />
          <Route path="/bookstatus" element={<Bookingstatus/>} />
          <Route path="/userstatus" element={<Userstatus/>} />
          <Route path="/:itemId" element={<BookingInfoPage />} />
          <Route path="/:itemId/:priceId" element={<FinalConformbook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
