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
      "@media (min-width: 500px) and (max-width: 1250px)": {
        fontSize: "12px",
      },
      "@media (max-width: 500px)": {
        fontSize: "10px",
      },
    },
    personInfo: {
      width: "384px",
      textAlign: "left",
      "@media (min-width: 500px) and (max-width: 1250px)": {
        width: "256px",
      },
      "@media (max-width: 500px)": {
        width: "212px",
      },
    },
    photo: {
      height: "184px",
      width: "184px",
      marginRight: "24px",
      "@media (min-width: 500px) and (max-width: 1250px)": {
        height: "124px",
        width: "124px",
      },
      "@media (max-width: 500px)": {
        height: "80px",
        width: "80px",
      },
    },
    specialization: {
      fontWeight: "600",
    },
  })();

  return (
    <div className={style.main}>
      <img src={props.path} alt={props.name} className={style.photo}></img>
      <div className={style.personInfo}>
        <h3>{props.name}</h3>
        <p className={style.specialization}>{props.specialization}</p>
        <p>{props.hobby}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
