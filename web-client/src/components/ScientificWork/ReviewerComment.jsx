import React from "react";
import "../../App.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { Box, Button } from "@material-ui/core/";
import defaultPicture from "../../images/default-avatar.png";
import axios from "axios";
import { URL_API, RATING } from "../../Constants";

const StyledRating = withStyles({
  iconFilled: {
    color: "#6069A9",
  },
})(Rating);

export default function ReviewerComment(props) {
  const style = makeStyles({
    review: {
      width: "600px",
      display: "flex",
      marginLeft: "40px",
    },
    userInfo: {
      // width: "80px",
      alignItems: "center",
    },
    image: {
      width: "80px",
      height: "80px",
      borderRadius: "50px",
    },
    userName: {
      textAlign: "center",
      fontSize: "16px",
    },
    reviewContent: {
      marginLeft: "24px",
      textAlign: "left",
    },
    rating: {
      display: "flex",
    },
    ratingDateDiv: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
    },
    ratingDesc: {
      fontSize: "14px",
    },
    boxRating: {
      lineHeight: "0",
      marginRight: "4px",
    },
    date: {
      fontSize: "14px",
      color: "#767676",
      marginRight: "24px",
    },
    reviewText: {
      textAlign: "left",
      fontSize: "16px",
      marginLeft: "4px",
    },
    btn: {
      marginTop: "16px",
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
        <div className={style.ratingDateDiv}>
          <p className={style.date}>{props.date}</p>
          {/* <Rating max={3} value={props.rating} readOnly />
          <Box ml={2}>{RATING[props.rating]}</Box> */}
          <div className={style.rating}>
            <Box
              component="fieldset"
              borderColor="transparent"
              className={style.boxRating}
            >
              <StyledRating
                name="customized-color"
                value={props.rating}
                max={3}
                readOnly
              />
            </Box>
            <p className={style.ratingDesc}>{RATING[props.rating]}</p>
          </div>
        </div>

        <div>
          {/* review text */}
          {props.reviewText && <p className={style.textReview}>{props.reviewText}</p>}

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
