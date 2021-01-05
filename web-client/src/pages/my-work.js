import React, {useState} from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import picture from '../images/empty-image.png';
import Rating from "@material-ui/lab/Rating";
import MyWorkComponent from '../components/MyWorkComponent';
import CurrentVersionWithReplyToReview from '../components/CurrentVersionWithReplyToReview';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

function MyWork(props){
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
            ]
        },
        {
            title: "Previous Version",
            date: "10/12/2020",
            stars: 2,
            reviews: [
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

    const versionList = versions.map((version, i) => {
    let reviewsList = [];
    for(let j = 0; j < versions[i].reviews.length; j++)
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
  )});

    return(
        <div className={style.main}>
            <p className={style.path}>My profile / <span className={style.title}>My Work</span></p>
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
                text = {myWork.text}
            />
            <div className={style.menu}>{versionList}</div>
        </div>
    )
}

export default MyWork;