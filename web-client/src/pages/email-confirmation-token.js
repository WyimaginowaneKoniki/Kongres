import React, { useState, useEffect } from "react";
import "../App.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { URL_API } from "../Constants";

export default function EmailConfirmationToken() {
  function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
  }

  const durationOfAlert = 4000;

  useEffect(() => {
    // get token and user it 
    // in weird way, but it works!
    // I don't use other ways e.g. send only window.location.search
    // it causes token changes like '+' sign is replaced by space :C
    var params = window.location.search.split("&userId=");

    axios
      .post(`${URL_API}/User/Confirm`, {
        confirmToken: params[0].substr(14),
        userId: params[1],
      })
      .then((response) => {
        console.log(response);
      });
  });

  const [openAlert, SetOpenAlert] = useState(false);

  // Close alert
  const CloseAlert = (_, reason) => {
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
