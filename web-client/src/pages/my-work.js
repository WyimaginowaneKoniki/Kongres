import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import picture from '../images/empty-image.png'
import MyWorkComponent from '../components/MyWorkComponent';

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
        review: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.'
    };

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
                text = {myWork.text}
                review = {myWork.review}
                />
        </div>
    )
}

export default MyWork;