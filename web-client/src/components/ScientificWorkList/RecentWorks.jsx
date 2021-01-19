import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../App.css";

export default function RecentWorks(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      alignItems: "center",
      marginBottom: "32px",
    },
    worksInfo: {
      flexDirection: "column",
      fontSize: "14px",
      lineHeight: "1.5em",
    },
    photo: {
      height: "56px",
      width: "56px",
      borderRadius: "50%",
      marginRight: "16px",
    },
    name: {
      fontWeight: "bold",
    },
  })();

  return (
    <div className={style.main}>
      <img src={props.path} className={style.photo} alt="" />
      <div className={style.worksInfo}>
        <p className={style.name}>{props.name}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
