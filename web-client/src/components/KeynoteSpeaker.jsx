import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function KeynoteSpeaker(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "88px",
      "@media (max-width: 900px)": {
        marginBottom: "32px",
      },
    },
    photo: {
      width: "320px",
      height: "320px",
      "@media (max-width: 900px)": {
        marginTop: "48px",
        width: "120px",
        height: "120px",
      },
    },
    name: {
      "@media (min-width: 900px)": {
        marginBottom: "16px",
      },
    },
    speakerInfo: {
      width: "400px",
      textAlign: "left",
      marginLeft: "32px",
      display: "flex",
      flexDirection: "column",
      marginTop: "48px",
      "@media (max-width: 900px)": {
        fontSize: "12px",
        marginTop: "16px",
      },
    },
    spec: {
      fontWeight: "600",
    },
    info: {
      "@media (min-width: 900px)": {
        marginBottom: "32px",
      },
    },
  })();

  return (
    <div className={style.main}>
      <img className={style.photo} src={props.photo} alt="" />
      <div className={style.speakerInfo}>
        <h2 className={style.name}>{props.name}</h2>
        <p className={style.spec}>{props.spec}</p>
        <p className={style.info}>{props.university}</p>
        <p>{props.hobby}</p>
        <p>{props.desc}</p>
      </div>
    </div>
  );
}
