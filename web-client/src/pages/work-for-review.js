import React, { useState } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import picture from "../images/empty-image.png";
import Rating from "@material-ui/lab/Rating";
import CurrentVersion from "../components/CurrentVersion";
import WorkForReviewComponent from "../components/WorkForReviewComponent";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

function WorkForReview(props) {
  const styles = makeStyles({
    path: {
      width: "70%",
      padding: "2%",
      paddingLeft: "10%",
      float: "left",
      textAlign: "left",
      color: "grey",
      fontSize: "14px",
    },
    title: {
      fontWeight: "bold",
    },
    menu: {
      float: "left",
      width: "80%",
      marginTop: "5%",
      marginLeft: "10%",
    },
    row: {
      padding: "2%",
      float: "left",
      width: "80%",
    },
    version: {
      float: "left",
      marginLeft: "8%",
    },
    arrow: {
      float: "right",
    },
  });

  const style = styles();

  const scientificWork = {
    status: "Status",
    currentDate: "30/11/2020",
    modificationDate: "15/11/2020",
    name: "Mathematics",
    title: "Importance of Golden Ratio in Mathematics",
    path: picture,
    alternativeText: "Photo John Doe",
    author: "John Doe",
    degree: "PhD in Computer Science",
    university: "Silesian University of Technology",
    authors: "Sam Smith, Ashley Blue",
    text:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ",
  };

  const versions = [
    {
      title: "Current Version",
      date: "30/12/2020",
      stars: 3,
      reviews: [
          {
              path: picture,
              date: "30/12/2020",
              stars: 3,
              textReview: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
          }
      ]
    },
    {
      title: "Previous Version",
      date: "20/11/2020",
      stars: 2,
      reviews: [
        {
            path: picture,
            date: "20/11/2020",
            stars: 2,
            textReview: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
        }
    ]
    },
    {
      title: "Previous Version",
      date: "10/11/2020",
      stars: 2,
      reviews: [
        {
            path: picture,
            date: "10/11/2020",
            stars: 2,
            textReview: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
        }
    ]
    },
    {
      title: "Previous Version",
      date: "05/12/2020",
      stars: 1,
      reviews: [
        {
            path: picture,
            date: "05/11/2020",
            stars: 1,
            textReview: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
        }
    ]
    },
  ];
  
  // by default every version should be closed (exept first one)
  const [open, setOpen] = useState([true, ...(new Array(versions.length - 1).fill(false))]);

  function handleOnClick(item) {
    if (!open[item])
      open[item] = true;
    else
      open[item] = false;

    setOpen([...open]);
  }

  const reviewList = versions.map((review, i) => (
    <div>
      <div className={style.row} onClick={() => handleOnClick(i)}>
        <span className={style.version}> {review.title} </span>
        <span className={style.version}> {review.date} </span>
        <Rating value={review.stars} max={3} className={style.version} readOnly />
        {open[i] ? 
          <ArrowDropDownIcon className={style.arrow} />
        : <ArrowDropUpIcon className={style.arrow} />}
      </div>
      {open[i] ? 
        <CurrentVersion
          path={review.reviews[0].path}
          stars={review.reviews[0].stars}
          review={review.reviews[0].textReview}
        /> : null}
    </div>
  ));

  return (
    <div className={style.main}>
      <p className={style.path}>
        Scientific works /{" "}
        <span className={style.title}>{scientificWork.title}</span>
      </p>
      <WorkForReviewComponent
        status={scientificWork.status}
        currentDate={scientificWork.currentDate}
        modificationDate={scientificWork.modificationDate}
        name={scientificWork.name}
        title={scientificWork.title}
        path={scientificWork.path}
        alternativeText={scientificWork.alternativeText}
        author={scientificWork.author}
        degree={scientificWork.degree}
        university={scientificWork.university}
        authors={scientificWork.authors}
        text={scientificWork.text}
      />
      <div className={style.menu}>{reviewList}</div>
    </div>
  );
}

export default WorkForReview;
