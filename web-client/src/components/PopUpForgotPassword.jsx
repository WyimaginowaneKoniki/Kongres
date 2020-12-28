import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dialog from "@material-ui/core/Dialog";

const styles = makeStyles({
  main: {
    display: "inline-block",
  },
  content: {
    padding: "30px 100px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    float: "left",
    textAlign: "left",
    maxWidth: "400px",
    margin: "16px",
  },
  textField: {
    marginBottom: "32px",
    width: "300px",
  },
  send: {
    width: "100px",
    textTransform: "none",
    float: "right",
    marginLeft: "auto",
    display: "block",
  },
  textButton: {
    textTransform: "none",
  },
  message: {
    textAlign: "center",
    marginTop: "30px",
    marginBottom: "30px",
  },
});

const sendSuccessfullyStyle = {
  visibility: "visible",
  color: "green",
};
const sendUnsuccessfullyStyle = {
  visibility: "visible",
  color: "red",
};
const defaultStyle = {
  visibility: "hidden",
};

export default function PopUpForgotPassword(props) {
  const [values, setValues] = React.useState({
    email: "",
  });

  const schema = yup.object().shape({
    email: yup.string().email("Email should have correct format"),
    //   .required("Required field"),
  });

  const [open, setOpen] = React.useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    SetMessageStyle(defaultStyle);
    values.email = "";
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = styles();

  const [_messageStyle, SetMessageStyle] = useState(defaultStyle);

  let isSuccessfully = true;

  return (
    <div className={style.main}>
      {/* Forgot password */}
      <Button
        className={style.textButton}
        color="primary"
        onClick={handleClickOpen}
      >
        Forgot password?
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <span className={style.message}>You will receive link...</span>
        <div className={style.content}>
          <form
            className={style.form}
            noValidate
            // If email has been sent successfully or not
            onSubmit={handleSubmit((data) => {
              if (isSuccessfully) {
                SetMessageStyle(sendSuccessfullyStyle);
                alert(data.email);
                // Send email to parent component
                props.SET_EMAIL(data.email);
              } else SetMessageStyle(sendUnsuccessfullyStyle);
            })}
          >
            <TextField
              className={style.textField}
              inputRef={register}
              // required
              id="forgot-email-signin"
              name="email"
              label="Login/Email"
              type="email"
              value={values.email}
              autoComplete="email"
              onChange={handleChange("email")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            {/* Button Send */}
            <Button
              className={style.send}
              color="primary"
              type="submit"
              variant="contained"
            >
              Send
            </Button>
          </form>
        </div>
        <span className={style.message} style={_messageStyle}>
          {isSuccessfully ? "Link has been sent" : "Link has not been sent"}
        </span>
      </Dialog>
    </div>
  );
}