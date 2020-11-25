import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function AboutInfo(props) {
    const styles = makeStyles({
        main:
        {
            padding: '5%',
            marginBottom: '20%',
            width: '80%',
            margin: 'auto',
            fontSize: '16px',
        },
        left:
        {
            width: '48%',
            float: 'left',
            textAlign: 'left',
        },
        right:
        {
            width: '48%',
            float: 'right',
        },
        leftphoto:
        {
            width: '48%',
            float: 'left',
        },
        righttext:
        {
            width: '48%',
            float: 'right',
            textAlign: 'left',
        },
        photo:
        {
            float: 'left',
            width: '100%',
        },
    });

    const style = styles();

    if(props.isImageRight)
    {
        return(
            <div className={style.main}>
                <div className={style.left}>
                    <h2>{props.head}</h2>
                    <p>{props.text}</p>
                    <a href={props.link}>{props.adnotation}</a>
                </div>
                <div className={style.right}>
                    <img src={props.path} className={style.photo} alt={props.alternativeText}></img>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <div className={style.main}>
                <div className={style.leftphoto}>
                    <img src={props.path} className={style.photo} alt={props.alternativeText}></img>
                </div>
                <div className={style.righttext}>
                    <h2>{props.head}</h2>
                    <p>{props.text}</p>
                    <a href={props.link}>{props.adnotation}</a>
                </div>
            </div>
        )
    }
}

export default AboutInfo; 