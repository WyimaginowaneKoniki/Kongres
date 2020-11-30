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
            textAlign: 'left',
        },
        photo:
        {
            float: 'left',
            width: '100%',
        },
    });

    const style = styles();
    const infos = [<h2>{props.head}</h2>, <p>{props.text}</p>, <a href={props.link}>{props.adnotation}</a>]
    const image = <img src={props.path} className={style.photo} alt={props.alternativeText}></img>

    return(
            <div className={style.main}>
                <div className={style.left}>
                    {props.isImageRight ? infos : image}
                </div>
                <div className={style.right}>
                    {props.isImageRight ? image : infos}
                </div>
            </div>
        )
}

export default AboutInfo; 