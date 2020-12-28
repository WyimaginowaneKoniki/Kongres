import React, { Component } from "react";
import picture from "../images/blank-profile-picture.png";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
  main: {
    width: "100%",
    marginBottom: "5%",
  },
  btn: {
    marginLeft: "8%",
    marginTop: "6%",
    float: "left",
    textTransform: "none",
  },
  btn1: {
    marginTop: "8%",
    float: "left",
    textTransform: "none",
  },
  photo: {
    width: 100,
    height: 100,
    margin: "auto",
    borderRadius: "50px",
    marginLeft: "8%",
  },
  img: {
    width: "35%",
    float: "left",
  },
});

class Avatar extends Component {
  state = {
    profileImg: picture,
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = () => {
      if (reader.readyState === 2) this.setState({ profileImg: reader.result });
    };

    if (file && file.type.match("image.*")) reader.readAsDataURL(file);
  };

  delete = () => {
    this.setState({ profileImg: picture });
  };

  render() {
    const { profileImg } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <div className={classes.img}>
          <img src={profileImg} alt="" id="img" className={classes.photo} />
          <Button
            color="secondary"
            onClick={this.delete}
            className={classes.btn}
          >
            Delete photo
          </Button>
        </div>
        <Button
          variant="outlined"
          color="primary"
          component="label"
          className={classes.btn1}
        >
          {profileImg === picture ? "Add" : "Edit"} photo
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="input"
            onChange={this.imageHandler}
            hidden
          />
        </Button>
      </div>
    );
  }
}

export default withStyles(useStyles)(Avatar);
