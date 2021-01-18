import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../App.css";
import { Link } from "react-router-dom";

export default function SignInUpInfo(props) {
  const style = makeStyles({
    main: {
      padding: "2%",
      display: "flex",
      justifyContent: "center",
    },
    content: {
      display: "block",
      justifyContent: "center",
      textAlign: "left",
      margin: "0 20%",
      width: "30%",
    },
  })();

  return (
    <div className={style.main}>
      <p className={style.content}>
        {props.content} <Link to={props.signUpAsOtherLink}>here...</Link>
      </p>
    </div>
  );
}
