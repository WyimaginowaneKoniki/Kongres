import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "../App.css";

const styles = makeStyles({
  main: {
    padding: "2%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    width: "400px",
    margin: "16px",
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
    marginBottom: "32px",
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
});

export default function SignUpForm() {
  const [values, setValues] = React.useState({
    specialization: "",
    password: "",
    showPassword: false,
  });

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
      //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,255}$/,
        "At least: 12 characters, 1 uppercase, 1 lowercase, 1 number and 1 special"
      )
      .min(12, "Password should be at least 12 characters long")
      .max(255, "Password should be 255 characters or less")
      .required("Required field"),
    university: yup.string().max(255, "University should be 255 character long or less"),
    academicTitle: yup
      .string()
      .max(255, "Academic title should be 255 character long or less"),
    specialization: yup.string().required("Required field"),
  });

  const { register, handleSubmit, control, errors } = useForm({
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

  const style = styles();

  return (
    <Container component="main">
      <div className={style.main}>
        <form
          className={style.form}
          noValidate
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
        >
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
          <FormControl
            className={style.textField}
            required
            name="password"
            variant="outlined"
            inputRef={register}
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
            {/*  to do: add helper text */}
            <FormHelperText id="helper-text-password-signup">
              {errors?.password?.message}
            </FormHelperText>
          </FormControl>
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
          <FormControl
            variant="outlined"
            name="specialization"
            className={style.formControl}
            required
            inputRef={register}
          >
            <InputLabel
              shrink
              htmlFor="specialization-signup"
              className={style.inputLabel}
            >
              Specialization
            </InputLabel>
            <Select
              displayEmpty
              value={values.specialization}
              // onChange={handleChange}
              input={
                <OutlinedInput notched name="specialization" id="specialization-signup" />
              }
            >
              <MenuItem className={style.MenuItem} value="">
                Select
              </MenuItem>
              <MenuItem className={style.MenuItem} value={"Computer Science"}>
                Computer Science
              </MenuItem>
              <MenuItem className={style.MenuItem} value={"Mathematics"}>
                Mathematics
              </MenuItem>
              <MenuItem className={style.MenuItem} value={"Biology"}>
                Biology
              </MenuItem>
              <MenuItem className={style.MenuItem} value={"Chemistry"}>
                Chemistry
              </MenuItem>
              <MenuItem className={style.MenuItem} value={"Psychics"}>
                Psychics
              </MenuItem>
              <MenuItem className={style.MenuItem} value={"Geography"}>
                Geography
              </MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            className={style.formControlLabel}
            control={
              <Checkbox
                inputRef={register}
                required
                name="acceptance"
                color="primary"
                defaultValue={false}
              />
            }
            label="I accept the Rules of Scienture Conference and I agree to processing my personal data included in the above form by...*"
          />{" "}
          <Button
            className={style.btnSignup}
            color="primary"
            type="submit"
            variant="contained"
          >
            Sign up
          </Button>
        </form>
      </div>
    </Container>
  );
}
