import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Rating from "@material-ui/lab/Rating";
import ScientificWorkReviewerComment from "../components/ScientificWorkReviewerComment";
import ScientificWorkAuthorAnswer from "../components/ScientificWorkAuthorAnswer";
import CurrentVersionWithReplyToReview from "../components/CurrentVersionWithReplyToReview";
import "../App.css";

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

  const [isOpenPanel, setIsOpenPanel] = React.useState(true);
  const [reviewsList, setReviewsList] = React.useState([]);

  const togglePanel = () => setIsOpenPanel(!isOpenPanel);

  React.useEffect(() => {
    function foo(reviews) {
      var reviewsView = [];

      if (reviews) {
        let i = 1;
        reviews.map((review) => {
          reviewsView.push(
            <ScientificWorkReviewerComment
              key={i++}
              rating={review.rating}
              review={review.reviewMsg}
              date={review.reviewDate}
            />
          );

          if (props.mode === "Author" && !review.answerMsg) {
            reviewsView.push(
              <CurrentVersionWithReplyToReview
                key={i++}
                name={props.authorName}
                path={props.authorPhoto}
              />
            );
          } else if (review.answerMsg) {
            reviewsView.push(
              <ScientificWorkAuthorAnswer
                key={i++}
                answer={review.answerMsg}
                date={review.answerDate}
                authorName={props.authorName}
                authorPhoto={props.authorPhoto}
              />
            );
          }
        });
      } else {
        // if mode == reviewer => add new review component
      }

      return reviewsView;
    }

    if (props.version) setReviewsList(foo(props.version.reviews));
  }, [props.version, props.mode, props.authorPhoto, props.authorName]);

  return (
    <div>
      <div className={style.panel} onClick={togglePanel}>
        <span className={style.version}>
          Version {props.version.versionNumber}
        </span>
        <p className={style.date}>{props.version.date}</p>
        <Rating value={2} max={3} readOnly />
        {isOpenPanel ? (
          <ArrowDropDownIcon className={style.arrow} />
        ) : (
          <ArrowDropUpIcon className={style.arrow} />
        )}
      </div>
      {isOpenPanel && reviewsList}
    </div>
  );
}
