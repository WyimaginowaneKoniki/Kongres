import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Container,
  Button,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
} from "@material-ui/core/";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
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
      maxWidth: "300px",
      margin: "24px",
      "@media only screen and (max-width: 768px)": {
        marginLeft: "0",
        marginRight: "0",
      },
    },
    columns: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      "@media only screen and (max-width: 768px)": {
        justifyContent: "center",
      },
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
    },
    loginLinks: {
      display: "flex",
      justifyContent: "space-between",
    },
    btnSignUp: {
      marginTop: "8px",
    },
    signUp: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "400px",
      margin: "24px",
    },
    signUpLink: {
      textDecoration: "none",
    },
    formHelperText: {
      marginBottom: "32px",
    },
    bottomMessage: {
      marginTop: "80px",
      textAlign: "center",
    },
    inputLabel: {
      backgroundColor: "white",
      padding: "0px 4px",
      marginLeft: "-4px",
    },
  })();

  const correctStyle = {
    display: "none",
  };
  const incorrectStyle = {
    display: "block",
  };

  const [messageStyle, SetMessageStyle] = React.useState(correctStyle);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const [forgotEmail, SetForgotEmail] = React.useState(null);
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
              label="Email"
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
            <FormControl
              className={style.textField}
              required
              name="password"
              variant="outlined"
              error={!!errors.password}
            >
              <InputLabel shrink className={style.inputLabel}>
                Password
              </InputLabel>
              <OutlinedInput
                inputRef={register}
                id="password-signin"
                name="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                autoComplete="current-password"
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {/* Info about correct password and email */}
              <FormHelperText error={true} id="helper-text-password-signup">
                {errors?.password?.message}
              </FormHelperText>
              <FormHelperText
                error={true}
                style={messageStyle}
                className={style.formHelperText}
              >
                {"Error: Incorrect password or/and email"}
              </FormHelperText>
            </FormControl>
            <div className={style.loginLinks}>
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
          {/* Info about signing up */}
          <div className={style.signUp}>
            <h2 className={style.heading}>{props.heading}</h2>
            <p className={style.content}>{props.content}</p>
            <Link to={props.signUpLink} className={style.signUpLink}>
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
      </div>

      <p className={style.bottomMessage}>
        If you want to log in as {props.signInAs}, go to{" "}
        <Link to={props.signInAsOtherLink}>login page</Link>
      </p>
    </Container>
  );
}
