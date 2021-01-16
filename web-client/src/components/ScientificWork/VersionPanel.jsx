import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Rating from "@material-ui/lab/Rating";
import ReviewerComment from "./ReviewerComment";
import ReviewerCommentInput from "./ReviewerCommentInput";
import AuthorAnswer from "./AuthorAnswer";
import AuthorAnswerInput from "./AuthorAnswerInput";
import "../../App.css";

export default function VersionPanel(props) {
  const style = makeStyles({
    panel: {
      padding: "20px",
      display: "flex",
      width: "800px",
      alignItems: "center",
    },
    version: {
      width: "100px",
      marginLeft: "80px",
    },
    date: {
      width: "300px",
    },
  })();

  const [isPanelOpen, setIsPanelOpen] = React.useState(true);
  const [reviewsList, setReviewsList] = React.useState([]);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

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
          <ReviewerCommentInput
            key={j++}
            scientificWorkId={props.scientificWorkId}
          />
        );
      }

      return reviewsView;
    }

    if (props.version)
      setReviewsList(GeneratePanelContent(props.version.reviews));
  }, [
    props.version,
    props.mode,
    props.authorPhoto,
    props.authorName,
    props.scientificWorkId,
  ]);

  return (
    <div>
      <div className={style.panel} onClick={togglePanel}>
        <span className={style.version}>
          Version {props.version.versionNumber}
        </span>
        <p className={style.date}>{props.version.date}</p>
        <Rating value={2} max={3} readOnly />
        {isPanelOpen ? (
          <ArrowDropDownIcon className={style.arrow} />
        ) : (
          <ArrowDropUpIcon className={style.arrow} />
        )}
      </div>
      {isPanelOpen && reviewsList}
    </div>
  );
}
