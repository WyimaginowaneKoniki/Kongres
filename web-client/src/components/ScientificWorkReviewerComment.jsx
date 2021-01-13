import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import defaultPicture from "../images/empty-image.png";

export default function ScientificWorkReviewerComment(props) {
  const style = makeStyles({
    review: {
      width: "600px",
      margin: "20px",
      marginLeft: "60px",
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
    reviewContent: {
      display: "flex",
      flexFlow: "row wrap",
      width: "470px",
      alignItems: "center",
    },
    ratingDiv: {
      width: "50%",
      display: "flex",
    },

    date: {
      width: "50%",
      color: "grey",
    },
    answerText: {
      textAlign: "left",
      fontSize: "16px",
    },
  })();

  const ratingLabels = {
    1: "rejected",
    2: "correct",
    3: "accepted",
  };

  return (
    <div className={style.review}>
      <div className={style.userInfo}>
        <img src={defaultPicture} className={style.image} alt="" />
        <p className={style.userName}>Me</p>
      </div>
      <div className={style.reviewContent}>
        <div className={style.ratingDiv}>
          <Rating max={3} value={props.rating} readOnly />
          <Box ml={2}>{ratingLabels[props.rating]}</Box>
        </div>
        <p className={style.date}>{props.date}</p>
        <p className={style.textReview}>{props.review}</p>
      </div>
    </div>
  );
}
