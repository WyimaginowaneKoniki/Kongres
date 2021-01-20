import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import OneWork from "../../components/ScientificWorkList/OneWork";
import Categories from "../../components/ScientificWorkList/Categories";
import RecentWorks from "../../components/ScientificWorkList/RecentWorks";
import Search from "../../components/Search";
import picture from "../../images/default-avatar.png";
import axios from "axios";
import { URL_API, LINKS } from "../../Constants";

export default function ScientificWorks() {
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

  const history = useHistory();

  // Check if page is load successful
  const [isSuccessedLoad, SetIsSuccessedLoad] = React.useState(false);

  // Stores works
  const [works, SetWorks] = React.useState([
    {
      title: null,
      status: null,
      categories: null,
      date: null,
      authors: null,
      description: null,
    },
  ]);

  // base on:
  // https://www.robinwieruch.de/react-hooks-fetch-data

  // GET request
  useEffect(() => {
    // without fetchData function, the console returns error
    // because it must be async
    const fetchData = async () => {
      var token = localStorage.getItem("jwt");
      await axios
        .get(`${URL_API}/ScientificWork`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          SetWorks(resp.data);
          SetIsSuccessedLoad(true);
        })
        .catch((_) => {
          history.push({
            pathname: LINKS.PARTICIPANT_LOGIN,
          });
          SetIsSuccessedLoad(false);
        });
    };
    fetchData();
  }, [history]);

  // convert date from ISO [YYYY-MM-DDTHH:mm:ss.sssZ] to DD/MM/YYYY
  const convertDate = (date) => {
    date = date?.substring(0, 10);
    if (!date) return null;
    return date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function (_, y, m, d) {
      return d + "/" + m + "/" + y;
    });
  };

  const workList = works.map((work) => (
    <OneWork
      title={work.title}
      categories={work.specialization}
      date={convertDate(work.creationDate)}
      authors={work.authors}
      text={work.description}
      id={work.id}
    />
  ));

  const categories = [
    "Computer Science",
    "Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
    "Geography",
  ];

  const categoryList = categories.map((name) => <Categories name={name} />);

  const recents = [
    {
      path: picture,
      name: "John Doe",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live...",
    },
    {
      path: picture,
      name: "John Doe",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live...",
    },
    {
      path: picture,
      name: "John Doe",
      description: "Title",
    },
    {
      path: picture,
      name: "John Doe",
      description: "Title",
    },
  ];

  const recentList = recents.map((recent) => (
    <RecentWorks
      path={recent.path}
      name={recent.name}
      description={recent.description}
    />
  ));

  return (
    isSuccessedLoad && (
      <div className={style.main}>
        <h1>Scientific works</h1>
        <div className={style.works}>
          <div className={style.list}>
            {/* If list of works is null, then nothing is displayed */}
            {works[0]?.title ? workList : null}
          </div>

          <div className={style.sidebar}>
            <Search />

            <h3 className={style.h3}>Categories</h3>
            {categoryList}

            <h3 className={style.h3}>Recent works</h3>
            {recentList}
          </div>
        </div>
      </div>
    )
  );
}
