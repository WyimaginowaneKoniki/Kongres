import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../App.css";

export default function MyReviewsOneReview(props) {
  const style = makeStyles({
    main: {
      width: "100%",
      paddingBottom: "300px",
    },
    main: {
      marginBottom: "80px",
      textAlign: "left",
    },
    title: {
      marginBottom: "8px",
      "&:hover": {
        cursor: "pointer",
      },
      "@media only screen and (max-width: 768px)": {
        fontSize: "1em",
      },
    },
    panel: {
      display: "flex",
      flexWrap: "wrap",
      fontSize: "16px",
      lineHeight: "1.4em",
      marginBottom: "8px",
      "@media only screen and (max-width: 768px)": {
        fontSize: "0.8em",
      },
    },
    category: {
      color: "#6069A9",
      marginRight: "16px",
    },
    dot: {
      fontSize: "28px",
      color: "#C0C4E2",
      marginRight: "16px",
    },
    date: {
      marginRight: "16px",
      color: "#767676",
    },
    author: {
      color: "#767676",
    },
    text: {
      marginBottom: "16px",
      "@media only screen and (max-width: 768px)": {
        fontSize: "0.9em",
        lineHeight: "1.5em",
      },
    },
    a: {
      textDecoration: "none",
      color: "black",
      fontWeight: "bold",
    },
    buttons: {
      display: "flex",
      flexWrap: "wrap",
    },
    btn1: {
      marginRight: "24px",
      marginBottom: "8px",
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#F1F3FF",
      },
    },
    btn2: {
      marginBottom: "8px",
    },
    btnStatus: {
      color: "#775866",
      backgroundColor: "#F0D4E0",
      padding: "4px 8px",
      marginRight: "16px",
      marginBottom: "8px",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#F0D4E0",
        boxShadow: "none",
      },
    },
  })();

  //https://www.xspdf.com/resolution/50694881.html <- information for button download
  return (
    <div className={style.main}>
      <Button variant="contained" className={style.btnStatus}>
        Waiting for Review
      </Button>
      <h2 className={style.h2}>{props.title}</h2>
      <div className={style.panel}>
        <a href={props.link}>
          <p className={style.category}>{props.categories}</p>
        </a>
        <span className={style.dot}>&bull;</span>
        <p className={style.date}>
          {props.data} (Edited: {props.modificationDate})
        </p>
        <span className={style.dot}>&bull;</span>
        <p className={style.author}>{props.authors}</p>
      </div>
      <p className={style.text}>{props.text}</p>
      <div className={style.buttons}>
        <Button variant="outlined" color="primary" className={style.btn1}>
          Download full work
        </Button>
        <Button variant="contained" color="primary" className={style.btn2}>
          Add review
        </Button>
      </div>
    </div>
  );
}
