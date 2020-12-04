import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions, DialogContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

function MyReviewsComponent(props)
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
        status:
        {
            width: '100%',
            float: 'left',
            textAlign: 'left',
            paddingLeft: '5%',
            color: 'red',
        },
        date:
        {
            width: '100%',
            float: 'left',
            textAlign: 'left',
            paddingLeft: '5%',
            fontSize: '12px',
        },
        h1:
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
        mainDialog:
        {
            margin: 'auto',
        },
        dialogTitle:
        {
            fontWeight: 'bold',
            textAlign: 'center',
        },
        range:
        {
            textAlign: 'center',
            float: 'center',
            margin: 'auto',
        },
        grade:
        {
            float: 'left',
        },
        stars:
        {
            float: 'left',
            marginLeft: '10%',
        },
        label:
        {
            float: 'left',
            marginLeft: '10%',
        },
        info:
        {
            width: '100%',
            float: 'center',
            margin: 'auto',
            textAlign: 'center',
            fontSize: '14px',
        },
        textArea:
        {
            resize: 'none',
            border: '2px solid grey',
            padding: '2%',
            lineHeight: '1.5',
            width: '95%',
            height: 120,
        },
        currentVersion:
        {
            width: '100%',
            float: 'left',
            marginTop: '5%',
            textAlign: 'left',
            border: '1px solid black', 
        },
        review:
        {
            width: '100%',
            float: 'left',
            border: '1px solid red', 
        },
    });

    const labels = {
        1: 'to improve',
        2: 'OK',
        3: 'excellent'
    };

    const style = styles();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(1);
    const [hover, setHover] = React.useState(1);

    let d = new Date();
    let hours = `${d.getHours()}:${d.getMinutes()}`;
    let date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div className={style.main}>
            <div className={style.left}>
                <p>PDF</p>
            </div>
            <div className={style.right}>
                <span className={style.status}>{props.status}</span>
                <span className={style.date}>
                    <span>{props.currentDate}</span> 
                    <span>&nbsp; (Edited: {props.modificationDate}) &nbsp;</span> 
                    <span> <Button variant='contained' color="primary" 
                            className={style.btn}>{props.name}</Button> </span> 
                </span>
                <h1 className={style.h1}>{props.title}</h1>
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
                <Button variant='contained' color="primary" onClick={handleClickOpen} 
                    className={style.btn1}>Add review</Button>
                    
                <Dialog 
                    className={style.mainDialog}
                    open = {open}
                    onClose = {handleClose}
                >
                    <DialogTitle id='alert-dialog-title' className={style.dialogTitle}>{'Add your review'}</DialogTitle>
                    <DialogContent>
                        <Box component='fieldset' mb={3} borderColor='transparent' className={style.range}>
                            <Typography component='legend' className={style.grade}>Grade:</Typography>
                            <Rating className={style.stars}
                                max={3}
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            />
                            {value !== null && <Box ml={2} className={style.label}>{labels[hover !== -1 ? hover : value]}</Box>}
                        </Box>
                        <p className={style.info}>Review must contain comment or/and file</p>
                    </DialogContent>
                    <DialogContent>
                        <p>Comment</p>
                        <textarea
                            className={style.textArea} 
                            placeholder='Add comment'
                            cols="50"
                            rows = '10px'
                            maxLength='255'
                            />
                    </DialogContent>
                    <DialogContent>
                        <p> Drag&Drop</p>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="primary" onClick={handleClose}
                            className={style.btn1}>Add review</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className={style.currentVersion}>
                <p>
                    <span>Current version</span>
                    <span>{date}</span>
                    <span>gwiazdki</span>
                </p>
                <div className={style.review}>
                <div>
                    <img src={props.path} className={style.image} alt={props.alternativeText}></img>
                    <span> Me </span>
                </div>
                <div>
                    <Box component="fieldset" mb={3} max={3} borderColor="transparent">
                        <Rating name="read-only" value={value} readOnly />
                    </Box>
                    <span>{date} {hours}</span>
                    <span>{props.review}</span>
                    <Button variant='outlined' color="primary" 
                        className={style.btn1}>Download review</Button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default MyReviewsComponent;