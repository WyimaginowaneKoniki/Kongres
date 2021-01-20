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
      width: "80px",
      height: "80px",
      "@media (max-width: 500px)": {
        width: "40px",
        height: "40px",
      },
    },
    info: {
      marginLeft: "72px",
      "@media (max-width: 500px)": {
        marginLeft: "36px",
        fontSize: "12px",
      },
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
      <img
        src={props.path}
        className={style.photo}
        alt={props.alternativeText}
      />
      <div className={style.info}>{props.link ? showLink : showAddress}</div>
    </div>
  );
}
