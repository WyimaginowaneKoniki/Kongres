import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import "../App.css";

function SignUpForm(props) {
  const styles = makeStyles({
    main: {
      padding: "2%",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "400px",
      margin: "16px",
    },
    textfield: {
      marginBottom: "32px",
      width: "300px",
    },
    formcontrol: {
      marginBottom: "32px",
    },
    btnSignup: {
      width: "100px",
    },
  });

  const style = styles();

  return (
    <div className={style.main}>
      <form className={style.form} noValidate>
        <TextField
          className={style.textfield}
          required
          id="first-name"
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
          id="last-name"
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
          id="email"
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
          id="new-password"
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
          id="university"
          name="university"
          label="University"
          autoComplete="organization"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <FormControlLabel
          control={
            <Checkbox
              required
              name="acceptance"
              color="primary"
            />
          }
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
