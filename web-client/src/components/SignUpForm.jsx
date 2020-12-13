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
  // const [values, setValues] = React.useState({
  //   specialization: "",
  // });
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[^0-9]*$/, "First name shouldn't contain numbers")
      .required("Required field"),
    lastName: yup
      .string()
      .matches(/^[^0-9]*$/, "Last name shouldn't contain numbers")
      .required("Required field"),
    email: yup
      .string()
      .email("Email should have correct format")
      .required("Required field"),
  });

  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: {
      email: '',
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

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

          {
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
            /*
        <TextField
          className={style.textField}
          required
          id="new-password-signup"
          name="new-password"
          label="Password"
          type="password"
          helperText="Password must contain..."
          autoComplete="new-password"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          className={style.textField}
          id="university-signup"
          name="university"
          label="University"
          autoComplete="organization"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          className={style.textField}
          id="academic-title-signup"
          name="academic-title"
          label="Academic title"
          autoComplete="job-title"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <FormControl variant="outlined" className={style.formControl} required>
          <InputLabel shrink htmlFor="specialization-signup" className={style.inputLabel}>
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
          control={<Checkbox inputRef={register} required name="acceptance" color="primary" defaultValue={false} />}
          label="I accept the Rules of Scienture Conference and I agree to processing my personal data included in the above form by...*"
        /> */
          }

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
