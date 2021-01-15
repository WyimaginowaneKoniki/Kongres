import React, { useState, useEffect } from "react";
import "../App.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function EmailConfirmationToken() {
  function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
  }

  const durationOfAlert = 4000;


  useEffect(() => {

    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    const id = url.searchParams.get("userId");
    console.log(`token: ${token}\nid: ${id}`);
  });

  const [openAlert, SetOpenAlert] = useState(false);

  // Close alert
  const CloseAlert = (event, reason) => {
    if (reason === "clickaway") return;

    SetOpenAlert(false);
  };

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={durationOfAlert}
      onClose={CloseAlert}
    >
      <Alert onClose={CloseAlert} severity={"success"}>
        {"Signed up successfully!"}
      </Alert>
    </Snackbar>
  );
}
