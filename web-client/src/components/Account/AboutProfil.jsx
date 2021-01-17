import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../App.css";

export default function AboutProfil(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "40px",
    },
    photo: {
      height: 150,
      marginRight: "24px",
    },
    h3: {
      textAlign: "left",
    },
    p: {
      textAlign: "left",
    },
  })();

  return (
    <div className={style.main}>
      <img src={props.path} alt={props.name} className={style.photo}></img>
      <div className={style.personInfo}>
        <h3 className={style.h3}>{props.name}</h3>
        <p className={style.p}>{props.description}</p>
      </div>
    </div>
  );
}
