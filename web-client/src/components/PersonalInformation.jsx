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
    width: "130px",
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

export default function PersonalInformation(props) {
  const [specialization, setSpecialization] = React.useState(props.specialization);
  const [firstName, setFirstName] = React.useState(props.firstName);
  const [lastName, setLastName] = React.useState(props.lastName);
  const [email, setEmail] = React.useState(props.email);
  const [university, setUniversity] = React.useState(props.university);
  const [academicTitle, setAcademicTitle] = React.useState(props.academicTitle);

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
    university: yup.string().max(255, "University should be 255 character long or less"),
    academicTitle: yup
      .string()
      .max(255, "Academic title should be 255 character long or less"),
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChangeSelect = (event) => {
    setSpecialization(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeUniversity = (event) => {
    setUniversity(event.target.value);
  };

  const handleChangeAcademicTitle = (event) => {
    setAcademicTitle(event.target.value);
  };

  const style = styles();

  return (
    <Container component="main">
      <div className={style.main}>
        <div className={style.columns}>
          <form
            className={style.form}
            noValidate
            onSubmit={handleSubmit((data) => 
            alert(JSON.stringify(data)))}
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
              value={firstName}
              onChange={handleChangeFirstName}
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
              value={lastName}
              onChange={handleChangeLastName}
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
              value={email}
              onChange={handleChangeEmail}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={!!errors.email}
              helperText={errors?.email?.message}
            />

            {/* University Input */}
            <TextField
              className={style.textField}
              inputRef={register}
              id="university-signup"
              name="university"
              label="University"
              autoComplete="organization"
              value={university}
              onChange={handleChangeUniversity}
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
              value={academicTitle}
              onChange={handleChangeAcademicTitle}
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
            {props.participant ? <Avatar name='avatar'/> : null}

            {/* Acceptance - Rules of Conference */}
            {!props.firstName && !props.lastName && !props.email ? 
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
            :null}
            {!props.firstName && !props.lastName && !props.email ? 
            <FormHelperText error className={style.formHelperText}>
              {errors.acceptance ? errors.acceptance.message : " "}
            </FormHelperText>
            : null}

            {/* Button Submit */}
            <Button
              className={style.btnSignup}
              color="primary"
              type="submit"
              variant="contained"
            >
              {!props.firstName && !props.lastName && !props.email ? "Sign up" : "Save changes"}
            </Button>
          </form>

          {/* Info about signing in */}
          {props.btn ? 
          <div className={style.signInUpOther}>
            <h2 className={style.heading}>{props.heading}</h2>
            <p className={style.content}>{props.content}</p>
            <Button variant="outlined" color="primary" className={style.btnSignIn}>
              {props.btn}
            </Button>
          </div> : null }
        </div>
      </div>
    </Container>
  );
}
