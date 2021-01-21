import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function AuthorAnswer(props) {
  const style = makeStyles({
    answer: {
      width: "600px",
      marginLeft: "144px",
      marginTop: "16px",
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "48px",
      "@media only screen and (max-width: 1080px)": {
        marginLeft: "64px",
        fontSize: "16px",
      },
      "@media only screen and (max-width: 768px)": {
        width: "80vw",
        marginLeft: "0",
        justifyContent: "flex-start",
      },
    },
    userInfo: {
      width: "80px",
      alignItems: "center",
    },
    image: {
      objectFit: "cover",
      width: "72px",
      height: "72px",
      borderRadius: "50px",
      boxShadow: "2px 2px 4px #C0C4E233",
      "@media only screen and (max-width: 1080px)": {
        width: "40px",
        height: "40px",
      },
    },
    userName: {
      textAlign: "center",
      lineHeight: "1.2em",
      fontSize: "16px",
      "@media only screen and (max-width: 1080px)": {
        fontSize: "12px",
        lineHeight: "1em",
      },
    },
    answerContent: {
      marginLeft: "24px",
      textAlign: "left",
      "@media only screen and (max-width: 1080px)": {
        fontSize: "16px",
      },
      "@media only screen and (max-width: 768px)": {
        marginLeft: "8px",
      },
    },
    date: {
      fontSize: "14px",
      color: "#767676",
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
