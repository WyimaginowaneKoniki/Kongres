import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions, DialogContent, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@material-ui/core/InputAdornment";

function WorkForReviewComponent(props)
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
        leftTitle:
        {
            width: '28%',
            float: 'left',
        },
        rightTitle:
        {
            width: '70%',
            float: 'right',
        },
        authorName:
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
        otherName:
        {
            width: '100%',
            float: 'left',
            textAlign: 'left',
            marginTop: '6%',
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
            maxWidth: '100%',
        },
        dialogTitle:
        {
            fontWeight: 'bold',
            textAlign: 'center',
        },
        range:
        {
            width: '100%',
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
            textAlign: 'center',
            fontSize: '14px',
            paddingTop: '10%',
            paddingBottom: '5%',
        },
        textField:
        {
            width: "100%",
        },
        currentVersion:
        {
            width: '75%',
            float: 'left',
            marginTop: '5%',
            textAlign: 'left',
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
        reviewVersion:
        {
            float: 'left',
            paddingRight: '5%',
            fontSize: '20px',
            fontWeight: 'bold',
            paddingBottom: '3.2%',
            paddingTop: '1%',
        },
        labelVersion:
        {
            paddingLeft: '10%',
        },
        data:
        {
            float: 'left',
            color: 'grey',
            paddingRight: '5%',
            paddingBottom: '3.4%',
            paddingTop: '1.3%',
        },
        starVersion:
        {
            float: 'left',
            width: '20%',
            paddingTop: '0.3%',
            paddingBottom: '2%',
        },
        image:
        {
            width: '70%',
            height: 70,
            borderRadius: '50%',
            float: 'center',
            marginLeft: '12%',
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

    const labels = {
        1: 'rejected',
        2: 'correct',
        3: 'accepted'
    };

    const style = styles();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(1);
    const [hover, setHover] = React.useState(1);

    let d = new Date();
    let hours = `${d.getHours()}:${d.getMinutes()}`;
    let date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

    const [values, setValues] = React.useState({
        commit: "",
      });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setCounts({ ...counts, [prop]: event.target.value.length });
      };

    //Form
    const maxCommentSize = 255;

    const [counts, setCounts] = React.useState({
        title: 0,
        description: 0,
      });

    const schema = yup.object().shape({
        comment: yup
        .string()
        .matches(
            /^[A-Za-z0-9]*$/,
            "Comment should only contain letters and digits"    
        )
        .max(
            maxCommentSize,
            `Comment should be ${maxCommentSize} characters or less`
          )
        .required("Required field"),
    });

    const { register, handleSubmit , errors } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    return(
        <div className={style.main}>

            {/*First Page PDF */}
            <div className={style.left}>
                <p>PDF</p>
            </div>
            <div className={style.right}>
                <Tooltip title='Status' placement='top-start'>
                    <span className={style.status}>{props.status}</span>
                </Tooltip>

                {/* Panel includes status, date add work, date modification and category  */}
                <span className={style.date}>
                    <span>{props.currentDate}</span> 
                    <span>&nbsp; (Edited: {props.modificationDate}) &nbsp;</span> 
                    <span> <Button variant='contained' color="primary" 
                            className={style.btn}>{props.name}</Button> </span> 
                </span>
                <h1 className={style.h1}>{props.title}</h1>

                {/* Panel includes photo, name author, degree, univeristy */}
                <div className={style.author}>
                    <span className={style.shared}>Shared by</span>
                    <p className={style.leftTitle}>
                        <img src={props.path} className={style.photo} alt={props.alternativeText}></img> 
                    </p>
                    <p className={style.rightTitle}>
                        <span className={style.authorName}>{props.author}</span>
                        <span className={style.degree}>{props.degree}</span>
                        <span className={style.university}>{props.university}</span>
                    </p>
                </div>
                <div className={style.authors}>
                    <span className={style.other}>Other authors</span>
                    <span className={style.otherName}>{props.authors}</span>
                </div>
                <p className={style.text}>{props.text}</p>

                <Button variant='outlined' color="primary" 
                    className={style.btn1}>Download full work</Button>
                <Button variant='contained' color="primary" onClick={handleClickOpen} 
                    className={style.btn1}>Add review</Button>

                {/* All Dialog in Popup */}    
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
                    <TextField
                        className={style.textField}
                        inputRef={register}
                        required
                        id="comment-adding-work"
                        name="comment"
                        label="Comment"
                        autoComplete="comment"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {counts.comment}/{maxCommentSize}
                                </InputAdornment>
                            ),
                        }}
                        multiline
                        rows={5}
                        placeholder="Add text"
                        onChange={handleChange("comment")}
                        variant="outlined"
                        error={!!errors.comment}
                        helperText={errors?.comment?.message}
                    />
                    </DialogContent>
                    <DialogContent>
                        <p> Drag&Drop</p>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="primary"
                            className={style.btn1}>Add review</Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/*Review*/}
            <div className={style.currentVersion}>
                <p>
                    <span className={style.reviewVersion}>Current version</span>
                    <span className={style.data}>{date}</span>
                    <span className={style.starVersion}>
                    <Tooltip title={labels[hover !== -1 ? hover : value]} placement='top'>
                        <Box component="fieldset" borderColor="transparent">
                            <Rating name="read-only" max={3} value={value} readOnly />
                        </Box>
                    </Tooltip>
                    </span>
                </p>
                <div className={style.review}>
                    <div className={style.leftReview}>
                        <img src={props.path} className={style.image} alt={props.alternativeText}></img>
                        <span className={style.me}> Me </span>
                    </div>
                    <div className={style.rightReview}>
                        <Tooltip title={labels[hover !== -1 ? hover : value]} placement='top-start'>
                            <Box component="fieldset" borderColor="transparent">
                                <Rating name="read-only" max={3} value={value} readOnly />
                                <span className={style.rightDate}>{date} {hours}</span>
                            </Box>
                        </Tooltip>
                        <span className={style.textReview}>{props.review}</span>
                        <Button variant='outlined' color="primary" 
                            className={style.btn}>Download review</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkForReviewComponent;