import React, { useState } from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, InputAdornment } from "@material-ui/core/";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { URL_API } from "../../Constants";

export default function AuthorAnswerInput(props) {
  const style = makeStyles({
    answerInput: {
      width: "600px",
      marginLeft: "144px",
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "48px",
      "@media only screen and (max-width: 1080px)": {
        marginLeft: "64px",
        fontSize: "16px",
      },
      "@media only screen and (max-width: 768px)": {
        width: "80vw",
        marginLeft: "0",
        justifyContent: "flex-start",
      },
    },
    replyToReview: {
      fontWeight: "bold",
      width: "100%",
      textAlign: "left",
      fontSize: "16px",
      "@media only screen and (max-width: 768px)": {
        fontSize: "14px",
        marginBottom: "4px",
      },
    },
    userInfo: {
      alignItems: "center",
      "@media only screen and (max-width: 768px)": {
        display: "none",
      },
    },
    image: {
      width: "72px",
      height: "72px",
      borderRadius: "50px",
      "@media only screen and (max-width: 1080px)": {
        width: "40px",
        height: "40px",
      },
    },
    userName: {
      textAlign: "center",
      fontSize: "16px",
      "@media only screen and (max-width: 1080px)": {
        fontSize: "12px",
        lineHeight: "1em",
      },
    },
    inputForm: {
      width: "480px",
      marginLeft: "24px",
      "@media only screen and (max-width: 1080px)": {
        width: "320px",
      },
      "@media only screen and (max-width: 768px)": {
        width: "70vw",
        marginLeft: "0",
      },
    },
    input: {
      width: "100%",
      marginBottom: "8px",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    info: {
      fontSize: "14px",
      color: "#767676",
      lineHeight: "1.2em",
      "@media only screen and (max-width: 1080px)": {
        textAlign: "left",
        marginBottom: "4px",
      },
    },
    btn: {},
  })();

  const maxAnswerLength = 255;

  const [characterCount, setCharacterCount] = useState(0);

  const handleInputChange = (event) => {
    setCharacterCount(event.target.value.length);
  };

  const schema = yup.object().shape({
    answer: yup
      .string()
      .required("Required field")
      .max(maxAnswerLength, `Answer should be ${maxAnswerLength} characters or less`),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    var formData = new FormData();

    formData.append("Answer", data.answer);
    formData.append("ReviewId", props.reviewId);

    const token = localStorage.getItem("jwt");

    axios.post(`${URL_API}/reviews/answer`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    window.location.reload();
  };

  return (
    <div className={style.answerInput}>
      <p className={style.replyToReview}>Reply to review</p>
      <div className={style.userInfo}>
        <img src={props.photo} className={style.image} alt="" />
        <p className={style.userName}>{props.name}</p>
      </div>
      <form className={style.inputForm} noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={style.input}
          inputRef={register}
          id="answerInput"
          name="answer"
          label="Answer"
          autoComplete="answer"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {characterCount}/{maxAnswerLength}
              </InputAdornment>
            ),
          }}
          multiline
          rows={6}
          placeholder="Add answer"
          onChange={handleInputChange}
          variant="outlined"
          error={!!errors.answer}
          helperText={errors?.answer?.message}
        />
        <div className={style.bottom}>
          <p className={style.info}>Remember: you can't edit or delete this answer</p>
          <Button variant="contained" color="primary" className={style.btn} type="submit">
            Send answer
          </Button>
        </div>
      </form>
    </div>
  );
}
