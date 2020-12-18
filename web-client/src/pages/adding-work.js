import React from "react";
import "../App.css";
import DropZone from "../components/DropZone";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
const { useState } = React;

function AddingWork(props) {
  const styles = makeStyles({
    main: {
      width: "80%",
      margin: "auto",
    },
    left: {
      // backgroundColor: 'red',
      width: "50%",
      height: "50vh",
      float: "left",
      textAlign: "left",
    },
    right: {
      // backgroundColor: 'green',
      width: "50%",
      height: "50vh",
      float: "left",
    },
    container: {
      width: "90%",
    },
    textField: {
      marginBottom: "32px",
      width: "500px",
    },
    inputLabel: {
      backgroundColor: "white",
      padding: "0px 4px",
      marginLeft: "-4px",
    },
    addButton: {
      // float: 'left',
      // marginRight: '5%',
      float: "right",
      textTransform: "none",
    },
  });

  const style = styles();

  const [_file, SetFile] = useState(null);
  const passFile = (f) => {
    SetFile(f);
  };

  const buttonClick = () => {
    console.log(_file);
  };

  return (
    <div className={style.main}>
      <h1>Adding scientific work</h1>
      <div className={style.left}>
        <div className={style.container}>
          <form noValidate>
            {/* Title */}
            <FormControl
              className={style.textField}
              required
              name="title"
              variant="outlined"
              //   error={!!errors.title}
            >
              <InputLabel shrink className={style.inputLabel}>
                Title
              </InputLabel>
              <OutlinedInput
                // inputRef={adding}
                id="title-adding"
                name="title"
                // onChange={handleChange("title")}
              />
            </FormControl>

            {/* Description */}
            <FormControl
              className={style.textField}
              required
              name="description"
              variant="outlined"
              //   error={!!errors.description}
            >
              <InputLabel shrink className={style.inputLabel}>
              Description
              </InputLabel>
              <OutlinedInput
                // inputRef={adding}
                id="description-adding"
                name="description"
                multiline
                rows={4}
                // onChange={handleChange("description")}
              />
            </FormControl>
          </form>

          <Button
            variant="contained"
            color="primary"
            className={style.addButton}
            onClick={buttonClick}
          >
            Add work
          </Button>
        </div>
      </div>
      <div className={style.right}>
        <DropZone SET_FILE={passFile} />
      </div>
    </div>
  );
}
export default AddingWork;
