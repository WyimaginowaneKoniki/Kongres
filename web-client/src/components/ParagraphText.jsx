import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

function ParagraphText(props) {
  const styles = makeStyles({
    main: {
      marginBottom: "1.2em",
    },
    heading: {
      textAlign: "left",
    },
    content: {
      textAlign: "left",
    },
  });

  const style = styles();

  return (
    <div className={style.main}>
      <h2 className={style.heading}>{props.heading}</h2>
      <p className={style.content}>{props.content}</p>
    </div>
  );
}

export default ParagraphText;
