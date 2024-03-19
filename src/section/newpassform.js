import { useState } from "react";

// @mui
import {
  Stack,
  TextField
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Link } from "react-router-dom";

export default function NewPasswordForm() {
  

  return (
    <Stack spacing={3}>
      <TextField
        id="outlined-basic"
        label="Enter email"
        variant="outlined"
        name="password"
      />

      <TextField
        id="outlined-basic"
        type="password"
        label="Enter Password"
        variant="outlined"
        name="password"
      />

      <TextField
        id="outlined-basic"
        type="password"
        label="Enter Conform Password"
        variant="outlined"
        name="password"
      />

      <Link to="/login">
        <LoadingButton
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
          Update Password
        </LoadingButton>
      </Link>
    </Stack>
  );
}
