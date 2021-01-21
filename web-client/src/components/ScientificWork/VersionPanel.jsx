import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";
import ReviewerComment from "./ReviewerComment";
import ReviewerCommentInput from "./ReviewerCommentInput";
import AuthorAnswer from "./AuthorAnswer";
import AuthorAnswerInput from "./AuthorAnswerInput";
import { Accordion, AccordionSummary, AccordionDetails, Box } from "@material-ui/core/";
import {RATING} from "../../Constants";
import "../../App.css";

const StyledRating = withStyles({
  iconFilled: {
    color: "#6069A9",
  },
})(Rating);

export default function VersionPanel(props) {
  const style = makeStyles({
    panel: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "16px 80px",
      "@media only screen and (max-width: 768px)": {
        padding: "0px 40px",
      },
      "@media only screen and (max-width: 600px)": {
        padding: "0px 24px",
      },
    },
    version: {
      fontWeight: "bold",
      marginRight: "40px",
      "@media only screen and (max-width: 768px)": {
        marginRight: "16px",
        fontSize: "16px",
      },
    },
    boxRating: {
      lineHeight: "0",
      marginRight: "8px",
    },
    ratingDesc: {
      fontSize: "14px",
    },
    date: {
      color: "#767676",
      fontSize: "16px",
      marginRight: "40px",
      "@media only screen and (max-width: 768px)": {
        fontSize: "14px",
        marginRight: "16px",
      },
    },
    reviews: {
      display: "block",
    },
  })();

  const [reviewsList, setReviewsList] = React.useState([]);

  React.useEffect(() => {
    function GeneratePanelContent(reviews) {
      let reviewsView = [];
      let j = 0;
      let reviewerName = "Me";

      if (reviews && reviews.length > 0) {
        for (let i = 0; i < reviews.length; i++) {
          if (props.mode === "Author") reviewerName = `Reviewer ${i + 1}`;

          reviewsView.push(
            <ReviewerComment
              key={j++}
              rating={reviews[i].rating}
              reviewText={reviews[i].reviewMsg}
              date={reviews[i].reviewDate}
              reviewId={reviews[i].id}
              reviewerName={reviewerName}
              isReviewFileExist={reviews[i].isReviewFileExist}
            />
          );

          if (reviews[i].answerMsg) {
            reviewsView.push(
              <AuthorAnswer
                key={j++}
                answer={reviews[i].answerMsg}
                date={reviews[i].answerDate}
                authorName={props.authorName}
                authorPhoto={props.authorPhoto}
              />
            );
          }
          // when author is on the page and didn't answer yet
          else if (props.mode === "Author") {
            reviewsView.push(
              <AuthorAnswerInput
                key={j++}
                name={props.authorName}
                photo={props.authorPhoto}
                reviewId={reviews[i].id}
              />
            );
          }
        }
      } else if (props.mode === "Reviewer") {
        reviewsView.push(
          <ReviewerCommentInput key={j++} scientificWorkId={props.scientificWorkId} />
        );
      }

      return reviewsView;
    }

    if (props.version) setReviewsList(GeneratePanelContent(props.version.reviews));
  }, [
    props.version,
    props.mode,
    props.authorPhoto,
    props.authorName,
    props.scientificWorkId,
  ]);

  return (
    <div>
      <Accordion>
        {/* Version number, date and rating */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={style.panel}>
            <span className={style.version}>Version {props.version.versionNumber}</span>
            <p className={style.date}>{props.version.date}</p>
            <Box
              component="fieldset"
              borderColor="transparent"
              className={style.boxRating}
            >
              <StyledRating name="customized-color" value={props.version.rating} max={3} readOnly />
            </Box>
            <p className={style.ratingDesc}>{RATING[props.version.rating]}</p>
          </div>
        </AccordionSummary>

        {/* Reviews and comments */}
        <AccordionDetails className={style.reviews} width={1920}>
          {reviewsList}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
