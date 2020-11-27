import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../App.css';

function ScientificWorksOneWork(props)
{
    const styles = makeStyles({
        main:
        {
            width: '100%',
            paddingBottom: '300px',
        },
        h2:
        {
            float: 'left',
        },
        panel:
        {
            width: '100%',
            float: 'left',
            marginTop: '-20px',
        },
        category:
        {
            float: 'left',
            fontSize: '12px',
            color: 'blue', //zmienic kolor
            paddingRight: '2.5%',
        },
        dot:
        {
            float: 'left',
            fontSize: '80px',
            color: 'grey', //zmienic kolor
            marginTop: '-62px',
            paddingRight: '2.5%',
        },
        date:
        {
            float: 'left',
            fontSize: '12px',
            paddingRight: '2.5%',
        },
        author:
        {
            float: 'left',
            fontSize: '12px',
        },
        text:
        {
            width: '94%',
            float: 'left',
            textAlign: 'left',
            marginTop: '-70px',
            fontSize: '14px',
        },
        a:
        {
            textDecoration: 'none',
            color: 'black',
            fontWeight: 'bold',
        },
        buttons:
        {
            float: 'left',
            width: '100%',
        },
        btn1:
        {
            float: 'left',
            marginRight: '5%',
        },
        btn2:
        {
            float: 'left',
            backgroundColor: 'blue', //zmienic kolor
            color: 'white',
        },
    });

    const style = styles();

    return(
        <div className={style.main}>
            <h2 className={style.h2}>{props.title}</h2>
            <div className={style.panel}>
                <p className={style.category}>{props.categories}</p>
                <p className={style.dot}>.</p>
                <p className={style.date}>{props.data}</p>
                <p className={style.dot}>.</p>
                <p className={style.author}>{props.authors}</p>
            </div>
            <p className={style.text}>{props.text}<a href={props.link} className={style.a}>Read more...</a></p>
            <div className={style.buttons}>
                <Button variant='outlined' color="primary" 
                            className={style.btn1}>Download full work</Button>
                <Button variant='outlined' color="primary" 
                            className={style.btn2}>Read more</Button>
            </div>
        </div>
    )
}

export default ScientificWorksOneWork; 