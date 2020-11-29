import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

function AcceptedScientificWork(props)
{
    const styles = makeStyles({

    });

    const style = styles();

    return(
        <div className={style.main}>
        <p className={style.path}>Scientific works / {}</p>

        </div>
    )
}

export default AcceptedScientificWork;