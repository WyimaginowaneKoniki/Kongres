import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function AgendaEvent(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "flexStart",
      padding: "24px",
      marginBottom: "24px",
      backgroundColor: "#DFE2F8",
    },
    title: {
      textAlign: "left",
    },
    time: {
      textAlign: "left",
      width: "320px",
    },
    desc: {
      textAlign: "left",
    },
  })();

  return (
    <div className={style.main}>
      <h3 className={style.time}>
        {props.time1} - {props.time2}
      </h3>
      <div className={style.eventInfo}>
        <h2 className={style.title}>{props.title}</h2>
        <p className={style.desc}>{props.content}</p>
      </div>
    </div>
  );
}
