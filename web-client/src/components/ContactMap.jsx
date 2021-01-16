import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function ContactMap(props) {
  const style = makeStyles({
    maps: {
      padding: "2%",
      paddingRight: "5%",
      float: "right",
      marginTop: "5%",
      width: 480,
    },
    map: {
      float: "right",
      display: "block",
      width: "100%",
      height: 480,
    },
  })();

  return (
    <div className={style.maps}>
      <iframe
        className={style.map}
        src={props.path}
        title="Google Maps address Kaszubska 23"
      ></iframe>
    </div>
  );
}
