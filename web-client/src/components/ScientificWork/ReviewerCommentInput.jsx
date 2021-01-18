import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
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
import defaultPhoto from "../../images/empty-image.png";
import axios from "axios";
import { URL_API, RATING } from "../../Constants";

export default function ReviewerCommentInput(props) {
  const style = makeStyles({
    contentOnPage: {
      width: "600px",
      display: "flex",
      margin: "20px",
      marginLeft: "60px",
    },
    userInfo: {
      width: "80px",
      alignItems: "center",
    },
    image: {
      width: "80px",
      height: "80px",
      borderRadius: "50px",
    },
    userName: {
      textAlign: "center",
    },
    btn: {
      width: "120px",
      height: "45px",
      margin: "5px",
    },
    dialogContent: {
      display: "flex",
      flexDirection: "column",
    },
    dialogTitle: {
      fontWeight: "bold",
      textAlign: "center",
    },
    rating: {
      display: "flex",
    },
    info: {
      textAlign: "center",
    },
    reviewInput: {
      width: "520px",
      margin: "15px",
    },
  })();

  const maxReviewLength = 255;

  const schema = yup.object().shape({
    rating: yup.string().when("ratingValue", () => {
      if (!ratingValue) return yup.string().required("Rating should be chosen");
    }),
    reviewInput: yup
      .string()
      .max(
        maxReviewLength,
        `Review should be ${maxReviewLength} characters or less`
      )
      .when("file", () => {
        if (!workFile)
          return yup
            .string()
            .required("Review must contain comment or/and file");
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
          <img src={defaultPhoto} className={style.image} alt=""/>
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
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className={style.dialogTitle}>
            Add your review
          </DialogTitle>
          <DialogContent className={style.dialogContent}>
            <div className={style.rating}>
              <Typography component="legend">Your rating:</Typography>
              <Rating
                max={3}
                name="rating"
                value={ratingValue}
                onChange={handleChangeRating}
                onChangeActive={handleHoverRating}
              />
              <Box ml={2}>
                {RATING[ratingHover !== -1 ? ratingHover : ratingValue]}
              </Box>
              <FormHelperText error>
                {errors?.rating && errors?.rating?.message}
              </FormHelperText>
            </div>
            <p className={style.info}>
              Review must contain comment or/and file
            </p>

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
