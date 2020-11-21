import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function KeynoteSpeaker(props) {
    const styles = makeStyles({
        main: {
            width: '80%',
            margin: 'auto',
            float: 'right',
        },
        left: {
            float: 'left',
            display: 'block',
            width: '25%',
            margin: '5%',
        },
        right: {
            float: 'right',
            display: 'block',
            width: '55%',
            margin: '5%',
            padding: '3% 0',
        },
        photo: {
            width: '100%',
        },
        name: {
            textAlign: 'left',
            margin: '0',
        },
        info: {
            display: 'block',
            textAlign: 'left',
        },
        desc: {
            marginTop: '5%',
        }
      });

    const style = styles();

      console.log(props.photo);

    return (
        <div className={style.main}>
            <div className={style.left}>
                <img className={style.photo} src={props.photo} alt="This is a photo of Speaker."/>
            </div>
            <div className={style.right}>
                <h4 className={style.name}>{props.name}</h4>
                <span className={style.info}>
                    {props.spec}
                </span>
                <span className={style.info}>
                    {props.university}
                </span>
                <span className={`${style.info} ${style.desc}`}>
                    {props.desc}
                </span>
            </div>
        </div>
    )
}

export default KeynoteSpeaker;