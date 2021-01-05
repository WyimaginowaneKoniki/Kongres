import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import uploadIcon from "../images/upload.png";
import pdfIcon from "../images/pdf-icon.png";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

function DropZone(props) {
  const styles = makeStyles({
    container: {
      width: "600px",
    },
    dropContainer: {
      margin: "0px",
      height: "350px",
      border: "3px dashed #aaaaaa",
    },
    top: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "90%",
    },
    dropMessage: {
      textAlign: "center",
      color: "#aaaaaa",
      fontFamily: "Arial",
      fontSize: "20px",
    },
    uploadIcon: {
      width: "50px",
      height: "50px",
      background: `url(${uploadIcon}) no-repeat center center`,
      backgroundSize: "100%",
      textAlign: "center",
      margin: "0 auto",
      paddingTop: "30px",
    },
    message: {
      color: "red",
      padding: "2%",
      fontSize: "15px",
    },
    inputInfo: {
      height: "10%",
      width: "100%",
      textAlign: "left",
      paddingLeft: "5%",
      color: "#aaaaaa",
    },
    btn: {
      textTransform: "none",
    },
    logo: {
      height: "30px",
      margin: "2%",
      float: "left",
    },
    fileName: {
      height: "30px",
      width: "60%",
      margin: "3%",
      float: "left",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    fileSize: {
      height: "30px",
      margin: "3% 2%",
      float: "left",
    },
    exit: {
      height: "30px",
      margin: "3% 2%",
      float: "right",
      cursor: "pointer",
    },
    dialog: {
      display: "none",
    },
  });

  const style = styles();

  const fileInputRef = useRef();

  const maxFileSize = 20971520; // 1024 * 1024 * 20 = 20 MB

  let file = null;
  const [message, SetMessage] = useState(null);
  const [fileName, SetFileName] = useState(null);
  const [fileSize, SetFileSize] = useState(null);
  const [divStyle, SetDivStyle] = useState({
    display: "none",
    textAlign: "left",
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
      SetDivStyle({ display: "block", textAlign: "left" });
      props.SetFile(file);
    }
  };

  const ShowMessage = (message) => {
    SetMessage(message);
    setTimeout(() => {
      SetMessage(null);
    }, 4000);
  };

  const ValidateFile = (f) => {
    const validTypes = ["application/pdf"];
    if (validTypes.indexOf(f.type) === -1) {
      return false;
    }
    return true;
  };

  const ValidateSize = (f) => {
    const size = f.size;
    return maxFileSize >= size;
  };

  const FileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const Delete = () => {
    SetDivStyle({ display: "none", textAlign: "left" });
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

            <div className={style.uploadIcon}></div>

            <Box lineHeight={2} m={1}>
              Drag & Drop file here
              <br />
              or
              <br />
              <Button
                variant="outlined"
                color="primary"
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
      <div style={divStyle}>
        <img className={style.logo} src={pdfIcon} alt="Logo" />
        <span className={style.fileName}>{fileName}</span>
        <span className={style.fileSize}>{fileSize}</span>
        <span className={style.exit} onClick={Delete}>
          x
        </span>
      </div>
    </div>
  );
}
export default DropZone;