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
import Avatar from "../components/Avatar";

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
    textTransform: "none",
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
  heading: {
    textAlign: "left",
  },
  content: {
    textAlign: "left",
    display: "block",
  },
  btnSignIn: {
    margin: "8px 0px",
    textTransform: "none",
  },
  columns: {
    display: "flex",
  },
  signInUpOther: {
    maxWidth: "400px",
    float: "left",
    marginLeft: "144px",
  },
});

export default function SignUpForm(props) {
  const [values, setValues] = React.useState({
    specialization: "",
    password: "",
    showPassword: false,
  });

  const [specialization, setSpecialization] = React.useState("");
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
    university: yup
      .string()
      .max(255, "University should be 255 character long or less"),
    academicTitle: yup
      .string()
      .max(255, "Academic title should be 255 character long or less"),
    acceptance: yup
      .boolean()
      .oneOf([true], "Required field")
      .required("Required field"),
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

  const style = styles();

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
            <FormControl
              variant="outlined"
              name="specialization"
              className={style.formControl}
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
                name="specialization"
                value={specialization}
                onChange={handleChangeSelect}
                input={
                  <OutlinedInput
                    notched
                    name="specialization"
                    id="specialization-signup"
                  />
                }
                inputRef={register}
                error={!!errors.specialization}
                helperText={errors?.specialization?.message}
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

            {/* Avatar */}
            {props.participant ? <Avatar name="avatar" /> : null}

            {/* Acceptance - Rules of Conference */}
            <FormControlLabel
              className={style.formControlLabel}
              control={
                <Checkbox
                  inputRef={register}
                  required
                  id="acceptance-signup"
                  name="acceptance"
                  color="primary"
                />
              }
              label="I accept the Rules of Scienture Conference and I agree to processing my personal data included in the above form by...*"
              inputRef={register}
              name="acceptance"
            />
            <FormHelperText error className={style.formHelperText}>
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

          {/* Info about signing in */}
          <div className={style.signInUpOther}>
            <h2 className={style.heading}>{props.heading}</h2>
            <p className={style.content}>{props.content}</p>
            <Button
              variant="outlined"
              color="primary"
              className={style.btnSignIn}
            >
              {props.btn}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
