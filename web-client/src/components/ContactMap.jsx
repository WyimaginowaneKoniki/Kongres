import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function ContactMap(props) {
  const style = makeStyles({
    map: {
      width: "100%",
      marginLeft: "40px",
    },
  })();

  return (
    <iframe
      className={style.map}
      src={props.path}
      title="Google Maps address Kaszubska 23"
    ></iframe>
  );
}
