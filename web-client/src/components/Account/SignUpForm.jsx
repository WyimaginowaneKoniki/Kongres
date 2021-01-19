import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Container,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core/";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "./Avatar";
import { categories } from "../../Constants";
import { Link } from "react-router-dom";

export default function SignUpForm(props) {
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
    formControl: {
      marginBottom: "32px",
      width: "300px",
    },
    formControlLabel: {
      marginBottom: "8px",
    },
    btnSignup: {
      width: "100px",
    },
    menuItem: {
      textAlign: "left",
    },
    inputLabel: {
      backgroundColor: "white",
      padding: "0px 4px",
      marginLeft: "-4px",
    },
    formHelperText: {
      marginBottom: "32px",
    },
    formHelperTextCheckbox: {
      marginBottom: "8px",
    },
    heading: {
      textAlign: "left",
    },
    content: {
      textAlign: "left",
    },
    btnSignIn: {
      marginTop: "8px",
    },
    logIn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "400px",
      margin: "24px",
    },
  })();

  const [values, setValues] = React.useState({
    specialization: "",
    password: "",
    showPassword: false,
  });

  const [specialization, setSpecialization] = React.useState("Select");
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[A-Za-z]*$/, "First name should only contain letters")
      .max(26, "First name should be 26 characters or less")
      .required("Required field"),
    lastName: yup
      .string()
      .matches(/^[A-Za-z]*$/, "Last name should only contain letters")
      .max(26, "Last name should be 26 characters or less")
      .required("Required field"),
    email: yup
      .string()
      .email("Email should have correct format")
      .required("Required field"),
    password: yup
      .string()
      .required("Required field")
      .min(12, "Password must be at least 12 characters long")
      .matches(
        /^.*(?=.{12,255})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "At least: 12 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
      ),
    university: yup.string().max(255, "University should be 255 character long or less"),
    academicTitle: yup
      .string()
      .max(255, "Academic title should be 255 character long or less"),
    specialization: yup.string().when("specializations", {
      is: (specializations) => specialization === "Select",
      then: yup.string().required("Required field"),
    }),
    acceptance: yup.boolean().oneOf([true], "Required field").required("Required field"),
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeSelect = (event) => {
    setSpecialization(event.target.value);
  };

  // store reference/data of form
  const formRef = React.useRef(null);

  const onSubmit = () => props.GetFormData(new FormData(formRef.current));

  return (
    <Container component="main">
      <div className={style.main}>
        <div className={style.columns}>
          <form
            ref={formRef}
            className={style.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >
            {/* FirstName Input */}
            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="first-name-signup"
              name="firstName"
              label="First name"
              autoComplete="first-name"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
            />

            {/* LastName Input */}
            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="last-name-signup"
              name="lastName"
              label="Last name"
              autoComplete="family-name"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
            />

            {/* Email Input */}
            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="email-signup"
              name="email"
              label="Email"
              type="email"
              placeholder="email@example.com"
              autoComplete="email"
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
                id="password-signup"
                name="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                autoComplete="new-password"
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
              {/*  to do: add helper text and/or strength bar */}
              <FormHelperText error={true} id="helper-text-password-signup">
                {errors?.password?.message}
              </FormHelperText>
            </FormControl>

            {/* University Input */}
            <TextField
              className={style.textField}
              inputRef={register}
              id="university-signup"
              name="university"
              label="University"
              autoComplete="organization"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={!!errors.university}
              helperText={errors?.university?.message}
            />

            {/* AcademicTitle Input */}
            <TextField
              className={style.textField}
              inputRef={register}
              id="academic-title-signup"
              name="academicTitle"
              label="Academic title"
              autoComplete="job-title"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={!!errors.academicTitle}
              helperText={errors?.academicTitle?.message}
            />

            {/* Specialization Input - Select*/}
            <TextField
              select
              className={style.textField}
              inputRef={register}
              required
              id="specialization-signup"
              name="specialization"
              label="Specialization"
              autoComplete="specialization"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Select"
              variant="outlined"
              onChange={handleChangeSelect}
              error={!!errors.specialization}
              helperText={errors?.specialization?.message}
              value={specialization}
            >
              {categories.map((category) => (
                <MenuItem className={style.MenuItem} value={category.value}>
                  {category.value}
                </MenuItem>
              ))}
            </TextField>

            {/* Avatar */}
            {props.participant ? <Avatar name="avatar" /> : null}

            {/* Acceptance - Rules of Conference */}
            <FormControlLabel
              control={
                <Checkbox
                  inputRef={register}
                  required
                  id="acceptance-signup"
                  name="acceptance"
                  color="primary"
                />
              }
              label="I accept the Rules of Scienture Conference and I agree to processing my personal data included in the above form*"
              inputRef={register}
              name="acceptance"
            />
            <FormHelperText error className={style.formHelperTextCheckbox}>
              {errors.acceptance ? errors.acceptance.message : " "}
            </FormHelperText>

            {/* Button Submit */}
            <Button
              className={style.btnSignup}
              color="primary"
              type="submit"
              variant="contained"
            >
              Sign up
            </Button>
          </form>

          {/* Info about log in */}
          <div className={style.logIn}>
            <h2 className={style.heading}>{props.heading}</h2>
            <p className={style.content}>{props.content}</p>
            <Link to={props.signInLink} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary" className={style.btnSignIn}>
                {props.btn}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
