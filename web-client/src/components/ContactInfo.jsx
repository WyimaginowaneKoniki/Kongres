import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function ContactInfo(props) {
  const style = makeStyles({
    main: {
      paddingTop: "3%",
      paddingLeft: "5%",
      width: "50%",
      float: "left",
    },
    left: {
      width: "30%",
      float: "left",
    },
    right: {
      float: "left",
      marginTop: "2%",
    },
    photo: {
      display: "block",
      width: "70%",
      borderRadius: "50%",
    },
    text: {
      fontWeight: "normal",
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
      <div className={style.left}>
        <img
          src={props.path}
          className={style.photo}
          alt={props.alternativeText}
        />
      </div>
      <div className={style.right}>{props.link ? showLink : showAddress}</div>
    </div>
  );
}
