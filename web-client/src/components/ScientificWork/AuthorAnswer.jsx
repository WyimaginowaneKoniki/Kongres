import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function AuthorAnswer(props) {
  const style = makeStyles({
    answer: {
      width: "600px",
      margin: "20px",
      marginLeft: "150px",
      display: "none",
    },
    userInfo: {
      width: "80px",
      alignItems: "center",
    },
    image: {
      objectFit: "cover",
      width: "80px",
      height: "80px",
      borderRadius: "50px",
      boxShadow: "2px 2px 4px #C0C4E233",
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
