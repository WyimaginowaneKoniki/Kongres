import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css';

function ScientificWorksRecentAuthors(props)
{
    const styles = makeStyles({
        main:
        {
            width: '90%',
            float: 'left',
        },
        photo:
        {
            width: '30%',
            borderRadius: '50%',
            height: '90px',
            float: 'left',
            padding: '5%',
        },
        h2:
        {
            width: '58%',
            float: 'left',
            textAlign: 'left',
        },
        p:
        {   width: '100%',
            marginTop: '0px',
            textAlign: 'left',
        },
    });

    const style = styles();

    return(
        <div className={style.main}>
            <img src={props.path} className={style.photo} alt={props.alternativeText}></img> 
            <h2 className={style.h2}>{props.name}</h2>
            <p className={style.p}>{props.description}</p>
        </div>
    )
}

export default ScientificWorksRecentAuthors; 