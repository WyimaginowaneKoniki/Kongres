import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function AboutProfil(props) {
    const styles = makeStyles({
        main:
        {
            width: '80%',
        },
        photo:
        {
            width: '40%',
            borderRadius: '50%',
            height: 150,
            float: 'left',
        },
        h3:
        {
            width: '65%',
            paddingLeft: '50%',
            textAlign: 'left',
        },
        p:
        {
            width: '65%',
            paddingLeft: '50%',
            textAlign: 'left',
        },
    });

    const style = styles();

    return (
        <div className={style.main}>
                <img src={props.path} alt={props.name} className={style.photo}></img>
                <h3 className={style.h3}>{props.name}</h3>
                <p className={style.p}>{props.description}</p>
        </div>
    )
}

export default AboutProfil; 