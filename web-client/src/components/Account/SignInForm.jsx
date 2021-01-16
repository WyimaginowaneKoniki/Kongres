import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import PopUpForgotPassword from "../PopUpForgotPassword";

export default function SignInForm(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
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
      marginTop: "8px",
      textTransform: "none",
    },
    signUp: {
      maxWidth: "400px",
      marginLeft: "144px",
    },
    formHelperText: {
      marginBottom: "32px",
    },
    textButton: {
      textTransform: "none",
    },
    bottomMessage: {
      marginTop: "300px",
      display: "block",
    },
  })();

  const correctStyle = {
    display: "none",
  };
  const incorrectStyle = {
    display: "block",
  };

  const [messageStyle, SetMessageStyle] = useState(correctStyle);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

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

  const [forgotEmail, SetForgotEmail] = useState(null);
  const passEmail = (email) => {
    SetForgotEmail(email);
  };

  const formRef = React.useRef(null);

  async function onSubmit(data) {
    // when response status is not "OK"
    // show error about logging
    const responseStatus = await props.Login(data);
    if (responseStatus === 200) SetMessageStyle(correctStyle);
    else SetMessageStyle(incorrectStyle);
  }

  return (
    <Container component="main">
      <div className={style.main}>
        <div className={style.columns}>
          <form
            ref={formRef}
            className={style.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
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
              style={messageStyle}
              className={style.formHelperText}
            >
              {"Error: Incorrect password or/and email"}
            </FormHelperText>
            <div>
              {/* Forgot password */}
              <PopUpForgotPassword SetEmail={passEmail} />
              {console.log(forgotEmail)}
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
          <Link to={props.signUpLink} style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="primary" className={style.btnSignUp}>
              {props.btn}
            </Button>
          </Link>
        </div>
      </div>
      <p className={style.bottomMessage}>
        If you want to log in as {props.signInAs}, go to{" "}
        <Link to={props.signInAsOtherLink}>login page</Link>
      </p>
    </Container>
  );
}
