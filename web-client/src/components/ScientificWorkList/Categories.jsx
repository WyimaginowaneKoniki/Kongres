import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import "../../App.css";

export default function Categories(props) {
  const style = makeStyles({
    btn: {
      color: "#6069A9",
      backgroundColor: "#F1F3FF",
      padding: "4px 8px",
      marginRight: "16px",
      marginBottom: "16px",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#C0C4E2",
        boxShadow: "none",
      },
    },
  })();

  return (
    <Button variant="contained" className={style.btn}>
      {props.name}
    </Button>
  );
}
