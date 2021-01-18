import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function ParagraphText(props) {
  const style = makeStyles({
    main: {
      marginBottom: "1.2em",
    },
    heading: {
      textAlign: "left",
    },
    content: {
      textAlign: "left",
    },
  })();

  return (
    <div className={style.main}>
      <h2 className={style.heading}>{props.heading}</h2>
      <p className={style.content}>{props.content}</p>
    </div>
  );
}
