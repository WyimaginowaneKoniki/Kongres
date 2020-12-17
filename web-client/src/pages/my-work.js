import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import picture from '../images/empty-image.png'
import WorkForReviewComponent from '../components/WorkForReviewComponent';

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

    const scientificWork = {
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

    return(
        <div className={style.main}>
            <p className={style.path}>My profile / My Work</p>
            <WorkForReviewComponent
                status = {scientificWork.status}
                currentDate = {scientificWork.currentDate}
                modificationDate = {scientificWork.modificationDate}
                name = {scientificWork.name}
                title = {scientificWork.title}
                path = {scientificWork.path}
                alternativeText = {scientificWork.alternativeText}
                author = {scientificWork.author}
                degree = {scientificWork.degree}
                university = {scientificWork.university}
                authors = {scientificWork.authors}
                text = {scientificWork.text}
                />
        </div>
    )
}

export default MyWork;