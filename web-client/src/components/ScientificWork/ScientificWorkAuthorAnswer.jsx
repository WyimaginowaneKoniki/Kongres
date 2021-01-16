import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function ScientificWorkAuthorAnswer(props) {
  const style = makeStyles({
    answer: {
      width: "600px",
      margin: "20px",
      marginLeft: "150px",
      display: "flex",
    },
    userInfo: {
      width: "80px",
      alignItems: "center",
    },
    image: {
      width: "80px",
      height: "80px",
      borderRadius: "50px",
    },
    userName: {
      textAlign: "center",
    },
    answerContent: {
      width: "470px",
      alignItems: "center",
    },
    date: {
      color: "grey",
    },
    answerText: {
      textAlign: "left",
      fontSize: "16px",
    },
  })();

  return (
    <div className={style.answer}>
      <div className={style.userInfo}>
        <img src={props.authorPhoto} className={style.image} alt="" />
        <p className={style.userName}>{props.authorName}</p>
      </div>
      <div className={style.answerContent}>
        <p className={style.date}>{props.date}</p>
        <p className={style.answerText}>{props.answer}</p>
      </div>
    </div>
  );
}
