import { useState } from "react";
import {
  Stack,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import toast from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.min.css";
export default function AuthRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formerror, seterror] = useState({});
  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    conformpassword: "",
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
    seterror((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handlesubmit = async () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const { firstname, lastname, email, password, conformpassword } = userdata;
    seterror(validate(userdata));
    if (
      firstname &&
      lastname &&
      regex.test(email) &&
      password === conformpassword
    ) {
      await fetch(
        "https://dormatery-project-default-rtdb.firebaseio.com/regidata.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
          }),
        }
      );

      setUserdata({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        conformpassword: "",
      });

      toast.success("Registration Successfully", {
        duration: 4000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontSize: "17px",
          fontWeight: "bold",
        },
      });

      navigate("/");
    } else {
      // toast.error("Invalid Details", {
      //   duration: 4000,
      //   style: {
      //     borderRadius: "10px",
      //     background: "#333",
      //     color: "#fff",
      //     fontSize: "17px",
      //     fontWeight: "bold",
      //   },
      // });
    }

    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function validate(values) {
    const errors = {};
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.firstname) {
      errors.firstname = "Name is Required";
    }

    if (!values.lastname) {
      errors.lastname = "Last name is Required";
    }

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!validRegex.test(values.email)) {
      errors.email = "Email is not valid";
    }

    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length <= 5) {
      errors.password = "Password must be more than 5 characters long";
    }

    if (!values.conformpassword) {
      errors.conformpassword = "Conform Password Required";
    } else if (values.password !== values.conformpassword) {
      errors.conformpassword = "Does not match with Password";
    }

    return errors;
  }

  return (
    <>
      <Stack spacing={1}>
        <TextField
          name="firstname"
          value={userdata.firstname}
          onChange={handlechange}
          id="outlined-basic"
          label="First name"
          variant="outlined"
        />
        <p className="err-message">{formerror.firstname}</p>

        <TextField
          className="last-field"
          name="lastname"
          value={userdata.lastname}
          onChange={handlechange}
          id="outlined-basic"
          label="Last name"
          variant="outlined"
        />
        <p className="err-message">{formerror.lastname}</p>

        <TextField
          name="email"
          value={userdata.email}
          onChange={handlechange}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <p className="err-message">{formerror.email}</p>

        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            fullWidth
            id="fullWidth"
            onChange={handlechange}
            name="password"
            value={userdata.password}
          />
        </FormControl>
        <p className="err-message">{formerror.password}</p>

        <TextField
          name="conformpassword"
          value={userdata.conformpassword}
          onChange={handlechange}
          id="outlined-basic"
          label="Conform Password"
          type="password"
          variant="outlined"
        />
        <p className="err-message">{formerror.conformpassword}</p>

        <LoadingButton
          className="login-btn"
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          onClick={handlesubmit}
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
          Create account
        </LoadingButton>
      </Stack>
    </>
  );
}
