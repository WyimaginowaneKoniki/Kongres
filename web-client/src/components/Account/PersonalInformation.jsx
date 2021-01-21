import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Container } from "@material-ui/core/";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PersonalInformation(props) {
  const style = makeStyles({
    main: {
      padding: "2%",
      display: "flex",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      maxWidth: "320px",
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
    },
    columns: {
      display: "flex",
    },
    signInUpOther: {
      maxWidth: "400px",
      marginLeft: "144px",
    },
  })();

  React.useEffect(() => {
    setFirstName(props.info.name);
    setLastName(props.info.surname);
    setEmail(props.info.email);
    setUniversity(props.info.university);
    setAcademicTitle(props.info.academicTitle);
    setSpecialization(props.info.specialization);
    setRole(props.info.role);
    setPhoto(props.info.photoBase64);
  }, [
    props.info.name,
    props.info.surname,
    props.info.email,
    props.info.university,
    props.info.academicTitle,
    props.info.specialization,
    props.info.role,
  ]);

  const [role, setRole] = React.useState(props.info.role);
  const [specialization, setSpecialization] = React.useState(props.info.specialization);
  const [firstName, setFirstName] = React.useState(props.info.name);
  const [lastName, setLastName] = React.useState(props.info.surname);
  const [email, setEmail] = React.useState(props.info.email);
  const [university, setUniversity] = React.useState(props.info.university);
  const [academicTitle, setAcademicTitle] = React.useState(props.info.academicTitle);

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

  return (
    <Container component="main">
      <div className={style.main}>
        <div className={style.columns}>
          <form
            className={style.form}
            noValidate
            onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
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

            <TextField
              className={style.textField}
              inputRef={register}
              id="specialization-personal-information"
              name="specialization"
              label="Specialization"
              autoComplete="specialization"
              InputLabelProps={{
                shrink: true,
              }}
              value={specialization}
              variant="outlined"
              error={!!errors.academicTitle}
              helperText={errors?.academicTitle?.message}
            />
          </form>
        </div>
      </div>
    </Container>
  );
}
