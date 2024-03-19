import React, { useState , useEffect } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import auth from "../../firebase";
import { onAuthStateChanged  , signOut} from "firebase/auth";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [open, setOpen] = useState(false);


  const [user , setuser] = useState();
      useEffect(()=>{
        onAuthStateChanged(auth , user =>{
          if(user){
            setuser(user)
            console.log('hello' , user)
          }
          else{
            console.log("logged out")
            setuser("")
          }
      })
      },[]);

      if(user === ""){
        return(
            console.log("go to loginpage")
        )
      }
  
      const logout = () =>{
          signOut(auth)
      }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Avatar onClick={handleClickOpen} sx={{marginLeft:'3.5rem' , marginBottom:'1rem'}} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
        <Typography>Name:{user.displayName}</Typography>
          <Typography>Email: {user.email}</Typography>
         
          {/* Render other user details here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Link to="/login">
          <Button onClick={logout}>Logout</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
