import React, { useState, useRef } from "react";
import "../../../App.css";
import DropZone from "../../../components/DropZone";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { URL_API, categories } from "../../../Constants";

export default function AddingWork() {
  const style = makeStyles({
    main: {
      width: "80%",
      margin: "auto",
    },
    left: {
      width: "44%",
      float: "left",
      textAlign: "left",
    },
    right: {
      width: "45%",
      height: "50vh",
      float: "left",
      marginLeft: "10%",
    },
    container: {
      width: "90%",
    },
    textField: {
      marginBottom: "32px",
      width: "100%",
    },
    menuItem: {
      textAlign: "left",
    },
    formControl: {
      marginBottom: "32px",
      width: "100%",
    },
    inputLabel: {
      backgroundColor: "white",
      padding: "0px 4px",
      marginLeft: "-4px",
    },
    addButton: {
      float: "right",
      textTransform: "none",
    },
    textFieldAuthor: {
      marginBottom: "10px",
      float: "left",
      width: "100%",
    },
    formControlLabel: {
      marginBottom: "8px",
      float: "left",
    },
    button: {
      float: "right",
    },
  })();

  const formRef = useRef(null);

  function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
  }

  const durationOfAlert = 4000;

  const [openAlertError, SetOpenAlertError] = useState(false);

  const [file, SetFile] = useState(null);
  const passFile = (f) => {
    SetFile(f);
  };

  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [counts, setCounts] = useState({
    title: 0,
    description: 0,
  });

  const maxTitleSize = 127;
  const maxDescriptionSize = 255;
  const maxAuthors = 9;
  const maxAuthorName = 53;

  const [specialization, setSpecialization] = useState("Select");
  const schema = yup.object().shape({
    title: yup
      .string()
      .matches(
        /^[A-Za-z0-9,.\s-+―\];—'–)(‒"‑[‐-]*$/,
        "Title should only contain letters, digits, spaces and hyphens"
      )
      .max(maxTitleSize, `Title should be ${maxTitleSize} characters or less`)
      .required("Required field"),
    description: yup
      .string()
      .matches(
        /^[A-Za-z0-9,.\s-+―\];—'–)(‒"‑[‐-]*$/,
        "Description should only contain letters, digits, spaces and hyphens"
      )
      .max(
        maxDescriptionSize,
        `Description should be ${maxDescriptionSize} characters or less`
      )
      .required("Required field"),
    authors: yup
      .array()
      .of(
        yup.object().shape({
          name: yup
            .string()
            .matches(
              /^[A-Za-z\s]*$/,
              "Author's name should only contain letters and spaces"
            )
            .max(
              maxAuthorName,
              `Author's name should be ${maxAuthorName} characters or less`
            ),
        })
      )
      .max(maxAuthors, "You cannot add more authors"),
    specialization: yup.string().when("specializations", {
      is: (specializations) => specialization === "Select",
      then: yup.string().required("Required field"),
    }),
    acceptance: yup
      .boolean()
      .oneOf([true], "Required field")
      .required("Required field"),
  });

  const { register, errors, handleSubmit, getValues, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setCounts({ ...counts, [prop]: event.target.value.length });
  };

  const handleChangeSelect = (event) => {
    setSpecialization(event.target.value);
  };

  // based on:
  // https://codesandbox.io/s/425lm2479?file=/demo.js:1708-1772
  const ClickSubmit = () => {
    if (file === null) ShowAlert();
  };

  // based on:
  // https://codesandbox.io/s/field-array-validation-with-yup-vdfss?file=/src/friendsSchema.js
  const [authors, setAuthors] = useState([{ name: "" }]);

  const addAuthor = () => {
    // get id of last author
    const lastAuthor = document.getElementById(
      `authors[${authors.length - 1}]`
    );
    // if count of authors < maxAuthors and last author is not empty
    if (authors.length !== maxAuthors && lastAuthor.value.length !== 0) {
      setAuthors([...authors, { name: "" }]);
    }
  };

  const removeAuthor = (index) => () => {
    // get values
    const { authors } = getValues({ nest: true });

    // create a copy
    const newAuthors = [...authors];

    // remove by index
    newAuthors.splice(index, 1);

    // update values
    setAuthors(newAuthors);

    for (let i = 0; i < newAuthors.length; i++) {
      setValue(`authors[${i}].name`, newAuthors[i].name);
    }
  };

  // Show alert
  const ShowAlert = () => {
    SetOpenAlertError(true);
  };

  // Close alert
  const CloseAlert = (event, reason) => {
    if (reason === "clickaway") return;

    SetOpenAlertError(false);
  };
  // create authors' list
  const authorList = authors.map((_, index) => {
    const fieldName = `authors[${index}]`;
    let addOrRemoveBtn;
    // when current author is the last one
    // user can add new author to the list
    if (authors.length - 1 === index) {
      addOrRemoveBtn = {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={addAuthor}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      };
    } else {
      // otherwise, user can remove selected author
      addOrRemoveBtn = {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={removeAuthor(index)}>
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
      };
    }
    return (
      <TextField
        className={style.textFieldAuthor}
        inputRef={register}
        id={`${fieldName}`}
        name={`${fieldName}.name`}
        key={fieldName}
        autoComplete="authors"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={addOrRemoveBtn}
        variant="outlined"
        error={!!errors?.authors?.[index]?.name}
        helperText={errors?.authors?.[index]?.name?.message}
      />
    );
  });

  // get main author from API
  const mainAuthor = "John Doe";

  const createFormData = () => {
    const formData = new FormData(formRef.current);

    let otherAuthors = formData.get("authors[0].name");

    // add authors to string
    for (let i = 1; i < authors.length; i++) {
      const author = formData.get(`authors[${i}].name`);
      // add author to string if he exists
      if (author !== "") {
        // add coma to string if string is not empty
        if (otherAuthors !== "") otherAuthors += ", ";
        otherAuthors += author;
      }
      formData.delete(`authors[${i}].name`);
    }

    if (otherAuthors === "") otherAuthors = null;

    formData.delete("authors");
    formData.append("authors", otherAuthors);

    formData.delete("fileInput");
    formData.append("Work", file);

    return formData;
  };

  const onSubmit = () => {
    // if everything is OK, form can be send
    if (file !== null && specialization !== "Select") {
      const formData = createFormData();
      const token = localStorage.getItem("jwt");
      axios.post(`${URL_API}/ScientificWork/AddWork`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

  return (
    <div className={style.main}>
      <h1>Adding scientific work</h1>

      <div className={style.container}>
        <form ref={formRef} noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={style.left}>
            {/* Title */}
            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="title-adding-work"
              name="title"
              label="Title"
              autoComplete="title"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {counts.title}/{maxTitleSize}
                  </InputAdornment>
                ),
              }}
              onChange={handleChange("title")}
              variant="outlined"
              error={!!errors.title}
              helperText={errors?.title?.message}
            />

            <TextField
              className={style.textField}
              inputRef={register}
              required
              id="description-adding-work"
              name="description"
              label="Description"
              autoComplete="description"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {counts.description}/{maxDescriptionSize}
                  </InputAdornment>
                ),
              }}
              multiline
              rows={4}
              placeholder="Add text"
              onChange={handleChange("description")}
              variant="outlined"
              error={!!errors.description}
              helperText={errors?.description?.message}
            />

            {/* Specialization Input - Select*/}
            <TextField
              select
              className={style.textField}
              inputRef={register}
              required
              id="specialization-adding-work"
              name="specialization"
              label="Specialization"
              autoComplete="specialization"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Select"
              variant="outlined"
              onChange={handleChangeSelect}
              error={!!errors.specialization}
              helperText={errors?.specialization?.message}
              value={specialization}
            >
              {categories.map((category) => (
                <MenuItem className={style.MenuItem} value={category.value}>
                  {category.value}
                </MenuItem>
              ))}
            </TextField>

            {/* Authors */}
            <TextField
              className={style.textFieldAuthor}
              inputRef={register}
              id="authors-adding-work"
              name="authors"
              label="Authors"
              autoComplete="authors"
              InputLabelProps={{
                shrink: true,
              }}
              value={mainAuthor}
              variant="outlined"
            />

            {authorList}

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

            <div className={style.button}>
              <Button
                className={style.addButton}
                color="primary"
                type="submit"
                variant="contained"
                onClick={ClickSubmit}
              >
                Add work
              </Button>
            </div>
          </div>
          <div className={style.right}>
            <DropZone SetFile={passFile} />
          </div>
        </form>
      </div>
      <Snackbar
        open={openAlertError}
        autoHideDuration={durationOfAlert}
        onClose={CloseAlert}
      >
        <Alert onClose={CloseAlert} severity={"error"}>
          {"You did not choose a work!"}
        </Alert>
      </Snackbar>
    </div>
  );
}