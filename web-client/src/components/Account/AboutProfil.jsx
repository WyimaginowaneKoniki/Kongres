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
        flexWrap: "wrap",
        fontSize: "10px",
      },
    },
    personInfo: {
      width: "384px",
      textAlign: "left",
      "@media  (max-width: 1250px)": {
        width: "256px",
        lineHeight: "16px",
        marginLeft: '16px',
      },
      "@media  (max-width: 475px)": {
        textAlign: 'center',
        width: "256px",
        lineHeight: "16px",
      },
    },
    photo: {
      height: "184px",
      width: "184px",
      marginRight: "24px",
      "@media  (max-width: 1250px)": {
        marginBottom: '16px',
        marginRight: "0",
        height: "124px",
        width: "124px",
      },
    },
    specialization: {
      fontWeight: "bold",
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
