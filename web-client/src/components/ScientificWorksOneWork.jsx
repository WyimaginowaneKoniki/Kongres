import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { URL_API, LINKS } from "../Constants";
import "../App.css";

function ScientificWorksOneWork(props) {
  const styles = makeStyles({
    main: {
      width: "100%",
      paddingBottom: "300px",
    },
    h2: {
      float: "left",
    },
    panel: {
      width: "100%",
      float: "left",
      marginTop: "-25px",
    },
    category: {
      float: "left",
      fontSize: "12px",
      color: "#3f51b5",
      paddingRight: "2.5%",
    },
    dot: {
      float: "left",
      fontSize: "28px",
      color: "#DCDCDC",
      paddingRight: "2.5%",
    },
    date: {
      float: "left",
      fontSize: "12px",
      paddingRight: "2.5%",
    },
    author: {
      float: "left",
      fontSize: "12px",
    },
    text: {
      width: "94%",
      float: "left",
      textAlign: "left",
      fontSize: "14px",
      paddingBottom: "2%",
    },
    a: {
      textDecoration: "none",
      color: "black",
      fontWeight: "bold",
    },
    buttons: {
      float: "left",
      width: "100%",
    },
    btn1: {
      float: "left",
      marginRight: "5%",
      textTransform: "none",
    },
    btn2: {
      float: "left",
      textTransform: "none",
    },
  });

  const style = styles();

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
      <h2 className={style.h2}>{props.title}</h2>
      <div className={style.panel}>
        <a href={props.link}>
          <p className={style.category}>{props.categories}</p>
        </a>
        <span className={style.dot}>&bull;</span>
        <p className={style.date}>{props.date}</p>
        <span className={style.dot}>&bull;</span>
        <p className={style.author}>{props.authors}</p>
      </div>
      <span className={style.text}>{props.text}</span>
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

export default ScientificWorksOneWork;
