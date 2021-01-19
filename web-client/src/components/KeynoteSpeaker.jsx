import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function KeynoteSpeaker(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "40px",
    },
    photo: {
      width: "400px",
    },
    speakerInfo: {
      width: "400px",
      textAlign: "left",
      marginLeft: "32px",
      display: "flex",
      flexDirection: "column",
    },
  })();

  return (
    <div className={style.main}>
      <img className={style.photo} src={props.photo} alt="" />
      <div className={style.speakerInfo}>
        <h2 className={style.name}>{props.name}</h2>
        <p className={style.info}>{props.spec}</p>
        <p className={style.info}>{props.university}</p>
        <p className={style.info}>{props.hobby}</p>
        <p className={`${style.info} ${style.desc}`}>{props.desc}</p>
      </div>
    </div>
  );
}
