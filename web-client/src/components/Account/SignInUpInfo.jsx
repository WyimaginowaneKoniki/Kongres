import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../App.css";
import { Link } from "react-router-dom";

export default function SignInUpInfo(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
    },
    content: {
      justifyContent: "center",
      textAlign: "center",
      fontSize: "0.8em",
      marginBottom: "40px",
      width: "80%",
    },
  })();

  return (
    <div className={style.main}>
      <p className={style.content}>
        {props.content} <Link to={props.link}>{props.textLink}</Link>
      </p>
    </div>
  );
}
