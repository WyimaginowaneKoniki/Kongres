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
import "../App.css";

function SignUpForm(props) {
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
    textfield: {
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

  const style = styles();
  const [values, setValues] = React.useState({
    specialization: "",
  });

  function handleChange(event) {
    setValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className={style.main}>
      <form className={style.form} noValidate>
        <TextField
          className={style.textfield}
          required
          id="first-name-signup"
          name="first-name"
          label="First name"
          autoComplete="first-name"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          className={style.textfield}
          required
          id="last-name-signup"
          name="last-name"
          label="Last name"
          autoComplete="family-name"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          className={style.textfield}
          required
          id="email-signup"
          name="email"
          label="Email"
          placeholder="email@example.com"
          autoComplete="email"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          className={style.textfield}
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
          className={style.textfield}
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
          className={style.textfield}
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
            onChange={handleChange}
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
          control={<Checkbox required name="acceptance" color="primary" />}
          label="I accept the Rules of Scienture Conference and I agree to processing my personal data included in the above form by...*"
        />

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
  );
}

export default SignUpForm;
