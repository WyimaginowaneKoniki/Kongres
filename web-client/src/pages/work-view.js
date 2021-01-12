import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import picture from "../images/empty-image.png";
import ScienceWorkInformation from "../components/ScienceWorkInformation";
import CurrentVersion from "../components/CurrentVersion";
import Rating from "@material-ui/lab/Rating";
import CurrentVersionWithReplyToReview from '../components/CurrentVersionWithReplyToReview';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { URL_API } from "../Constants";

function WorkView(){
    const styles = makeStyles ({
        path:
        {
            width: '70%',
            padding: '2%',
            paddingLeft: '10%',
            float: 'left',
            textAlign: 'left',
            color: 'grey',
            fontSize: '14px',
        },
        title:
        {
            fontWeight: 'bold',
        },
        menu: 
        {
            float: "left",
            width: "80%",
            marginTop: "5%",
            marginLeft: "10%",
        },
        row:
        {
            padding: "2%",
            float: "left",
            width: "80%",
        },
        version: 
        {
            float: "left",
            marginLeft: "8%",
        },
        arrow: 
        {
            float: "right",
        },
    });

    const style = styles();

    const location = useLocation();

    const [workPDF, SetWorkPDF] = useState(null);
    const [data, setData] = useState({
      scientificWork: "",
      mainAuthor: "",
      versions: [],
      status: "",
    });

    useEffect(() => {
      let id = window.location.pathname.split("/").slice(-1)[0];
      if (isNaN(id)) id = null;
      console.log(location.state?.detail ? location.state?.detail : id);

      const token = localStorage.getItem("jwt");

      (async () => {
        await axios
          .get(`${URL_API}/ScientificWork/Download/${Number(id)}`, {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          })
          .then((resp) => {
            const pdf = window.URL.createObjectURL(
              new Blob([resp.data], { type: "application/pdf" })
            );
            SetWorkPDF(pdf);
          });
      })();

      (async () => {
        await axios
          .get(`${URL_API}/ScientificWork/${Number(id)}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            setData(resp.data);
          });
      })();
    }, [location]);

    const user = "participant";  //reviewer //participant

    const versions = [
        {
            title: "Current Version",
            date: "30/12/2020",
            stars: 3,
            reviews:[
                {
                    name: 'Reviewer1',
                    path: picture,
                    date: "30/12/2020",
                    stars: 3,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: null,
                    answerDate: null,
                },
                {
                    name: 'Reviewer2',
                    path: picture,
                    date: "28/12/2020",
                    stars: 3,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: null,
                    answerDate: null,
                },
                {
                    name: 'Reviewer3',
                    path: picture,
                    date: "22/12/2020",
                    stars: 3,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: "Thank you for your feedback!",
                    answerDate: "26/12/2020",
                }
            ],
            reviewer: 
            {
                path: picture,
                date: "30/12/2020",
                stars: 3,
                textReview: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
                pathParticipant: picture,
                alternativeTextParticipant: "Photo John Doe",
                dateAnswer: null,
                answer: null,
            }
        },
        {
            title: "Previous Version",
            date: "10/12/2020",
            stars: 2,
            reviews:[
                {
                    name: 'Reviewer1',
                    path: picture,
                    date: "10/12/2020",
                    stars: 2,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: "Thank you for your feedback!",
                    answerDate: "12/12/2020",
                },
                {
                    name: 'Reviewer2',
                    path: picture,
                    date: "08/12/2020",
                    stars: 2,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: "Thank you for your feedback!",
                    answerDate: "12/12/2020",
                },
                {
                    name: 'Reviewer3',
                    path: picture,
                    date: "07/12/2020",
                    stars: 2,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: "Thank you for your feedback!",
                    answerDate: "12/12/2020",
                }
            ],
            reviewer: 
            {
                path: picture,
                date: "07/12/2020",
                stars: 2,
                textReview: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
                pathParticipant: picture,
                alternativeTextParticipant: "Photo John Doe",
                dateAnswer: "20/12/2020",
                answer: "Thank you for your feedback!"
            }
        },
        {
            title: "Previous Version",
            date: "02/12/2020",
            stars: 2,
            reviews:[
                {
                    name: 'Reviewer1',
                    path: picture,
                    date: "30/11/2020",
                    stars: 2,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: "Thank you for your feedback!",
                    answerDate: "12/12/2020",
                },
                {
                    name: 'Reviewer2',
                    path: picture,
                    date: "28/11/2020",
                    stars: 3,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: "Thank you for your feedback!",
                    answerDate: "12/12/2020",
                },
                {
                    name: 'Reviewer3',
                    path: picture,
                    date: "27/11/2020",
                    stars: 2,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.',
                    answer: "Thank you for your feedback!",
                    answerDate: "12/12/2020",
                }
            ],
            reviewer: 
            {
                path: picture,
                date: "28/11/2020",
                stars: 2,
                textReview: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
                pathParticipant: picture,
                alternativeTextParticipant: "Photo John Doe",
                dateAnswer: "20/12/2020",
                answer: "Thank you for your feedback!"
            }
        }
    ]

    // by default every version should be closed (except first one)
    const [open, setOpen] = useState([true, ...(new Array(versions.length - 1).fill(false))]);

    function handleOnClick(item) {
        if (open[item])
            open[item] = false;
        else
            open[item] = true;

        setOpen([...open]);
    }

    const versionList = versions.map((version, i) => {
        let reviewsList = [];
        for(let j = 0; j < versions[i].reviews.length; j++)
        {
            if(user === "participant")
            {
                reviewsList.push(
                    <CurrentVersionWithReplyToReview
                        name={version.reviews[j].name}
                        path={version.reviews[j].path}
                        stars={version.reviews[j].stars}
                        review={version.reviews[j].textReview}
                        date={version.reviews[j].date}
                        answer={version.reviews[j].answer}
                        answerDate={version.reviews[j].answerDate}
                    />
                );
            }
        }
        if(user === "reviewer")
        {
            reviewsList.push(
                <CurrentVersion
                    author = {"Joe Doe"}
                    path={version.reviewer.path}
                    stars={version.reviewer.stars}
                    review={version.reviewer.textReview}
                    pathParticipant={version.reviewer.pathParticipant}
                    alternativeTextParticipant={version.reviewer.alternativeTextParticipant}
                    dateAnswer={version.reviewer.dateAnswer}
                    answer={version.reviewer.answer}
                /> 
            )
        }
        return(
        <div key={i}>
            <div className={style.row} onClick={() => handleOnClick(i)}>
                <span className={style.version}> {version.title} </span>
                <span className={style.version}> {version.date} </span>
                <Rating value={version.stars} max={3} className={style.version} readOnly />
                {open[i] ? 
                <ArrowDropDownIcon className={style.arrow} />
                : <ArrowDropUpIcon className={style.arrow} />}
            </div>
            {open[i] ? reviewsList : null}
        </div>
      )
    });

    return (
      <div className={style.main}>
        {user === "participant" ? (
          <p className={style.path}>
            My profile / <span className={style.title}>My Work</span>
          </p>
        ) : (
          <p className={style.path}>
            Scientific works /{" "}
            <span className={style.title}>{data.scientificWork.title}</span>
          </p>
        )}

        <ScienceWorkInformation
            scientificWork={data.scientificWork}
            author={data.mainAuthor}
            status={data.status}
            mode={data.mode}
            workPDF={workPDF}
        />

        <div className={style.menu}>{versionList}</div>
      </div>
    );
}

export default WorkView;