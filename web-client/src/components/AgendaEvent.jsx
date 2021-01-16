import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

function AgendaEvent(props) {
  const styles = makeStyles({
    main: {
      padding: "2%",
    },
    title: {
      textAlign: "left",
      margin: "0 25%",
      width: "60%",
    },
    time: {
      textAlign: "center",
      width: "20%",
      margin: "0",
    },
    desc: {
      textAlign: "left",
      margin: "0 20%",
      display: "block",
      width: "60%",
    },
  });

  const style = styles();

  return (
    <div className={style.main}>
      <h2 className={style.title}>{props.title}</h2>
      <h3 className={style.time}>
        {props.time1} - {props.time2}
      </h3>
      <span className={style.desc}>{props.content}</span>
    </div>
  );
}

export default AgendaEvent;
