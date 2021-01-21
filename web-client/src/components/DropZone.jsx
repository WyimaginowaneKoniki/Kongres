import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import { Button, Box } from "@material-ui/core/";

export default function DropZone(props) {
  const style = makeStyles({
    container: {
      width: "550px",
      "@media only screen and (max-width: 1480px)": {
        width: "auto",
      },
    },
    dropContainer: {
      margin: "0px",
      height: "400px",
      border: "4px dashed #DFE2F8",
      opacity: 1,

      "@media only screen and (max-width: 1480px)": {
        border: "none",
        height: "auto",
      },
    },
    top: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "90%",
      "@media only screen and (max-width: 1480px)": {
        height: "auto",
      },
    },
    dropMessage: {
      textAlign: "center",
      color: "#aaaaaa",
      fontFamily: "Arial",
      fontSize: "20px",
    },
    uploadIcon: {
      width: "101px",
      height: "67px",
      margin: "0 auto",
      paddingTop: "30px",
      color: "#6069A9",
      "@media only screen and (max-width: 1480px)": {
        display: "none",
      },
    },
    dragText: {
      color: "black",
      fontSize: "24px",
    },
    message: {
      color: "#AD1457",
      height: "19px",
      fontSize: "16px",
      letterSpacing: "0",
      textAlign: "center",
      width: "400px",
      lineHeight: "1.4em",
      display: "block",
      "@media only screen and (max-width: 1480px)": {
        display: "none",
      },
    },
    messageButton: {
      color: "#AD1457",
      height: "19px",
      fontSize: "16px",
      letterSpacing: "0",
      textAlign: "center",
      width: "auto",
      lineHeight: "1.4em",
      display: "none",
      "@media only screen and (max-width: 1480px)": {
        display: "block",
        marginBottom: "50px",
      },
    },
    inputInfo: {
      height: "19px",
      width: "100%",
      textAlign: "left",
      paddingLeft: "24px",
      letterSpacing: "0",
      color: "#767676",
      fontSize: "16px",
      "@media only screen and (max-width: 1480px)": {
        marginTop: "-80px",
        marginBottom: "75px",
      },
    },
    logo: {
      fontSize: "40px",
      color: "#6069A9",
    },
    fileName: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "379px",
      textAlign: "left",
      marginLeft: "10px",
      "@media only screen and (max-width: 1480px)": {
        width: "350px",
      },
    },
    fileSize: {
      color: "#767676",
      width: "100px",
      "@media only screen and (max-width: 1480px)": {
        width: "129px",
      },
    },
    exit: {
      width: "21px",
      fontSize: "21px",
      color: "#AD1457",
      cursor: "pointer",
    },
    dialog: {
      display: "none",
    },
    btn: {
      color: "#54457F",
      size: "16px",
      border: "1px solid #54457F4D",
      backgroundColor: "white",
    },
    bottom: {
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: "16px",
      "@media only screen and (max-width: 1480px)": {
        marginBottom: "25px",
      },
    },
    dragDesc: {
      "@media only screen and (max-width: 1480px)": {
        display: "none",
      },
    },
  })();

  const fileInputRef = React.useRef();

  const maxFileSize = 20971520; // 1024 * 1024 * 20 = 20 MB

  let file = null;
  const [message, SetMessage] = React.useState(null);
  const [fileName, SetFileName] = React.useState(null);
  const [fileSize, SetFileSize] = React.useState(null);

  // Changes style of area with added file (pdf icon, name, size). Changes display none → flex, flex → none.
  const [divStyle, SetDivStyle] = React.useState({
    display: "none",
  });

  const DragOver = (e) => {
    e.preventDefault();
  };

  const DragEnter = (e) => {
    e.preventDefault();
  };

  const DragLeave = (e) => {
    e.preventDefault();
  };

  const FileDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    AddFile(f);
  };

  const AddFile = (f) => {
    const isFileValid = ValidateFile(f);
    const isSizeValid = ValidateSize(f);

    if (!isSizeValid && !isFileValid) {
      ShowMessage(
        "Too large file and invalid format. Only PDF file not greather than 20 MB can be uploaded."
      );
    } else if (!isFileValid) {
      ShowMessage("Invalid file format. Only PDF file format can be uploaded.");
    } else if (!isSizeValid) {
      ShowMessage(
        "Too large file. Only file not greather than 20 MB can be uploaded."
      );
    } else {
      file = f;
      SetFileName(file.name);
      SetFileSize(FileSize(file.size));
      SetDivStyle({ display: "flex" });
      props.SetFile(file);
    }
  };

  const ShowMessage = (message) => {
    SetMessage(message);
    setTimeout(() => {
      SetMessage(null);
    }, 4000);
  };

  // Checks if the selected file type is PDF
  const ValidateFile = (f) => "application/pdf" === f.type;

  const ValidateSize = (f) => maxFileSize >= f.size;

  // It returns the size of the file with the unit.
  const FileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const Delete = () => {
    SetDivStyle({ display: "none" });
    SetFileName(null);
    SetFileSize(null);
    file = null;
    props.SetFile(file);
  };

  const OpenDialog = () => {
    fileInputRef.current.click();
  };

  const FileSelected = () => {
    if (fileInputRef.current.files[0]) {
      AddFile(fileInputRef.current.files[0]);
    }
  };

  return (
    <div className={style.container}>
      <div
        className={style.dropContainer}
        onDragOver={DragOver}
        onDragEnter={DragEnter}
        onDragLeave={DragLeave}
        onDrop={FileDrop}
      >
        <div className={style.top}>
          <div className={style.dropMessage}>
            <input
              name="fileInput"
              ref={fileInputRef}
              className={style.dialog}
              type="file"
              onChange={FileSelected}
            />

            <BackupOutlinedIcon className={style.uploadIcon} />

            <Box lineHeight={2} m={1} className={style.dragText}>
<div className={style.dragDesc}>              Drag & Drop file here
              <br />
              or
              <br /></div>
              <Button
                variant="outlined"
                className={style.btn}
                onClick={OpenDialog}
              >
                Browse file
              </Button>
            </Box>
            <span className={style.message}>{message}</span>
          </div>
        </div>
        <div className={style.inputInfo}>
          Accepted file types: .pdf, max file size: 20MB
        </div>
      </div>
      <div style={divStyle} className={style.bottom}>
        <PictureAsPdfOutlinedIcon className={style.logo} />
        <span className={style.fileName}>{fileName}</span>
        <span className={style.fileSize}>{fileSize}</span>
        <span className={style.exit} onClick={Delete}>
          🗙
        </span>
      </div>
      <span className={style.messageButton}>{message}</span>
    </div>
  );
}
