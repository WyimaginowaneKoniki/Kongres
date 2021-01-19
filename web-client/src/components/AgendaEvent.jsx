import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function AgendaEvent(props) {
  const style = makeStyles({
    main: {
      width: "70%",
      margin: "auto",
      display: "flex",
      marginBottom: "24px",
      borderRadius: "4px",
      padding: "1em",
      backgroundColor: "#DFE2F8",
      textAlign: "left",
      "@media (max-width: 1100px)": {
        flexWrap: "wrap",
      },
    },
    title: {
      color: "#54457F",
      "@media (max-width: 1000px)": {
        fontSize: "16px",
      },
    },
    time: {
      width: "130px",
      opacity: 0.8,
      color: "#54457F",
      "@media (max-width: 1100px)": {
        width: "88px",
        fontSize: "14px",
        marginLeft: "16px",
      },
    },
    desc: {
      color: "#59546C",
      "@media (max-width: 1000px)": {
        fontSize: "14px",
      },
    },
    info: {
      marginLeft: "40px",
      "@media (max-width: 1100px)": {
        marginLeft: "16px",
      },
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
