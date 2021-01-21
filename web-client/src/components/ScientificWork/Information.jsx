import React from "react";
import "../../App.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.webpack";
import Categories from "../ScientificWorkList/Categories";
import DropZone from "../DropZone";
import { useForm } from "react-hook-form";
import MuiAlert from "@material-ui/lab/Alert";
import Close from "@material-ui/icons/Close";
import axios from "axios";
import { URL_API } from "../../Constants";

export default function Information(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
    },
    pdf: {
      width: "30%",
      "@media only screen and (max-width: 1440px)": {
        display: "none",
      },
    },
    workInfo: {
      width: "70%",
      textAlign: "left",
      "@media only screen and (max-width: 1440px)": {
        width: "100%",
      },
    },
    status: {
      color: "#775866",
      backgroundColor: "#F0D4E0",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "14px",
    },
    date: {
      fontSize: "12px",
      color: "#767676",
      marginRight: "24px",
    },
    dateCategory: {
      display: "flex",
      marginTop: "8px",
    },
    h1: {
      marginTop: "0",
      marginBottom: "0.7em",
      lineHeight: "1.5em",
      "@media only screen and (max-width: 768px)": {
        fontSize: "1em",
      },
    },
    allAuthors: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "16px",
    },
    author: {
      marginRight: "32px",
    },
    shared: {
      fontSize: "14px",
      color: "#767676",
    },
    photo: {
      objectFit: "cover",
      width: "72px",
      height: "72px",
      borderRadius: "50px",
      boxShadow: "2px 2px 4px #C0C4E233",
    },
    authorInfo: {
      display: "flex",
      marginRight: "56px",
      marginBottom: "24px",
    },
    authorDesc: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      lineHeight: "1.2em",
      marginLeft: "24px",
    },
    authorName: {
      fontWeight: "bold",
    },
    degree: {
      fontSize: "14px",
    },
    university: {
      fontSize: "14px",
      color: "#767676",
    },
    description: {
      marginBottom: "24px",
    },
    btnDownload: {
      marginRight: "32px",
    },
    popup: {
      width: "600px",
    },
    divClose: {
      display: "flex",
      justifyContent: "flex-end",
    },
    close: {
      color: "#AD1457",
      width: "32px",
      height: "32px",
      padding: "0.5em",
      "&:hover": {
        cursor: "pointer",
      },
    },
  })();

  function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
  }

  const [openAlertError, SetOpenAlertError] = React.useState(false);
  const [openAlertSuccess, SetOpenAlertSuccess] = React.useState(false);
  const durationOfAlert = 4000;

  const { register, handleSubmit } = useForm({});

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = props.workPDF;
    link.download = `${props.scientificWork.title.replaceAll(" ", "-")}.pdf`;
    link.click();
  };

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [versionFile, setVersionFile] = React.useState(null);

  const openDialog = () => {
    setIsDialogOpen(true);
    //  set default values
    setVersionFile(null);
  };

  // Show alert
  const ShowAlert = () => {
    SetOpenAlertError(true);
  };

  const ShowAlertSuccess = () => {
    SetOpenAlertSuccess(true);
  };

  // Close alert
  const CloseAlert = (event, reason) => {
    if (reason === "clickaway") return;

    SetOpenAlertError(false);
  };

  const CloseAlertSuccess = (event, reason) => {
    if (reason === "clickaway") return;

    SetOpenAlertSuccess(false);
  };

  const ClickSubmit = () => {
    if (versionFile === null) ShowAlert();
    else ShowAlertSuccess();
  };

  const closeDialog = () => setIsDialogOpen(false);
  const onSubmit = () => {
    if (versionFile) {
      var formData = new FormData();
      formData.append("newVersion", versionFile);

      var token = localStorage.getItem("jwt");

      axios
        .post(`${URL_API}/ScientificWork/AddVersion`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => window.location.reload());
    }
  };

  return (
    <div className={style.main}>
      <div className={style.pdf}>
        <Document file={props.workPDF}>
          <Page pageNumber={1} width={320} />
        </Document>
      </div>

      <div className={style.workInfo}>
        <span className={style.status}>{props.status}</span>

        {/* Panel includes status, date add work, date modification and specialization  */}
        <div className={style.dateCategory}>
          <p className={style.date}>
            {props.scientificWork.createDate}
            &nbsp; (Edited: {props.scientificWork.updateDate})
          </p>
          <Categories name={props.scientificWork.specialization} />
        </div>

        <h1 className={style.h1}>{props.scientificWork.title}</h1>

        {/* Panel includes photo, name author, degree, univeristy */}
        <div className={style.allAuthors}>
          <div className={style.author}>
            <span className={style.shared}>Shared by</span>
            <div className={style.authorInfo}>
              <img src={props.author.photo} className={style.photo} alt=""></img>
              <div className={style.authorDesc}>
                <p className={style.authorName}>{props.author.name}</p>
                <p className={style.degree}>{props.author.degree}</p>
                <p className={style.university}>{props.author.university}</p>
              </div>
            </div>
          </div>

          <div className={style.authors}>
            <p className={style.shared}>Other authors</p>
            <p className={style.authorName}>{props.scientificWork.authors}</p>
          </div>
        </div>
        <p className={style.description}>{props.scientificWork.description}</p>

        <Button
          variant="outlined"
          color="primary"
          className={style.btnDownload}
          onClick={downloadFile}
        >
          Download full work
        </Button>
        {props.mode === "Author" && props.status === "Correcting" && (
          <Button
            variant="contained"
            color="primary"
            className={style.btn1}
            onClick={openDialog}
          >
            Add new version
          </Button>
        )}
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <form onSubmit={handleSubmit(onSubmit)} className={style.popup}>
            <div className={style.divClose}>
              <Close className={style.close} onClick={closeDialog} />
            </div>
            <DialogTitle>Add new version of scientific work</DialogTitle>
            <DialogContent>
              <DropZone SetFile={setVersionFile} inputRef={register} required />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                className={style.btn}
                type="submit"
                onClick={ClickSubmit}
              >
                Upload new version
              </Button>
            </DialogActions>
          </form>
          <Snackbar
            open={openAlertError}
            autoHideDuration={durationOfAlert}
            onClose={CloseAlert}
          >
            <Alert onClose={CloseAlert} severity={"error"}>
              {"You did not choose a work!"}
            </Alert>
          </Snackbar>

          <Snackbar
            open={openAlertSuccess}
            autoHideDuration={durationOfAlert}
            onClose={CloseAlertSuccess}
          >
            <Alert onClose={CloseAlertSuccess} severity={"success"}>
              {"You have added a new version of your work!"}
            </Alert>
          </Snackbar>
        </Dialog>
      </div>
    </div>
  );
}
