import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../App.css';

function AcceptedScientificWorkComponents(props)
{
    const styles = makeStyles({
        main:
        {
            width: '80%',
            margin: 'auto',
        },
        left:
        {
            width: '29%',
            float: 'left',
            height: 600,
            border: '2px solid black',
        },
        right:
        {
            width: '70%',
            float: 'right',
        },
        date:
        {
            width: '100%',
            float: 'left',
            textAlign: 'left',
            paddingLeft: '5%',
            fontSize: '12px',
        },
        h2:
        {
            width: '100%',
            float: 'left',
            textAlign: 'left',
            paddingLeft: '5%',
            fontSize: '30px',
        },
        author:
        {
            width: '45%',
            float: 'left',
            paddingLeft: '5%',
            textAlign: 'left',
        },
        shared:
        {
            width: '100%',
            float: 'left',
            color: 'grey',
        },
        photo:
        {
            width: '90%',
            borderRadius: '50%',
            height: 80,
        },
        lefttitle:
        {
            width: '28%',
            float: 'left',
        },
        righttitle:
        {
            width: '70%',
            float: 'right',
        },
        authorname:
        {
            paddingTop: '5%',
            width: '100%',
            float: 'right',
            fontWeight: 'bold',
        },
        degree:
        {
            width: '100%',
            float: 'right',
            fontSize: '12px',
        },
        university:
        {
            width: '100%',
            float: 'right',
            fontSize: '12px',
            color: 'grey',
        },
        authors:
        {
            width: '45%',
            float: 'right',
            paddingLeft: '5%',
        },
        other:
        {
            width: '100%',
            float: 'left',
            textAlign: 'left',
            color: 'grey',
        },
        othername:
        {
            width: '100%',
            float: 'left',
            textAlign: 'left',
            marginTop: '12%',
            fontWeight: 'bold',
        },
        text:
        {
            width: '85%',
            float: 'left',
            textAlign: 'left',
            paddingLeft: '5%',
        },
        btn:
        {
            textTransform: 'none',
        },
        btn1:
        {
            textTransform: 'none',
            marginLeft: '5%',
            float: 'left',
        },
    });

    const style = styles();

    return(
        <div className={style.main}>
            <div className={style.left}>
                <p>PDF</p>
            </div>
            <div className={style.right}>
                <span className={style.date}>
                    <span>{props.currentDate}</span> 
                    <span>&nbsp; (Edited: {props.modificationDate}) &nbsp;</span> 
                    <span> <Button variant='contained' color="primary" 
                            className={style.btn}>{props.name}</Button> </span> 
                </span>
                <h2 className={style.h2}>{props.title}</h2>
                <div className={style.author}>
                <span className={style.shared}>Shared by</span>
                    <p className={style.lefttitle}>
                        <img src={props.path} className={style.photo} alt={props.alternativeText}></img> 
                    </p>
                    <p className={style.righttitle}>
                        <span className={style.authorname}>{props.author}</span>
                        <span className={style.degree}>{props.degree}</span>
                        <span className={style.university}>{props.university}</span>
                    </p>
                </div>
                <div className={style.authors}>
                    <span className={style.other}>Other authors</span>
                    <span className={style.othername}>{props.authors}</span>
                </div>
                <p className={style.text}>{props.text}</p>
                <Button variant='outlined' color="primary" 
                            className={style.btn1}>Download full work</Button>
            </div>
        </div>
    )
}

export default AcceptedScientificWorkComponents;