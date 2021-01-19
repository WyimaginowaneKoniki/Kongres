import React, { useEffect } from "react";
import "../../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import OneWork from "../../../components/ScientificWorkList/OneWork";
import Categories from "../../../components/ScientificWorkList/Categories";
import Search from "../../../components/Search";
import picture from "../../../images/empty-image.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { URL_API, LINKS } from "../../../Constants";

export default function MyReviews() {
  const style = makeStyles({
    works: {
      display: "flex",
      justifyContent: "flex-start",
      "@media only screen and (max-width: 1280px)": {
        justifyContent: "center",
        flexDirection: "column",
      },
    },
    list: {
      width: "70%",
      "@media only screen and (max-width: 1280px)": {
        width: "100%",
      },
    },
    sidebar: {
      width: "30%",
      textAlign: "left",
      "@media only screen and (max-width: 1280px)": {
        width: "100%",
        marginTop: "40px",
      },
    },
    h3: {
      marginTop: "40px",
    },
  })();

  const location = useLocation();
  const history = useHistory();

  // Check if page is load successful
  const [isSuccessedLoad, SetIsSuccessedLoad] = React.useState(false);

  useEffect(() => {
    let id = window.location.pathname.split("/").slice(-1)[0];
    if (isNaN(id)) id = null;
    console.log(location.state?.detail ? location.state?.detail : id);

    const token = localStorage.getItem("jwt");

    (async () => {
      await axios
        .get(`${URL_API}/Reviewer/MyReviews`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          SetIsSuccessedLoad(true);
          console.log(resp.data);
        })
        .catch((_) => {
          SetIsSuccessedLoad(false);
          history.push({
            pathname: LINKS.REVIEWER_LOGIN,
          });
        });
    })();
  }, [location]);

  const reviews = [
    {
      title: "Importance of Golden Ratio in Mathematics",
      status: "Waiting for review",
      categories: "Mathematics",
      data: "30/11/2020",
      authors: "John Doe, Sam Smith, Ashley Blue",
      text:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ",
      author: "John Doe",
      modificationDate: "12/12/2020",
    },
    {
      title: "Importance of Golden Ratio in Mathematics",
      status: "Accepted",
      categories: "Mathematics",
      data: "30/11/2020",
      authors: "John Doe, Sam Smith, Ashley Blue",
      text:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ",
      author: "John Doe",
      modificationDate: "12/12/2020",
    },
    {
      title: "Importance of Golden Ratio in Mathematics",
      status: "Rejected",
      categories: "Mathematics",
      data: "30/11/2020",
      authors: "John Doe, Sam Smith, Ashley Blue",
      text:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ",
      author: "John Doe",
      modificationDate: "12/12/2020",
    },
  ];

  const reviewList = reviews.map((review) => (
    <OneWork
      title={review.title}
      status={review.status}
      categories={review.categories}
      data={review.data}
      authors={review.authors}
      text={review.text}
      link={review.link}
      author={review.author}
      modificationDate={review.modificationDate}
    />
  ));

  const status = [
    "Waiting for review",
    "Reviewed",
    "Ended",
    "Accepted",
    "Rejected",
  ];
  const statusList = status.map((name) => <Categories name={name} />);

  return (
    isSuccessedLoad && (
      <div className={style.main}>
        <h1>My reviews</h1>
        <div className={style.works}>
          <div className={style.list}>{reviewList}</div>

          <div className={style.sidebar}>
            <Search />
            <h3 className={style.h3}>Status</h3>
            {statusList}
          </div>
        </div>
      </div>
    )
  );
}
