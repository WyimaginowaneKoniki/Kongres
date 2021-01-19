import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { URL_API, LINKS } from "../../Constants";
import "../../App.css";

export default function OneWork(props) {
  const style = makeStyles({
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
  })();

  const history = useHistory();

  const readMore = () => {
    const path = `${LINKS.WORKS}/${props.id}`;
    history.push({
      pathname: path,
      state: { detail: props.id },
    });
  };

  const downloadFile = () => {
    const token = localStorage.getItem("jwt");

    axios
      .get(`${URL_API}/ScientificWork/Download/${Number(props.id)}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      })
      .then((resp) => {
        const pdf = window.URL.createObjectURL(
          new Blob([resp.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = pdf;
        link.download = `${props.title.replaceAll(" ", "-")}.pdf`;
        link.click();
      });
  };

  //https://www.xspdf.com/resolution/50694881.html <- informacje do buttona download
  return (
    <div className={style.main}>
      <h2 className={style.title} onClick={readMore}>
        {props.title}
      </h2>
      <div className={style.panel}>
        <a href={props.link}>
          <p className={style.category}>{props.categories}</p>
        </a>
        <span className={style.dot}>&bull;</span>
        <p className={style.date}>{props.date}</p>
        <span className={style.dot}>&bull;</span>
        <p className={style.author}>{props.authors}</p>
      </div>
      <p className={style.text}>{props.text}</p>
      <div className={style.buttons}>
        <Button
          variant="outlined"
          color="primary"
          className={style.btn1}
          onClick={downloadFile}
        >
          Download full work
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={style.btn2}
          onClick={readMore}
        >
          Read more
        </Button>
      </div>
    </div>
  );
}
