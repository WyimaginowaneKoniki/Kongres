import React, {useState} from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import picture from '../images/empty-image.png';
import Rating from "@material-ui/lab/Rating";
import MyWorkComponent from '../components/MyWorkComponent';
import CurrentVersionWithReplyToReview from '../components/CurrentVersionWithReplyToReview';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

function MyWork(props) {
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

    const myWork = {
        status: 'Status',
        currentDate: '30/11/2020',
        modificationDate: '15/11/2020',
        name: 'Mathematics',
        title: 'Importance of Golden Ratio in Mathematics',
        path: picture,
        alternativeText: 'Photo John Doe',
        author: 'John Doe',
        degree: 'PhD in Computer Science',
        university: 'Silesian University of Technology',
        authors: 'Sam Smith, Ashley Blue',
        text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
    };

    const versions = [
        {
            title: "Current Version",
            date: "30/12/2020",
            stars: 3,
            review1: [
                {
                    name: 'Reviewer1',
                    path: picture,
                    date: "30/12/2020",
                    stars: 3,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.'
                }
            ],
            review2: [
                {
                    name: 'Reviewer2',
                    path: picture,
                    date: "28/12/2020",
                    stars: 3,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.'
                }
            ],
            review3: [
                {
                    name: 'Reviewer3',
                    path: picture,
                    date: "22/12/2020",
                    stars: 3,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.'
                }
            ]
        },
        {
            title: "Previous Version",
            date: "10/12/2020",
            stars: 2,
            review1: [
                {
                    name: 'Reviewer1',
                    path: picture,
                    date: "10/12/2020",
                    stars: 2,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.'
                }
            ],
            review2: [
                {
                    name: 'Reviewer2',
                    path: picture,
                    date: "08/12/2020",
                    stars: 2,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.'
                }
            ],
            review3: [
                {
                    name: 'Reviewer3',
                    path: picture,
                    date: "07/12/2020",
                    stars: 2,
                    textReview: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.'
                }
            ]
        }
    ]

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
        <CurrentVersionWithReplyToReview
            name={review.review1[0].name}
            path={review.review1[0].path}
            stars={review.review1[0].stars}
            review={review.review1[0].textReview}
            date={review.review1[0].date}
        /> : null}
        {open[i] ? 
        <CurrentVersionWithReplyToReview
            name={review.review2[0].name}
            path={review.review2[0].path}
            stars={review.review2[0].stars}
            review={review.review2[0].textReview}
            date={review.review2[0].date}
        /> : null}
        {open[i] ? 
        <CurrentVersionWithReplyToReview
            name={review.review3[0].name}
            path={review.review3[0].path}
            stars={review.review3[0].stars}
            review={review.review3[0].textReview}
            date={review.review3[0].date}
        /> : null}
    </div>
  ));

    return(
        <div className={style.main}>
            <p className={style.path}>My profile / My Work</p>
            <MyWorkComponent
                status = {myWork.status}
                currentDate = {myWork.currentDate}
                modificationDate = {myWork.modificationDate}
                name = {myWork.name}
                title = {myWork.title}
                path = {myWork.path}
                alternativeText = {myWork.alternativeText}
                author = {myWork.author}
                degree = {myWork.degree}
                university = {myWork.university}
                authors = {myWork.authors}
            />
            <div className={style.menu}>{reviewList}</div>
        </div>
    )
}

export default MyWork;