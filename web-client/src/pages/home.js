import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function Home() {
  const style = makeStyles({
    text:
  { 
    textAlign: 'left',
  },
  })();

  return (
    <div>
      <h1>Let's start our future!</h1>

      <div>
        <p className={style.text}>
          Scienture is an international web conference that brings together
          researchers from a variety of fields: computer science, mathematics,
          biology, chemistry, physics and geography. The main purpose of this
          meeting is to inspire and build knowledge, discuss problems and
          solutions in this area and shape future research directions.
        </p>
      </div>
    </div>
  );
}
