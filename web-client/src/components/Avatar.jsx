import React, { useState } from 'react';
import defaultPicture from "../images/blank-profile-picture.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
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

function Avatar(props) {
  // From:
  // https://stackoverflow.com/a/61745110/14865551
  // Stores the picture
  const [avatarFile, SetAvatarFile] = useState(null);

  // Stores the source of the picture
  const [avatarURL, SetAvatarURL] = useState(defaultPicture);
  // File and ULR:
  // https://stackoverflow.com/a/61302835/14865551

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")){
      SetAvatarFile(file);
      SetAvatarURL(URL.createObjectURL(file));
    }
      
    else {
      alert("Invalid input type!");
    }
  };

  const onRemovePicture = () => {
    SetAvatarFile(null);
    SetAvatarURL(defaultPicture);
  };

  const style = styles();

  console.log(avatarFile);
  console.log(avatarURL);

  return (
    <div className={style.main}>
      <div className={style.img}>
        <img src={avatarURL} alt="" id="img" className={style.photo} />
        <Button
          color="secondary"
          onClick={onRemovePicture}
          className={style.btn}
        >
          Delete photo
        </Button>
      </div>
      <Button
        variant="outlined"
        color="primary"
        component="label"
        className={style.btn1}
      >
        {avatarURL === defaultPicture ? "Add" : "Edit"} photo
        <input
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={onChangePicture}
          hidden
        />
      </Button>
    </div>
  );
}

export default Avatar;