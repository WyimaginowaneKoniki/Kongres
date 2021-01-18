import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../App.css";

export default function MyReviewsCategories(props) {
  const style = makeStyles({
    main: {
      padding: "1.5%",
      float: "left",
    },
  })();

  return (
    <div className={style.main}>
      <Button variant="outlined" color="primary">
        {props.name}
      </Button>
    </div>
  );
}
