import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

function CurrentVersion(props){

    const styles = makeStyles({
        currentVersion:
        {
            width: '80%',
            float: 'left',
            marginTop: '2.5%',
            marginBottom: '2.5%',
            textAlign: 'left',
            marginLeft: '5%',
        },
        review:
        {
            width: '100%',
            float: 'left',
        },
        leftReview:
        {
            width: '15%',
            float: 'left',
        },
        rightReview:
        {
            width: '80%',
            float: 'right',
        },
        labelVersion:
        {
            paddingLeft: '10%',
        },
        image:
        {
            width: 80,
            height: 80,
            borderRadius: '50%',
            float: 'center',
            marginLeft: '20%',
        },
        me:
        {
            width: '100%',
            float: 'left',
            textAlign: 'center',
        },
        rightDate:
        {
            float: 'right',
            color: 'grey',
        },
        textReview:
        {
            width: '95%',
            float: 'left',
            paddingLeft: '2%',
            fontSize: '16px',
            paddingBottom: '2%',
        },
    });

    const style = styles();

    let d = new Date();
    let hours = `${d.getHours()}:${d.getMinutes()}`;
    let date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

    const [hover] = React.useState(1);
    const labels = {
        1: 'rejected',
        2: 'correct',
        3: 'accepted'
    };

    return(
        <div className={style.currentVersion}>
            <div className={style.review}>
                <div className={style.leftReview}>
                    <img src={props.path} className={style.image} alt={props.alternativeText}></img>
                    <span className={style.me}> Me </span>
                </div>
                <div className={style.rightReview}>
                    <Tooltip title={labels[hover !== -1 ? hover : props.stars]} placement='top-start'>
                        <Box component="fieldset" borderColor="transparent">
                            <Rating name="read-only" max={3} value={props.stars} readOnly />
                            <span className={style.rightDate}>{date} {hours}</span>
                        </Box>
                    </Tooltip>
                    <span className={style.textReview}>{props.review}</span>
                    <Button variant='outlined' color="primary" 
                        className={style.btn}>Download review</Button>
                </div>
            </div>
        </div>
    )
}

export default CurrentVersion;