import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Person } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import auth from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState("");
  const [firstname, setfirstname] = useState({});
  const [lastname, setlastname] = useState({});
  const [username, setusrname] = useState();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl("");
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    const authstate = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("hello", user);
      } else {
        console.log("logged out");
        setUser("");
      }
    });

    return () => authstate();
  }, []);

  

  useEffect(() => {
    fetch("https://dormatery-project-default-rtdb.firebaseio.com/regidata.json")
      .then((res) => res.json())
      .then((data) => {
        let newobj = Object.values(data);
        const foundUser = newobj.find((obj) => user.email === obj.email);
        if (foundUser) {
          console.log(foundUser.firstname);
          setusrname(foundUser.firstname + foundUser.lastname);
        } else {
          console.log("user not found");
        }
      });
  }, [user]);

  const logout = () => {
    signOut(auth);
    toast.success("Thanks for choosing us!", {
      duration: 4000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        fontSize: "17px",
        fontWeight: "bold",
      },
    });
  };

  if (user === false) {
    return "got to loginpage";
  }

  return (
    <React.Fragment>
      {user && ( // Add conditional rendering for the entire component
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            marginRight: "0.5rem",
            marginTop: "5px",
          }}
        >
          <Tooltip title="Profile">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {user && (
                <Badge
                  color="success"
                  overlap="circular"
                  badgeContent="Active"
                  style={{ paddingBottom: "5px", paddingLeft: "10px" }}
                >
                  {/* <Avatar sx={{ width: 32, height: 32 }} /> */}
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-JmDfLz7ErRiTZ9vIme55A9JGQqdx8qJ_xQ_lB2UIqGAFELpsKQQ8xuTSrlqrly-tSQ&usqp=CAU" alt=""  height={50} width={50} style={{borderRadius:'50%',
                  border:'2px solid white'
                }}/>
                </Badge>
              )}
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 11,
              height: 11,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 5,
              height: 5,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user && (
          <Typography
            sx={{ fontSize: "17px", color: "green", paddingLeft: "1rem" }}
          >
            Online
          </Typography>
        )}
        {
          <Typography sx={{ textAlign: "center", fontSize: "15px" }}>
            <MenuItem sx={{fontFamily: "Josefin Sans" , fontWeight:'bold'}}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              {username}
            </MenuItem>
          </Typography>
        }
        <Divider sx={{marginTop:"5px", marginBottom:'5px'}}/>
        <Link to="/">
          <MenuItem onClick={logout} sx={{fontFamily: "Josefin Sans" , fontWeight:'bold'}}>
            <ListItemIcon>
              <Logout fontSize="smll" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
}
