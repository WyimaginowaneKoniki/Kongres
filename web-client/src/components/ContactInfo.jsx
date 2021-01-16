import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function ContactInfo(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: "40px",
    },
    photo: {
      width: "60px",
    },
    info: {
      marginLeft: "16px",
    },
    a: {
      textDecoration: "none",
      color: "black",

      "&:hover": {
        color: "grey",
      },
    },
  })();

  const showLink = (
    <a href={props.link} className={style.a}>
      <h3 className={style.text}>{props.name}</h3>
    </a>
  );
  const showAddress = <h3 className={style.text}>{props.name}</h3>;

  return (
    <div className={style.main}>
      <img src={props.path} className={style.photo} alt={props.alternativeText}></img>
      <div className={style.info}>{props.link ? showLink : showAddress}</div>
    </div>
  );
}
