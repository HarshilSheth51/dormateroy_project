import { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Divider
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { Navigate } from "react-router-dom";


import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../firebase";
// import { toast, Bounce } from "react-toastify";
import toast from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
export default function AuthLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [username, setusrname] = useState();
  const [user, setUser] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const [authuser, setauthuser] = useState();
  const [login, setlogin] = useState();
  function googlelogin() {
    signInWithPopup(auth, provider).then((data) => {
      setlogin(data.user.email);
    });
  }

  window.gapi.load("auth2", () => {
    window.gapi.auth2
      .init({
        client_id:
          "44173462378-k9v4qckkefkh1ellss40a9ggq1fss99e.apps.googleusercontent.com",
      })
      .then(() => {
        window.gapi.auth2
          .getAuthInstance()
          .signOut()
          .then(function () {
            console.log("User signed out.");
          });
      });
  });

  // var accessToken = gapi.auth.getToken().access_token;
  console.log(email);
  console.log(password);

  function submit() {

    if(email == "hds@gmail.com" && password == "HDS@2608"){
      toast.success('Login Sucessfully',{
        duration:5000,
        style:{borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontSize:'17px',
        fontWeight:'bold'
      }
      });
      navigate("/details");
  }

  

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
         toast.success('Login Sucessfully',{
        duration:6000,
        style:{borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontSize:'17px',
        fontWeight:'bold'
      }
      });
  

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error('Invalid details',{
          duration:4000,
          style:{borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize:'17px',
          fontWeight:'bold'
        }
        });
        
      });
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          name="email"
          required
          onChange={(e) => setemail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faUser} size="md" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            onChange={(e) => setpassword(e.target.value)}
            required
            endAdornment={
              <InputAdornment position="end">
                <div className="icon-buttom">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  // style={{paddingTop:'15px' , marginBottom:'10px'}}
                  
                >
                  <Divider orientation="vertical" flexItem  style={{marginRight:'5px' , backgroundColor:'black'}}/> <br />
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                </div>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faLock} size="md" />
              </InputAdornment>
            }
            label="Password"
            fullWidth
            id="fullWidth"
          />
        </FormControl>
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <RouterLink to="/resetpass">
          <a href={""} className="accout-forgot">
            Forgot Password
          </a>
        </RouterLink>
      </Stack>

      {/* <RouterLink to="/"> */}
      <LoadingButton
        className="login-btn"
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        onClick={submit}
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
        }}
      >
        Login
      </LoadingButton>
      {/* </RouterLink> */}
    </>
  );
}
