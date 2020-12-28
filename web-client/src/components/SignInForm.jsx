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
import PopUpForgotPassword from "../components/PopUpForgotPassword";

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
  bottomMessage: {
    marginTop: "300px",
    display: "block",
  }
});

const correctStyle = {
  display: "none",
};
const incorrectStyle = {
  display: "block",
};

export default function SignInForm(props) {
  // This is data received from API
  const response = {
    status: 200,
  };

  const [_messageStyle, SetMessageStyle] = useState(correctStyle);

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

  const [_forgotEmail, SetForgotEmail] = useState(null);
  const passEmail = (email) => {
    SetForgotEmail(email);
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
              if (response.status === 200) {
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
              <PopUpForgotPassword SET_EMAIL={passEmail} />
              {console.log(_forgotEmail)}
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
      <span className={style.bottomMessage}>
        If you want to sign in as {props.signInAs}, Sign in{" "}
        <Link to={props.signInAsOtherLink}>here</Link>
      </span>
    </Container>
  );
}