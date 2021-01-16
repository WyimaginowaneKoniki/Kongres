import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../App.css";

export default function Categories(props) {
  const style = makeStyles({
    main: {
      padding: "1.5%",
      float: "left",
    },
    btn: {
      textTransform: "none",
    },
  })();

  return (
    <div className={style.main}>
      <Button variant="contained" color="primary" className={style.btn}>
        {props.name}
      </Button>
    </div>
  );
}
