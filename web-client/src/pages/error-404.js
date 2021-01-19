import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import { NavLink } from "react-router-dom";
import background from "../images/404.png";

export default function Error404() {
  const style = makeStyles({
    photo: {
      width: "90%",
    },
    linkButton: {
      textDecoration: "none",
      textTransform: "none",
    },
  })();

  return (
    <div>
      <h1 className={style.title}>Oops! Page not found</h1>
      <NavLink exact to="/" className={style.linkButton}>
        <Button color="primary" variant="contained" className={style.linkButton}>
          Go to home
        </Button>
      </NavLink>
      <div><img className={style.photo} src={background} alt="404"/></div>
    </div>
  );
}
