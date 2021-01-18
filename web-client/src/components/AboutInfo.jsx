import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function AboutInfo(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "left",
    },
    left: {
      marginRight: "24px",
    },
    right: {
      marginLeft: "24px",
    },
    photo: {
      width: "592px",
      height: "374px",
    },
  })();

  const infos = [
    <h2>{props.head}</h2>,
    <p>{props.text}</p>,
    <a className={style.link} href={props.link}>
      {props.adnotation}
    </a>,
  ];
  const image = (
    <img src={props.path} className={style.photo} alt={props.alternativeText} />
  );

  return (
    <div className={style.main}>
      <div className={style.left}>{props.isImageRight ? infos : image}</div>
      <div className={style.right}>{props.isImageRight ? image : infos}</div>
    </div>
  );
}
