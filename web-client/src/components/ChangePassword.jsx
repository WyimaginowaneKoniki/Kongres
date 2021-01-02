import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function ChangePassword(props) 
{
    const styles = makeStyles({
        main: 
        {
            padding: "2%",
            display: "flex",
        },
        columns: 
        {
            display: "flex",
        },
        form: 
        {
            display: "flex",
            flexDirection: "column",
            float: "left",
            textAlign: "left",
            maxWidth: "400px",
            margin: "16px",
        },
        textField: 
        {
            marginBottom: "32px",
            width: "300px",
        },
        inputLabel: 
        {
            backgroundColor: "white",
            padding: "0px 4px",
            marginLeft: "-4px",
        },
        btnChange: 
        {
            width: "155px",
            textTransform: "none",
        },
        info:
        {
            width: '100%',
            float: 'left',
            color: 'grey',
            textAlign: 'left',
            padding: '2%',
            marginLeft: "16px",
        },
    });

    const [valuesCurrent, setValuesCurrent] = React.useState({
        password: "",
        showPassword: false,
    });

    const [valuesNew, setValuesNew] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleChangeNewPassword = (prop) => (event) => {
        setValuesNew({ ...valuesNew, [prop]: event.target.value });
    };
    
    const handleClickShowNewPassword = () => {
        setValuesNew({ ...valuesNew, showNewPassword: !valuesNew.showNewPassword });
    };
    
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeCurrentPassword = (prop) => (event) => {
        setValuesCurrent({ ...valuesCurrent, [prop]: event.target.value });
    };
    
    const handleClickShowCurrentPassword = () => {
        setValuesCurrent({ ...valuesCurrent, showCurrentPassword: !valuesCurrent.showCurrentPassword });
    };
    
    const handleMouseDownCurrentPassword = (event) => {
        event.preventDefault();
    };

    const style = styles();

    const schema = yup.object().shape({
        currentpassword: yup
        .string()
        .required("Required field")
        .min(12, "Password must be at least 12 characters long")
        .matches(
            /^.*(?=.{12,255})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "At least: 12 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        ),
        newpassword: yup
        .string()
        .required("Required field")
        .min(12, "Password must be at least 12 characters long")
        .matches(
            /^.*(?=.{12,255})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "At least: 12 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        )
    })

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
          email: "",
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
      });    

    return(
        <Container component="main">
            <div className={style.main}>
                <div classname={style.columns}>
                    <form
                        className={style.form}
                        noValidate
                        onSubmit={handleSubmit((data) => 
                        alert(JSON.stringify(data)))}
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
                                id="password-myprofile"
                                name="currentpassword"
                                type={valuesCurrent.showCurrentPassword ? "text" : "password"}
                                value={valuesCurrent.currentPassword}
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
                                            {valuesCurrent.showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {/*  to do: add helper text and/or strength bar */}
                            <FormHelperText error={true} id="helper-text-password-myprofile">
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
                                id="password-myprofile"
                                name="newpassword"
                                type={valuesNew.showNewPassword ? "text" : "password"}
                                value={valuesNew.newPassword}
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
                                            {valuesNew.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {/*  to do: add helper text and/or strength bar */}
                            <FormHelperText error={true} id="helper-text-password-myprofile">
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
        </Container>
    )
}
export default ChangePassword