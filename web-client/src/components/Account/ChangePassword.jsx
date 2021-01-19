import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Container,
  OutlinedInput,
  InputLabel,
  IconButton,
  InputAdornment,
  FormHelperText,
  Snackbar,
} from "@material-ui/core/";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MuiAlert from "@material-ui/lab/Alert";

export default function ChangePassword() {
  const style = makeStyles({
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
    inputLabel: {
      backgroundColor: "white",
      padding: "0px 4px",
      marginLeft: "-4px",
    },
    btnChange: {
      width: "155px",
      float: "right",
      marginLeft: "auto",
    },
    info: {
      width: "100%",
      float: "left",
      color: "grey",
      textAlign: "left",
      padding: "2%",
      marginLeft: "16px",
    },
  })();

  const schema = yup.object().shape({
    currentpassword: yup.string().required("Required field"),
    newpassword: yup
      .string()
      .required("Required field")
      .min(12, "Password must be at least 12 characters long")
      .matches(
        /^.*(?=.{12,255})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "At least: 12 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
      ),
  });

  // Alert
  function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
  }

  const durationOfAlert = 4000;

  const [openAlertSuccess, SetOpenAlertSuccess] = React.useState(false);
  const [openAlertError, SetOpenAlertError] = React.useState(false);

  // Show alert: successfully or unsuccessfully
  const ShowAlert = () => {
    CloseAlert();
    if (isSuccessfully()) SetOpenAlertSuccess(true);
    else SetOpenAlertError(true);
  };

  // Close alert
  const CloseAlert = (_, reason) => {
    if (reason === "clickaway") return;

    SetOpenAlertSuccess(false);
    SetOpenAlertError(false);
  };

  // Current Password
  const [currentPassword, SetCurrentPassword] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChangeCurrentPassword = (prop) => (event) => {
    SetCurrentPassword({ ...currentPassword, [prop]: event.target.value });
  };

  const handleClickShowCurrentPassword = () => {
    SetCurrentPassword({
      ...currentPassword,
      showCurrentPassword: !currentPassword.showCurrentPassword,
    });
  };

  const handleMouseDownCurrentPassword = (event) => {
    event.preventDefault();
  };

  // New Password
  const [newPassword, SetNewPassword] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChangeNewPassword = (prop) => (event) => {
    SetNewPassword({ ...newPassword, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    SetNewPassword({
      ...newPassword,
      showNewPassword: !newPassword.showNewPassword,
    });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // Check if password is successfully
  const isSuccessfully = () => {
    return currentPassword.password === "Zaq12wsx1234@";
  };

  return (
    <Container component="main">
      <div className={style.main}>
        <div>
          <form
            className={style.form}
            noValidate
            onSubmit={handleSubmit(ShowAlert)}
          >
            {/* Current password */}
            <FormControl
              className={style.textField}
              required
              name="currentpassword"
              variant="outlined"
              error={!!errors.currentpassword}
            >
              <InputLabel shrink className={style.inputLabel}>
                Current Password
              </InputLabel>
              <OutlinedInput
                inputRef={register}
                id="current-password"
                name="currentpassword"
                type={currentPassword.showCurrentPassword ? "text" : "password"}
                value={currentPassword.currentPassword}
                autoComplete="current-password"
                onChange={handleChangeCurrentPassword("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                      onMouseDown={handleMouseDownCurrentPassword}
                      edge="end"
                    >
                      {currentPassword.showCurrentPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={true} id="helper-text-current-password">
                {errors?.currentpassword?.message}
              </FormHelperText>
            </FormControl>

            {/* New password */}
            <FormControl
              className={style.textField}
              required
              name="newpassword"
              variant="outlined"
              error={!!errors.newpassword}
            >
              <InputLabel shrink className={style.inputLabel}>
                New Password
              </InputLabel>
              <OutlinedInput
                inputRef={register}
                id="new-password"
                name="newpassword"
                type={newPassword.showNewPassword ? "text" : "password"}
                value={newPassword.newPassword}
                autoComplete="new-password"
                onChange={handleChangeNewPassword("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownNewPassword}
                      edge="end"
                    >
                      {newPassword.showNewPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={true} id="helper-text-new-password">
                {errors?.newpassword?.message}
              </FormHelperText>
            </FormControl>
            <Button
              className={style.btnChange}
              color="primary"
              type="submit"
              variant="contained"
            >
              Change password
            </Button>
          </form>
          <span className={style.info}> You will receive email... </span>
        </div>
      </div>
      {/* Successfully send email */}
      <Snackbar
        open={openAlertSuccess}
        autoHideDuration={durationOfAlert}
        onClose={CloseAlert}
      >
        <Alert onClose={CloseAlert} severity={"success"}>
          {"Your password has been changed successfully"}
        </Alert>
      </Snackbar>
      {/* Unsuccessfully send email */}
      <Snackbar
        open={openAlertError}
        autoHideDuration={durationOfAlert}
        onClose={CloseAlert}
      >
        <Alert onClose={CloseAlert} severity={"error"}>
          {"Incorrect password"}
        </Alert>
      </Snackbar>
    </Container>
  );
}
