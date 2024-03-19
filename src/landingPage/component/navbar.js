import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { Link  , useNavigate} from "react-router-dom";
// import UserProfile from './userprofile';
import { signOut } from "firebase/auth";
import auth from "../../firebase";
import AccountMenu from "./newtoggle";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

function AppAppBar({ mode, toggleColorMode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setuser] = useState("");

  useEffect(() => {
    const authchange = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("loged in");
        setuser(user);
      } else {
        console.log("not logged in");
        setuser("");
        
      }
    });
  });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
             <img
                src="https://i.pinimg.com/736x/16/14/64/1614645103c8f7f4ca23011fdfb8645c.jpg"
                height="30px"
                width="30px"
                alt=" sitemark"
                style={{borderRadius:'50px' , marginRight:'5px'}}
              />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
             
              <h3 className="heading">Dormateroy Discovery</h3>

               
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                
                <Link to="/aboutus">
                <MenuItem
                  onClick={() => scrollToSection("pricing")}
                  sx={{ py: "6px", px: "12px" }}
                >
                 
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: "20px" }}
                  >
                    About us
                  </Typography>
                </MenuItem>
                </Link>
                <Link to="/userstatus">
                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: "20px" }}
                  >
                    Booking Status
                  </Typography>
                </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: "20px" }}
                  >
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {user ? (
                user == ""
              ) : (
                <Link to="/login">
                  <Button
                    sx={{ fontSize: "20px" }}
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    target="_blank"
                  >
                    Login
                  </Button>
                </Link>
              )}
                {user ? user == "" :<Link to="/register">
                <Button
                  sx={{ fontSize: "20px" }}
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  target="_blank"
                >
                  Register
                </Button>
              </Link>}
              
            </Box>
            <AccountMenu />
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>

              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <Link to="/userstatus">
                  <MenuItem onClick={() => scrollToSection("faq")}>
                  Booking Status
                  </MenuItem>
                  </Link>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    {user ? (
                      user == ""
                    ) : (
                      <Link to="/login">
                        <Button
                          color="primary"
                          variant="contained"
                          target="_blank"
                          sx={{ width: "172%" }}
                        >
                          Login
                        </Button>
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {user ? (
                      user == ""
                    ) : (
                      <Link to="/register">
                        <Button
                          fullWidth
                          color="primary"
                          variant="outlined"
                          target="_blank"
                          sx={{ width: "150%" }}
                        >
                          Register
                        </Button>
                      </Link>
                    )}
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
