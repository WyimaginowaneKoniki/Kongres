import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function AgendaEvent(props) {
  const style = makeStyles({
    main: {
      width: '70%',
      margin: 'auto',
      display: "flex",
      justifyContent: "flexStart",
      marginBottom: "24px",
      padding: "1em",
      borderRadius: "4px",
      backgroundColor: "#DFE2F8",
      textAlign: "left",
    },
    title: {
      color: "#54457F",
    },
    time: {
      width: "130px",
      opacity: 0.8,
      color: "#54457F",
    },
    desc: {
      color: "#59546C",
    },
    info: {
      marginLeft: "40px",
    },
  })();

  return (
    <div className={style.main}>
      <h3 className={style.time}>
        {props.time1} - {props.time2}
      </h3>
      <div className={style.info}>
        <h2 className={style.title}>{props.title}</h2>
        <p className={style.desc}>{props.content}</p>
      </div>
    </div>
  );
}
