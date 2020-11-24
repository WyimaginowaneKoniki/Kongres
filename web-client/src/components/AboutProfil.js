import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function AboutProfil(props) {
    const styles = makeStyles({
        main:
        {
            width: '85%',
            float: 'center',
        },
        left:
        {
            paddingTop: '5%',
            paddingLeft: '11.5%',
            width: '38%',
            float: 'left',
        },
        right:
        {
            paddingTop: '5%',
            paddingLeft: '11%',
            width: '38%',
            float: 'left',
        },
        photo:
        {
            width: '40%',
            borderRadius: '50%',
            height: 150,
            float: 'left',
        },
        h2:
        {
            width: '65%',
            paddingLeft: '55%',
            textAlign: 'left',
        },
        p:
        {
            width: '65%',
            paddingLeft: '55%',
            textAlign: 'left',
        },
    });

    const style = styles();

    return (
        <div className={style.main}>
            <div className={style.left}>
                <img src={props.path1} alt={props.name1} className={style.photo}></img>
                <h2 className={style.h2}>{props.name1}</h2>
                <p className={style.p}>{props.description1}</p>
            </div>
            <div className={style.right}>
                <img src={props.path2} alt={props.name2} className={style.photo}></img>
                <h2 className={style.h2}>{props.name2}</h2>
                <p className={style.p}>{props.description2}</p>
            </div>
        </div>
    )
}

export default AboutProfil; 