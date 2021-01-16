import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";

function ContactMap(props) {
  const styles = makeStyles({
    map: {
      width: "100%",
      marginLeft: "40px",
    },
  });

  const style = styles();

  return (
    <iframe
      className={style.map}
      src={props.path}
      title="Google Maps address Kaszubska 23"
    ></iframe>
  );
}

export default ContactMap;
