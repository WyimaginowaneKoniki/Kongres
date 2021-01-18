import React from "react";
import { Dialog } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const Photo = ({ photo, margin, direction, top, left }) => {
  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const [rotation, SetRotation] = React.useState(0);

  const rotate = () => {
    SetRotation(rotation + 90);
  };

  const style = makeStyles({
    photo: {
      width: "600px",
      height: "600px",
      margin: "25px",
      transform: `rotate(${rotation}deg)`
    },
  })();

  const [currentPhoto, SetCurrentPhoto] = React.useState(false);

  const [isClick, SetIsClick] = React.useState(false);

  let timeout;

  const over = (e) => {
    clearTimeout(timeout);
    if (!isClick) {
      timeout = setTimeout(function () {
        SetCurrentPhoto(e.target.src);
        SetIsDialogOpen(true);
      }, 500);
    }
  };
  const leave = () => {
    clearTimeout(timeout);
  };

  window.addEventListener("mousedown", function () {
    SetIsClick(true);
    leave();
  });

  window.addEventListener("mouseup", function () {
    SetIsClick(false);
  });

  const [isDialogOpen, SetIsDialogOpen] = React.useState(false);
  const closeDialog = () => {
    SetIsDialogOpen(false);
    setTimeout(function(){
      SetRotation(0);
    }, 200);
  };

  return (
    <div>
      <img
        style={imgStyle}
        {...photo}
        alt="img"
        onMouseMove={over}
        onMouseOut={leave}
      />
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        onClick={rotate}
        maxWidth={800}
      >
        <img
          className={style.photo}
          src={currentPhoto}
          alt="img"
          onMouseOut={closeDialog}
        />
      </Dialog>
    </div>
  );
};

export default Photo;
