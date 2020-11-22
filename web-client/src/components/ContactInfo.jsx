import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function ContactInfo(props) {
    const styles = makeStyles({
        main:
        {
            padding: '5%',
            width: '60%',
        },
        left:
        {
            width: '30%',
            float: 'left',
        },
        right:
        {
            float: 'left',
            marginTop: '2%',
        },
        photo:
        {
            display: 'block',
            width: '60%',
            borderRadius: '50%',
        },
        text:
        {
            fontWeight: 'normal',
        },
        a:
        {
            textDecoration: 'none',
            color: 'black',

            '&:hover' :
            {
                color: 'grey',
            }
        }
    });

    const style = styles();

    
    if(props.street === false)
    {
        return (
        <div className={style.main}>
            <div className={style.left}>
                <img src={props.path} className={style.photo} alt={props.icon}></img>
            </div>
            <div className={style.right}>
                <a href={props.link} className={style.a}>
                <h3 className={style.text}>{props.name}</h3>
                </a>
            </div>
        </div>
        )
    }
    else
    {
        return (
        <div className={style.main}>
            <div className={style.left}>
                <img src={props.path} className={style.photo} alt={props.alternativeText}></img>
            </div>
            <div className={style.right}>
                <h3 className={style.text}>{props.name}</h3>
            </div>
        </div>
        )
    }
}

export default ContactInfo; 