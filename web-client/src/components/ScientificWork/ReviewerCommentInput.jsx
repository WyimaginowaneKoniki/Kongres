import React from "react";
import "../../App.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  DialogActions,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
import DropZone from "../DropZone";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import defaultPhoto from "../../images/default-avatar.png";
import Close from "@material-ui/icons/Close";
import axios from "axios";
import { URL_API, RATING } from "../../Constants";

const StyledRating = withStyles({
  iconFilled: {
    color: "#6069A9",
  },
})(Rating);

export default function ReviewerCommentInput(props) {
  const style = makeStyles({
    contentOnPage: {
      width: "600px",
      display: "flex",
      alignItems: "center",
      marginTop: "40px",
      marginLeft: "40px",
      marginBottom: "16px",
      "@media only screen and (max-width: 1080px)": {
        marginLeft: "24px",
      },
      "@media only screen and (max-width: 768px)": {
        width: "320px",
        marginLeft: "0",
      },
    },
    userInfo: {
      alignItems: "center",
    },
    image: {
      width: "72px",
      height: "72px",
      borderRadius: "50px",
      boxShadow: "2px 2px 4px #C0C4E233",
      "@media only screen and (max-width: 1080px)": {
        width: "40px",
        height: "40px",
      },
    },
    userName: {
      textAlign: "center",
      fontSize: "16px",
      "@media only screen and (max-width: 1080px)": {
        fontSize: "12px",
        lineHeight: "1em",
      },
    },
    btn: {
      width: "120px",
      height: "45px",
      marginLeft: "24px",
      marginRight: "16px",
      "@media only screen and (max-width: 768px)": {
        marginLeft: "8px",
      },
    },
    dialog: {},
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      "@media only screen and (max-width: 768px)": {
        justifyContent: "center",
      },
    },
    dialogTitle: {
      fontWeight: "bold",
      fontSize: "24px",
      textAlign: "center",
      padding: "0",
    },
    rating: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
    },
    boxRating: {
      lineHeight: "0",
      marginRight: "8px",
    },
    info: {
      textAlign: "center",
      color: "#54457F",
      marginBottom: "8px",
    },
    reviewInput: {
      width: "550px",
      marginBottom: "8px",
      "@media only screen and (max-width: 1480px)": {
        marginBottom: "32px",
      },
      "@media only screen and (max-width: 768px)": {
        textAlign: "center",
        alignSelf: "center",
        width: "320px",
      },
      "@media only screen and (max-width: 425px)": {
        width: "240px",
      },
    },
    divClose: {
      display: "flex",
      justifyContent: "flex-end",
    },
    close: {
      color: "#AD1457",
      width: "32px",
      height: "32px",
      padding: "16px",
      "&:hover": {
        cursor: "pointer",
      },
    },
  })();

  const maxReviewLength = 255;

  const schema = yup.object().shape({
    rating: yup.string().when("ratingValue", () => {
      if (!ratingValue) return yup.string().required("Rating should be chosen");
    }),
    reviewInput: yup
      .string()
      .max(maxReviewLength, `Review should be ${maxReviewLength} characters or less`)
      .when("file", () => {
        if (!workFile)
          return yup.string().required("Review must contain comment or/and file");
      }),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [workFile, setWorkFile] = React.useState(null);
  const [ratingValue, setRating] = React.useState(0);
  const [ratingHover, setRatingHover] = React.useState(-1);
  const [characterCount, setCharacterCount] = React.useState(0);

  const openDialog = () => {
    setIsDialogOpen(true);
    //  set default values
    setCharacterCount(0);
    setWorkFile(null);
    setRating(0);
    setRatingHover(-1);
  };

  const closeDialog = () => setIsDialogOpen(false);

  const handleInputChange = (event) => {
    setCharacterCount(event.target.value.length);
  };

  const handleChangeRating = (_, newRating) => {
    if (newRating) setRating(newRating);
    setRatingHover(-1);
  };

  const handleHoverRating = (_, hoverRating) => {
    setRatingHover(hoverRating);
  };

  const onSubmit = (data) => {
    var formData = new FormData();

    formData.append("ReviewMsg", data.reviewInput);
    formData.append("ReviewFile", workFile);
    formData.append("Rating", ratingValue);
    formData.append("ScientificWorkId", props.scientificWorkId);

    const token = localStorage.getItem("jwt");

    axios.post(`${URL_API}/Review/AddReview`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    window.location.reload();
  };

  return (
    <div>
      <div className={style.contentOnPage}>
        <div className={style.userInfo}>
          <img src={defaultPhoto} className={style.image} alt="" />
          <p className={style.userName}>Me</p>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={openDialog}
          className={style.btn}
        >
          Add review
        </Button>
      </div>
      {/* All Dialog in Popup */}
      <Dialog open={isDialogOpen} onClose={closeDialog} className={style.dialog}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={style.divClose}>
            <Close className={style.close} onClick={closeDialog} />
          </div>
          <DialogTitle className={style.dialogTitle}>Add your review</DialogTitle>
          <DialogContent className={style.dialogContent}>
            <div className={style.rating}>
              <p>Your rating:</p>
              <Box
                component="fieldset"
                borderColor="transparent"
                className={style.boxRating}
              >
                <StyledRating
                  name="customized-color"
                  max={3}
                  value={ratingValue}
                  onChange={handleChangeRating}
                  onChangeActive={handleHoverRating}
                />
              </Box>
              <Box ml={2}>{RATING[ratingHover !== -1 ? ratingHover : ratingValue]}</Box>
              <FormHelperText error>
                {errors?.rating && errors?.rating?.message}
              </FormHelperText>
            </div>

            <p className={style.info}>Remember: review must contain comment or file</p>
            <TextField
              className={style.reviewInput}
              inputRef={register}
              required
              id="Review"
              name="reviewInput"
              label="Review"
              autoComplete="review"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {characterCount}/{maxReviewLength}
                  </InputAdornment>
                ),
              }}
              multiline
              rows={6}
              placeholder="Add review"
              onChange={handleInputChange}
              variant="outlined"
              error={!!errors.reviewInput}
              helperText={errors?.reviewInput?.message}
            />
            <DropZone SetFile={setWorkFile} inputRef={register} required />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              className={style.btn}
              type="submit"
            >
              Add review
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
