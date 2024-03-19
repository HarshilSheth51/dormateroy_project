import { LoadingButton } from "@mui/lab";
import { TextField  , InputAdornment} from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth"; // Import sendPasswordResetEmail from Firebase Auth
import auth from "../firebase";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEnvelope } from "@fortawesome/free-solid-svg-icons";


export default function AuthResetPasswordForm() {
  const [email , setemail] = useState("");

  const onSubmit = async () => {
    sendPasswordResetEmail(auth , email)
    .then(()=>{
      toast.info('Link will be sent your email', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }).catch((err) =>{
      alert(err.code)

    })
  };

  return (
   <>      
   
   <TextField
        id="outlined-basic"
        label="Enter email"
        variant="outlined"
        onChange={(e) => setemail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FontAwesomeIcon icon={faEnvelope} size="md"/>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
      onClick={onSubmit}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
          padding: "15px",
          borderRadius: "10px",
          marginTop: "50px",
        }}
      >
        Send Request
      </LoadingButton>
      </>

  );
}
