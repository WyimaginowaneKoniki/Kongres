import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../App.css';

function Categories(props)
{
    const styles = makeStyles({
        main:
        {
            padding: '1.5%',
            float: 'left',
        },
        btn:
        {
            textTransform: 'none',
        }
    });

    const style = styles();

    return(
        <div className={style.main}>
            <Button variant='contained' color="primary" 
                            className={style.btn}>{props.name}</Button>
        </div>
    )   
}

export default Categories; 