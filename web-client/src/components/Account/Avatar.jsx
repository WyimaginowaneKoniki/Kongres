import React from "react";
import defaultPicture from "../../images/default-avatar-grey.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function Avatar() {
  const style = makeStyles({
    photoButton: {
      display: "flex",
      alignItems: "center",
    },
    btnAddEdit: {
      marginLeft: "32px",
    },
    btnDelete: {
      marginTop: "4px",
      marginBottom: "16px",
      color: "#AD1457",
    },
    photo: {
      objectFit: "cover",
      width: "100px",
      height: "100px",
      borderRadius: "50px",
      boxShadow: "2px 2px 4px #C0C4E233",
    },
  })();

  // Stores the source of the picture
  // File and ULR:
  // https://stackoverflow.com/a/61302835/14865551
  const [avatarURL, SetAvatarURL] = React.useState(defaultPicture);

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      SetAvatarURL(URL.createObjectURL(file));
    } else {
      alert("Invalid input type!"); //TODO: error message instead of alert
    }
  };

  const onRemovePicture = () => {
    SetAvatarURL(defaultPicture);
  };

  return (
    <div className={style.main}>
      <div className={style.photoButton}>
        <img src={avatarURL} alt="" id="img" className={style.photo} />
        <Button
          variant="outlined"
          color="primary"
          component="label"
          className={style.btnAddEdit}
        >
          {avatarURL === defaultPicture ? "Add" : "Edit"} photo
          <input
            type="file"
            accept="image/*"
            name="avatar"
            id="input"
            onChange={onChangePicture}
            hidden
          />
        </Button>
      </div>
      <Button color="secondary" onClick={onRemovePicture} className={style.btnDelete}>
        Delete photo
      </Button>
    </div>
  );
}
