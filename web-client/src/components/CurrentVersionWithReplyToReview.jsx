import React, { useState } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@material-ui/core/InputAdornment";

function CurrentVersionWithReplyToReview(props) {
  const style = makeStyles({
    currentVersion: {
      width: "70%",
      float: "left",
      marginTop: "5%",
      textAlign: "left",
      marginLeft: "12%",
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: "50%",
      float: "center",
      marginLeft: "12%",
    },
    me: {
      width: "100%",
      float: "left",
      textAlign: "center",
    },
    rightDate: {
      float: "right",
      color: "grey",
    },
    reply: {
      width: "80%",
      float: "left",
      marginLeft: "20%",
      marginTop: "5%",
    },
    replyToReview: {
      width: "100%",
      fontWeight: "bold",
      float: "left",
      fontSize: "20px",
      marginLeft: "2%",
    },
    leftReply: {
      width: "18%",
      float: "left",
      marginTop: "2.5%",
    },
    rightReply: {
      width: "80%",
      float: "right",
    },
    textField: {
      width: "95%",
      margin: "2%",
    },
    info: {
      marginLeft: "5%",
      fontSize: "14px",
      float: "left",
      color: "grey",
    },
    btn: {
      textTransform: "none",
    },
    btn2: {
      textTransform: "none",
      marginRight: "2.5%",
      float: "right",
    },
    yourReplay: {
      width: "50%",
      fontWeight: "bold",
      float: "left",
      fontSize: "20px",
      marginLeft: "2%",
    },
    message: {
      width: "100%",
      float: "left",
      marginLeft: "2%",
      marginTop: "3%",
    },
  })();

  const maxCommentSize = 255;

  const [counts, setCounts] = useState({
    title: 0,
    description: 0,
  });

  const [values, setValues] = useState({
    commit: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setCounts({ ...counts, [prop]: event.target.value.length });
  };

  const schema = yup.object().shape({
    comment: yup
      .string()
      .matches(
        /^[A-Za-z0-9,.?\s-+―\];—'–)(‒"‑[‐-]*$/,
        "Comment should only contain letters and digits"
      )
      .max(
        maxCommentSize,
        `Comment should be ${maxCommentSize} characters or less`
      ),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  return (
    <div className={style.currentVersion}>
      <div className={style.reply}>
        <span className={style.replyToReview}>Reply to review</span>
        <div className={style.leftReply}>
          <img src={props.path} className={style.image} alt=""></img>
          <span className={style.me}> John Doe </span>
        </div>
        <form
          className={style.form}
          noValidate
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data));
          })}
        >
          <TextField
            className={style.textField}
            inputRef={register}
            id="comment-work-for-review"
            name="comment"
            label="Comment"
            autoComplete="comment"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {counts.comment > 0 ? counts.comment : counts.description}/
                  {maxCommentSize}
                </InputAdornment>
              ),
            }}
            multiline
            rows={6}
            placeholder="Add comment"
            onChange={handleChange("comment")}
            variant="outlined"
            error={!!errors.comment}
            helperText={errors?.comment?.message}
          />
          <span className={style.info}>
            Remember: you can't edit or delete this comment
          </span>
          <Button
            variant="contained"
            color="primary"
            className={style.btn2}
            type="submit"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CurrentVersionWithReplyToReview;
