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

function ChangePassword() 
{
    const styles = makeStyles({
        main: 
        {
            padding: "2%",
            display: "flex",
        },
        // columns: 
        // {
        //     display: "flex",
        // },
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

    {/* Current Password */}
    const [valuesCurrent, SetValuesCurrent] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleChangeCurrentPassword = (prop) => (event) => {
        SetValuesCurrent({ ...valuesCurrent, [prop]: event.target.value });
    };
    
    const handleClickShowCurrentPassword = () => {
        SetValuesCurrent({ ...valuesCurrent, showCurrentPassword: !valuesCurrent.showCurrentPassword });
    };
    
    const handleMouseDownCurrentPassword = (event) => {
        event.preventDefault();
    };

    {/* New Password */}
    const [valuesNew, SetValuesNew] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleChangeNewPassword = (prop) => (event) => {
        SetValuesNew({ ...valuesNew, [prop]: event.target.value });
    };
    
    const handleClickShowNewPassword = () => {
        SetValuesNew({ ...valuesNew, showNewPassword: !valuesNew.showNewPassword });
    };
    
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

        {/* Confirm Password */}
        const [valuesConfirm, SetValuesConfirm] = React.useState({
            password: "",
            showPassword: false,
        });
    
        const handleChangeConfirmPassword = (prop) => (event) => {
            SetValuesConfirm({ ...valuesConfirm, [prop]: event.target.value });
        };
        
        const handleClickShowConfirmPassword = () => {
            SetValuesConfirm({ ...valuesConfirm, showConfirmPassword: !valuesConfirm.showConfirmPassword });
        };
        
        const handleMouseDownConfirmPassword = (event) => {
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
        ),
        confirmpassword: yup
        .string()
        .required("Required field")
        .min(12, "Password must be at least 12 characters long")
        .matches(
            /^.*(?=.{12,255})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "At least: 12 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        )
    })

    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
      });    

    return(
        <Container component="main">
            <div className={style.main}>
                <div> {/*className={style.columns}*/}
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
                                id="current-password"
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
                            <FormHelperText error={true} id="helper-text-new-password">
                            {errors?.newpassword?.message}
                            </FormHelperText>
                        </FormControl>

                         {/* Confirm password */}
                         <FormControl
                            className={style.textField}
                            required
                            name="confirmpassword"
                            variant="outlined"
                            error={!!errors.confirmpassword}
                        >
                            <InputLabel shrink className={style.inputLabel}>
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                inputRef={register}
                                id="confirm-password"
                                name="confirmpassword"
                                type={valuesConfirm.showConfirmPassword ? "text" : "password"}
                                value={valuesConfirm.confirmPassword}
                                autoComplete="new-password"
                                onChange={handleChangeConfirmPassword("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                        >
                                            {valuesConfirm.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error={true} id="helper-text-confirm-password">
                            {errors?.confirmpassword?.message}
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