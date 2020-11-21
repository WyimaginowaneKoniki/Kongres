import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function Information(props) {
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
                color: 'red',
            }
        }
    });

    const style = styles();

    return (
        <div className={style.main}>
            <div className={style.left}>
                <img src={props.path} className={style.photo} alt="not found!"></img>
            </div>
            <div className={style.right}>
                <a href={props.link} className={style.a}><h3 className={style.text}>{props.name}</h3></a>
            </div>
        </div>
    )
}

export default Information; 