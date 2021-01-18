import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { Box, Button } from "@material-ui/core/";
import defaultPicture from "../../images/empty-image.png";
import axios from "axios";
import { URL_API, RATING } from "../../Constants";

export default function ReviewerComment(props) {
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
    reviewText: {
      textAlign: "left",
      fontSize: "16px",
    },
    btn: {
      textTransform: "none",
      width: "150px",
      height: "45px",
      margin: "5px",
    },
  })();

  const downloadReview = () => {
    const token = localStorage.getItem("jwt");
    axios
      .get(`${URL_API}/Review/Download/${props.reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      })
      .then((resp) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([resp.data], { type: "application/pdf" })
        );
        link.download = "Review.pdf";
        link.click();
      });
  };

  return (
    <div className={style.review}>
      <div className={style.userInfo}>
        <img src={defaultPicture} className={style.image} alt="" />
        <p className={style.userName}>{props.reviewerName}</p>
      </div>
      <div className={style.reviewContent}>
        <div className={style.ratingDiv}>
          <Rating max={3} value={props.rating} readOnly />
          <Box ml={2}>{RATING[props.rating]}</Box>
        </div>
        <p className={style.date}>{props.date}</p>
        <div>
          {/* review text */}
          {props.reviewText && (
            <p className={style.textReview}>{props.reviewText}</p>
          )}

          {/* review file (button to download) */}
          {props.isReviewFileExist && (
            <Button
              variant="contained"
              color="primary"
              className={style.btn}
              onClick={downloadReview}
            >
              Download review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
