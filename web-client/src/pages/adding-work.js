import React from "react";
import "../App.css";
import DropZone from "../components/DropZone";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
const { useState } = React;

function AddingWork(props) {
  const styles = makeStyles({
    main: {
      width: "80%",
      margin: "auto",
    },
    left: {
      width: "50%",
      height: "50vh",
      float: "left",
      textAlign: "left",
    },
    right: {
      width: "50%",
      height: "50vh",
      float: "left",
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
      width: "100%",
    },
    formControlLabel: {
      marginBottom: "8px",
    },
  });

  const style = styles();

  const [file, SetFile] = useState(null);
  const passFile = (f) => {
    SetFile(f);
  };

  const [values, setValues] = React.useState({
    title: "",
    description: "",
  });
  const [counts, setCounts] = React.useState({
    title: 0,
    description: 0,
  });

  const maxTitleSize = 127;
  const maxDescriptionSize = 255;
  const maxAuthors = 9;
  const maxAuthorName = 53;

  const [specialization, setSpecialization] = React.useState("");
  const schema = yup.object().shape({
    title: yup
      .string()
      .matches(
        /^[A-Za-z0-9,. -+―\];—'–)(‒"‑\[‐-]*$/,
        "Title should only contain letters, digits, spaces and hyphens"
      )
      .max(maxTitleSize, `Title should be ${maxTitleSize} characters or less`)
      .required("Required field"),
    description: yup
      .string()
      .matches(
        /^[A-Za-z0-9,. -+―\];—'–)(‒"‑\[‐-]*$/,
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
              /^[A-Za-z ]*$/,
              "Author's name should only contain letters and spaces"
            )
            .max(
              maxAuthorName,
              `Author's name should be ${maxAuthorName} characters or less`
            ),
        })
      )
      .max(maxAuthors, "You cannot add more authors"),
      acceptance: yup.boolean().oneOf([true], "Required field").required("Required field"),
  });

  const { register, handleSubmit, errors, getValues, setValue } = useForm({
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

  return (
    <div className={style.main}>
      <h1>Adding scientific work</h1>
      <div className={style.left}>
        <div className={style.container}>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              data.specialization = specialization;
              console.log(file);
            alert(JSON.stringify(data));
            })}
          >
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
            <FormControl
              variant="outlined"
              name="specialization"
              className={style.formControl}
              required
              error={!!errors.specialization}
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
                required
                onChange={handleChangeSelect}
                input={
                  <OutlinedInput
                    notched
                    inputRef={register}
                    name="specialization"
                    id="specialization-signup"
                  />
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
              value="John Doe"
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

            <Button
              className={style.addButton}
              color="primary"
              type="submit"
              variant="contained"
              // onClick={buttonClick}
            >
              Add work
            </Button>
          </form>
        </div>
      </div>
      <div className={style.right}>
        <DropZone SetFile={passFile} />
      </div>
    </div>
  );
}
export default AddingWork;
