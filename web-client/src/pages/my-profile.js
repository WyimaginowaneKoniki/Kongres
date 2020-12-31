import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import picture from '../images/empty-image.png';

function MyProfile(props)
{
    const styles = makeStyles({
        
    })

    const style = styles();

    return(
        <div>
            <h1 className={style.h1}> My Profile</h1>
        </div>
    )
}

export default MyProfile