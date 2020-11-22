import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function ParagraphText(props) {
    const styles = makeStyles({
        main: {
            padding: '2%',
        },
        heading: {
            textAlign: 'left',
            margin: '0 20%',
            width: '60%',
        },
        content: {
            textAlign: 'left',
            margin: '0 20%',
            display: 'block',
            width: '60%',
        },
      });

    const style = styles();

    return (
        <div className={style.main}>
            <h2 className={style.heading}>{props.heading}</h2>
            <p className={style.content}>{props.content}</p>
        </div>
    )
}

export default ParagraphText;