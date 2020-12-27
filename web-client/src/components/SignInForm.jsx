import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import PopUpForgotPassword from '../components/PopUpForgotPassword';

const styles = makeStyles({
  main: {
    padding: "2%",
    display: "flex",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    float: "left",
    textAlign: "left",
    maxWidth: "400px",
    margin: "16px",
  },
  columns: {
    display: "flex",
  },
  textField: {
    marginBottom: "32px",
    width: "300px",
  },
  heading: {
    textAlign: "left",
  },
  content: {
    textAlign: "left",
    display: "block",
  },
  btnSignIn: {
    width: "100px",
    textTransform: "none",
    float: "right",
  },
  btnSignUp: {
    margin: "8px 0px",
    textTransform: "none",
  },
  signUp: {
    maxWidth: "400px",
    float: "left",
    marginLeft: "144px",
  },
  formHelperText: {
    marginBottom: "32px",
  },
  textButton: {
    textTransform: "none",
  },
  mainDialog: {
    
  },
});

const correctStyle = {
  display: "none",
};
const incorrectStyle = {
  display: "block",
};

export default function SignInForm(props) {
  const data = {
    email: "mail@gmail.com",
    password: "xd",
  };

  const AreEmailAndPasswordCorrect = () => {
    if (data.email === values.email && data.password === values.password)
      return true;
    return false;
  };

  const [_messageStyle, SetMessageStyle] = useState(correctStyle);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = React.useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email should have correct format")
      .required("Required field"),

    password: yup.string().required("Required field"),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = styles();

  return (
    <Container component="main">
      <div className={style.main}>
        <div className={style.columns}>
          <form
            className={style.form}
            noValidate
            onSubmit={handleSubmit((data) => {
              if (AreEmailAndPasswordCorrect()) {
                SetMessageStyle(correctStyle);
                alert(JSON.stringify(data));
              } else SetMessageStyle(incorrectStyle);
            })}
          >
            {/* Login/Email Input */}
            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="email-signin"
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
            {/* Password Input */}
            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="password-signin"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              autoComplete="current-password"
              onChange={handleChange("password")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            {/* Info about correct password and email */}
            <FormHelperText
              error={true}
              style={_messageStyle}
              className={style.formHelperText}
            >
              {"Error: Incorrect password or/and email"}
            </FormHelperText>
            <div>
              {/* Forgot password */}
              <PopUpForgotPassword />
              {/* Button Submit */}
              <Button
                className={style.btnSignIn}
                color="primary"
                type="submit"
                variant="contained"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>

        {/* Info about signing up */}
        <div className={style.signUp}>
          <h2 className={style.heading}>{props.heading}</h2>
          <p className={style.content}>{props.content}</p>
          <Link to={props.link} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              className={style.btnSignUp}
            >
              {props.btn}
            </Button>
          </Link>
        </div>
      </div>

      {/* <Dialog className={style.mainDialog} open={open} onClose={handleClose}>
          <form
            className={style.form}
            noValidate
            // onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
          >
            <TextField
              className={style.textField}
            //   inputRef={register}
              required
              id="forgot-email-signin"
              name="forgot-email"
              label="Login/Email"
              type="email"
              value={values.forgotEmail}
              autoComplete="email"
              onChange={handleChange("forgotEmail")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            //   error={!!errors.email}
            //   helperText={errors?.email?.message}
            />
            Button Send
            <Button
              className={style.btnSignIn}
              color="primary"
            //   type="submit"
              variant="contained"
            >
              Send
            </Button>
          </form>
        </Dialog> */}
    </Container>
  );
}