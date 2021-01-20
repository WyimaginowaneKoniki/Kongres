import React, { useEffect } from "react";
import "../App.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { URL_API, LINKS } from "../Constants";

export default function EmailConfirmationToken() {
  function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
  }

  const durationOfAlert = 4000;

  const history = useHistory();

  useEffect(() => {
    // get token and user itd
    // in weird way, but it works!
    // I don't use other ways e.g. send only window.location.search
    // it causes token changes like '+' sign is replaced by space :C
    var params = window.location.search.split("&userId=");

    if(!window.location.search.includes("?"))
    history.push({
      pathname: "/",
    });

    axios
      .post(`${URL_API}/User/Confirm`, {
        confirmToken: params[0].substr(14),
        userId: params[1],
      })
      .then((response) => {
        if(response.status === 200) {
          SetOpenAlert(true);
        }
      });
  },[]);

  const [openAlert, SetOpenAlert] = React.useState(false);

  // Close alert
  const CloseAlert = (_, reason) => {
    if (reason === "clickaway") return;

    SetOpenAlert(false);

    const path = LINKS.PARTICIPANT_LOGIN;
    history.push({
      pathname: path,
    });
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
