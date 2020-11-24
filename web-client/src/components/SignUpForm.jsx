import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../App.css";

function SignUpForm(props) {
  const styles = makeStyles({
    main: {
      padding: "2%",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "200px",
      margin: "16px",
    },
    textfield: {
      marginBottom: "32px",
    },
    formcontrol: {
      marginBottom: "32px",
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
        
      </form>
    </div>
  );
}

export default SignUpForm;
