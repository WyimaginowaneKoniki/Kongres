import React, { useState } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@material-ui/core/InputAdornment";

function ScientificWorkAuthorAnswerInput(props) {
  const style = makeStyles({
    answerInput: {
      width: "600px",
      margin: "20px",
      marginLeft: "150px",
      display: "flex",
      flexFlow: "row wrap",
    },
    replyToReview: {
      fontWeight: "bold",
      fontSize: "20px",
      width: "600px",
      textAlign: "left",
    },
    userInfo: {
      width: "80px",
      alignItems: "center",
    },
    image: {
      width: "80px",
      height: "80px",
      borderRadius: "50px",
    },
    userName: {
      textAlign: "center",
    },
    inputForm: {
      width: "520px",
      display: "flex",
      flexFlow: "row wrap",
    },
    input: {
      width: "510px",
      marginLeft: "20px",
    },
    info: {
      fontSize: "14px",
      color: "grey",
      width: "390px",
    },
    btn: {
      textTransform: "none",
      width: "120px",
      height: "45px",
      margin: "5px",
    },
  })();

  const maxAnswerLength = 255;

  const [characterCount, setCharacterCount] = useState(0);

  const handleInputChange = (event) => {
    setCharacterCount(event.target.value.length);
  };

  const schema = yup.object().shape({
    answer: yup
      .string()
      .matches(
        /^[A-Za-z0-9,.?\s-+―\];—'–)(‒"‑[‐-]*$/,
        "Answer should only contain letters and digits"
      )
      .max(
        maxAnswerLength,
        `Answer should be ${maxAnswerLength} characters or less`
      ),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  return (
    <div className={style.answerInput}>
      <p className={style.replyToReview}>Reply to review</p>
      <div className={style.userInfo}>
        <img src={props.photo} className={style.image} alt=""></img>
        <p className={style.userName}>{props.name}</p>
      </div>
      <form
        className={style.inputForm}
        noValidate
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
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
        <p className={style.info}>
          Remember: you can't edit or delete this comment
        </p>
        <Button
          variant="contained"
          color="primary"
          className={style.btn}
          type="submit"
        >
          Send answer
        </Button>
      </form>
    </div>
  );
}

export default ScientificWorkAuthorAnswerInput;
