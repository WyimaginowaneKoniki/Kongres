import React, { useEffect } from "react";
import "../../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import OneWork from "../../../components/ScientificWorkList/OneWork";
import Categories from "../../../components/ScientificWorkList/Categories";
import Search from "../../../components/Search";
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

  // Stores reviews
  const [reviews, SetReviews] = React.useState([
    {
      title: null,
      status: null,
      creationDate: null,
      authors: null,
      description: null,
      specialization: null,
      updateDate: null,
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    (async () => {
      await axios
        .get(`${URL_API}/Reviewer/MyReviews`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          SetIsSuccessedLoad(true);
          SetReviews(resp.data);
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

  // convert date from ISO [YYYY-MM-DDTHH:mm:ss.sssZ] to DD/MM/YYYY
  const convertDate = (date) => {
    date = date?.substring(0, 10);
    if (!date) return null;
    return date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function (_, y, m, d) {
      return d + "/" + m + "/" + y;
    });
  };

  const reviewList = reviews.map((review) => (
    <OneWork
      title={review.title}
      status={review.status}
      categories={review.specialization}
      date={convertDate(review.creationDate)}
      authors={review.authors}
      text={review.description}
      modificationDate={convertDate(review.updateDate)}
      id={review.id}
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
