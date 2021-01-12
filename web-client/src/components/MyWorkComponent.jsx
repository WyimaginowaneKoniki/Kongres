import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

function MyWorkComponent(props) {
  const styles = makeStyles({
    main: {
      width: "80%",
      margin: "auto",
    },
    left: {
      width: "29%",
      float: "left",
      height: 600,
      border: "2px solid black",
    },
    right: {
      width: "70%",
      float: "right",
    },
    status: {
      width: "100%",
      float: "left",
      textAlign: "left",
      paddingLeft: "5%",
      color: "red",
    },
    date: {
      width: "100%",
      float: "left",
      textAlign: "left",
      paddingLeft: "5%",
      fontSize: "12px",
    },
    h1: {
      width: "100%",
      float: "left",
      textAlign: "left",
      paddingLeft: "5%",
      fontSize: "30px",
    },
    author: {
      width: "45%",
      float: "left",
      paddingLeft: "5%",
      textAlign: "left",
    },
    shared: {
      width: "100%",
      float: "left",
      color: "grey",
    },
    photo: {
      width: "90%",
      borderRadius: "50%",
      height: 80,
    },
    leftTitle: {
      width: "28%",
      float: "left",
    },
    rightTitle: {
      width: "70%",
      float: "right",
    },
    authorName: {
      paddingTop: "5%",
      width: "100%",
      float: "right",
      fontWeight: "bold",
    },
    degree: {
      width: "100%",
      float: "right",
      fontSize: "12px",
    },
    university: {
      width: "100%",
      float: "right",
      fontSize: "12px",
      color: "grey",
    },
    authors: {
      width: "45%",
      float: "right",
      paddingLeft: "5%",
    },
    other: {
      width: "100%",
      float: "left",
      textAlign: "left",
      color: "grey",
    },
    otherName: {
      width: "100%",
      float: "left",
      textAlign: "left",
      marginTop: "6%",
      fontWeight: "bold",
    },
    text: {
      width: "85%",
      float: "left",
      textAlign: "left",
      paddingLeft: "5%",
    },
    btn: {
      textTransform: "none",
    },
    btn1: {
      textTransform: "none",
      marginLeft: "5%",
      float: "left",
    },
  });

  const style = styles();

  return (
    <div className={style.main}>
      <embed src={props.workPDF} className={style.left} />

      <div className={style.right}>
        <Tooltip title="Status" placement="top-start">
          <span className={style.status}>{props.status}</span>
        </Tooltip>
        <span className={style.date}>
          <span>{props.currentDate}</span>
          <span>&nbsp; (Edited: {props.modificationDate}) &nbsp;</span>
          <span>
            {" "}
            <Button variant="contained" color="primary" className={style.btn}>
              {props.name}
            </Button>{" "}
          </span>
        </span>
        <h1 className={style.h1}>{props.title}</h1>
        <div className={style.author}>
          <span className={style.shared}>Shared by</span>
          <p className={style.leftTitle}>
            <img
              src={props.authorPhoto}
              className={style.photo}
              alt={props.authorName}
            ></img>
          </p>
          <p className={style.rightTitle}>
            <span className={style.authorName}>{props.authorName}</span>
            <span className={style.degree}>{props.degree}</span>
            <span className={style.university}>{props.university}</span>
          </p>
        </div>
        <div className={style.authors}>
          <span className={style.other}>Other authors</span>
          <span className={style.otherName}>{props.authors}</span>
        </div>
        <p className={style.text}>{props.text}</p>

        <Button variant="outlined" color="primary" className={style.btn1}>
          Download full work
        </Button>
        <Button variant="contained" color="primary" className={style.btn1}>
          Add new version
        </Button>
      </div>
    </div>
  );
}

export default MyWorkComponent;
